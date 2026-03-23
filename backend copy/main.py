import faiss
import json
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from fastapi.middleware.cors import CORSMiddleware
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Loading model and index... This may take a moment.")
model = SentenceTransformer('all-mpnet-base-v2', device='cpu')
index = faiss.read_index('media.faiss')
embeddings = np.load('embeddings.npy')

with open('media_database.json', 'r') as f:
    media_db = json.load(f)

db_items = list(media_db.values())
print(f"Ready — {len(db_items)} entries indexed.")

# ─────────────────────────────────────────────────────────────────────────────
# Helper functions
# ─────────────────────────────────────────────────────────────────────────────

def content_to_text(item: dict) -> str:
    parts = [
        " ".join(item.get('genres', [])),
        " ".join(item.get('genres', [])),
        " ".join(item.get('directors', [])),
        " ".join(item.get('creators', [])),
        " ".join(item.get('cast', [])[:5]),
        item.get('plot', ''),
        " ".join(item.get('keywords', [])),
    ]
    return " ".join(p for p in parts if p).strip()

def explain_match(input_items: list, recommended: dict) -> list:
    rec_genres   = set(recommended.get('genres', []))
    rec_creators = set(recommended.get('directors', []) + recommended.get('creators', []))
    rec_cast     = set(recommended.get('cast', []))
    rec_keywords = set(recommended.get('keywords', []))

    all_genres, all_creators, all_cast, all_keywords = set(), set(), set(), set()
    for m in input_items:
        all_genres   |= set(m.get('genres', []))
        all_creators |= set(m.get('directors', []) + m.get('creators', []))
        all_cast     |= set(m.get('cast', []))
        all_keywords |= set(m.get('keywords', []))

    reasons = []
    shared_genres = rec_genres & all_genres
    if shared_genres:
        reasons.append(f"Genre match: {', '.join(sorted(shared_genres))}")
    shared_creators = rec_creators & all_creators
    if shared_creators:
        reasons.append(f"Same creator/director: {', '.join(sorted(shared_creators))}")
    shared_cast = rec_cast & all_cast
    if shared_cast:
        reasons.append(f"Shared actor(s): {', '.join(sorted(shared_cast))}")
    shared_kw = rec_keywords & all_keywords
    if shared_kw:
        reasons.append(f"Similar themes: {', '.join(sorted(shared_kw)[:4])}")
    if not reasons:
        reasons.append("Similar mood and storytelling style (semantic similarity)")
    return reasons

# ─────────────────────────────────────────────────────────────────────────────
# API Endpoints
# ─────────────────────────────────────────────────────────────────────────────

import os
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

class RecommendRequest(BaseModel):
    title: str
    top_k: int = 8

@app.post("/recommend")
async def get_recommendations(req: RecommendRequest):
    title = req.title.lower()
    
    # Check if title exists in the DB (case-insensitive)
    input_item = None
    for item in db_items:
        if item.get("title", "").lower() == title:
            input_item = item
            break
            
    if not input_item:
        raise HTTPException(status_code=404, detail="Movie or TV Series not found")
        
    input_items = [input_item]
    
    # Build averaged taste vector using precomputed embeddings for speed
    input_idx = db_items.index(input_item)
    taste_vector = embeddings[input_idx].astype('float32').reshape(1, -1)
    norm = np.linalg.norm(taste_vector)
    if norm > 0:
        taste_vector /= norm

    # FAISS search
    scores, indices = index.search(taste_vector, req.top_k + len(input_items) + 5)
    
    input_titles_lower = {t.lower() for t in [req.title]}
    shown = 0
    recommendations = []
    
    for score, idx in zip(scores[0], indices[0]):
        if shown >= req.top_k:
            break
        if idx < 0 or idx >= len(db_items):
            continue

        rec = db_items[idx]
        if rec['title'].lower() in input_titles_lower:
            continue

        shown += 1
        reasons = explain_match(input_items, rec)
        
        # Attach similarity score manually (since it computes cosine distance between embeddings)
        # Using a normalized similarity (between 0 and 1) is ideal, but FAISS returns raw inner product for cosine
        sim_val = float(score)
        
        recommendations.append({
            "title": rec.get("title"),
            "year": rec.get("year"),
            "genres": rec.get("genres", []),
            "rating": rec.get("rating"),
            "plot": rec.get("plot", ""),
            "cast": rec.get("cast", []),
            "directors": rec.get("directors", []),
            "keywords": rec.get("keywords", []),
            "tmdb_id": rec.get("tmdb_id"),
            "content_type": rec.get("content_type"),
            "similarity": round(sim_val, 4),
            "reasons": reasons
        })
        
    return {
        "input": input_item,
        "recommendations": recommendations,
        "meta": {"model": "SentenceTransformer FAISS GPU/CPU"}
    }
