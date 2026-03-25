<div align="center">

<!-- Wave header -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:00E5FF,100:BB86FC&height=140&section=header&text=NeuralFlix&fontSize=52&fontColor=ffffff&fontAlignY=45&desc=Semantic%20Movie%20and%20TV%20Recommendation%20Engine&descAlignY=68&descSize=16&animation=fadeIn" width="100%"/>

<!-- Typing animation -->
<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=18&pause=1200&color=00E5FF&center=true&vCenter=true&width=600&lines=FAISS+Vector+Engine+%E2%80%94+768+Dimensions;Powered+by+all-mpnet-base-v2;Cosine+Similarity+Search;Find+your+next+obsession." alt="Typing SVG" />

<br/>

![Python](https://img.shields.io/badge/Python-3.10+-00E5FF?style=for-the-badge&logo=python&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-BB86FC?style=for-the-badge&logo=fastapi&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-14-00E5FF?style=for-the-badge&logo=next.js&logoColor=black)
![FAISS](https://img.shields.io/badge/FAISS-IndexFlatIP-BB86FC?style=for-the-badge&logoColor=black)
![AWS EC2](https://img.shields.io/badge/AWS%20EC2-Backend-FF9900?style=for-the-badge&logo=amazon-ec2&logoColor=black)
![AWS Amplify](https://img.shields.io/badge/AWS%20Amplify-Frontend-FF9900?style=for-the-badge&logo=aws-amplify&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-00FF41?style=for-the-badge)

</div>

<br/>

<!-- Animated neural SVG -->
<img src="assets/neural.svg" width="100%" alt="NeuralFlix Architecture"/>

<br/>

## ◈ What is NeuralFlix?

NeuralFlix is a full-stack **semantic recommendation engine** for movies and TV series. Instead of relying on collaborative filtering or naive keyword matching, it converts every piece of content into a high-dimensional vector using a transformer model — then finds your nearest neighbors in that embedding space via FAISS.

> 💡 Tell it you love *Inception*. It understands **why** — the psychological tension, the layered reality, the non-linear structure — and surfaces everything that shares that DNA.

<br/>

## ◈ Pipeline

<!-- Animated pipeline SVG -->
<img src="assets/pipeline.svg" width="100%" alt="NeuralFlix Pipeline"/>

<br/>

## ◈ Dataset

```
Content indexed: 1,048 total entries
├── 🎬  623  Movies
│    ├── Popular, Top Rated, Now Playing, Trending
│    └── Genre discovery across 13 categories  (vote_count ≥ 1,000)
│
└── 📺  425  TV Series
     ├── Popular, Top Rated, Trending
     └── Genre discovery across 15 categories  (vote_count ≥ 500)
```

Each entry stores: `title · year · genres · cast[8] · directors · creators · plot · keywords[10] · rating · tmdb_id`

> Genres are **doubled** in the embedding text to give them higher semantic weight. Directors and TV show creators are treated symmetrically, enabling coherent cross-media recommendations.

<br/>

## ◈ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|:---|:---|:---|
| **Embeddings** | `all-mpnet-base-v2` | 768-dim semantic text vectors |
| **Vector Index** | `FAISS IndexFlatIP` | Exact cosine similarity search |
| **Data Source** | TMDB API v3 | Metadata, cast, keywords, ratings |
| **Backend** | FastAPI + Uvicorn | REST API, CORS, async handling |
| **Frontend** | Next.js 14 + Tailwind | Dark glass UI |
| **Animation** | Framer Motion | Neural loader, card reveals |
| **Icons** | Lucide React | Minimal icon system |
| **Backend Hosting** | AWS EC2 | Python/FastAPI server |
| **Frontend Hosting** | AWS Amplify | Next.js deployment & CI/CD |

</div>

<br/>

## ◈ Deployment

<div align="center">

```
                    ┌─────────────────────────────────┐
                    │         AWS Architecture         │
                    └─────────────────────────────────┘

   ┌──────────────────────┐          ┌──────────────────────┐
   │     AWS Amplify      │          │      AWS EC2         │
   │   (Frontend · CDN)   │  ──────▶ │  (Backend · Python)  │
   │                      │          │                      │
   │  Next.js 16 · React  │  POST    │  FastAPI · Uvicorn   │
   │  Tailwind · Framer   │ /recommend│  FAISS · SentenceT.  │
   │                      │          │  Port 8000           │
   └──────────────────────┘          └──────────────────────┘
            │                                  │
            │ Static Assets                    │ media.faiss
            │ media_titles.json                │ media_database.json
            │                                  │ embeddings.npy
            ▼                                  ▼
       CloudFront CDN                    EC2 Instance Store
```

</div>

### Infrastructure Notes

- **Backend (AWS EC2):** FastAPI runs on port `8000` with Uvicorn. The FAISS index, embeddings matrix, and media database are loaded into memory at startup for sub-millisecond search latency.
- **Frontend (AWS Amplify):** Continuous deployment from the repository. Next.js API routes act as a proxy layer, fetching recommendations from EC2 and enriching results with live TMDB poster images.

<br/>

## ◈ Getting Started

### 1 — Install dependencies

```bash
pip install faiss-cpu sentence-transformers fastapi uvicorn numpy pandas tqdm requests
```

### 2 — Build the database & FAISS index

```bash
# Open the notebook and run cells in order:
jupyter notebook movie_recommender.ipynb

# Cell 1 → Test the TMDB API key
# Cell 2 → Build media_database.json        (~20 min first run)
# Cell 3 → Encode vectors + write media.faiss  (~5 min)
```

After Cell 3 you'll have:

```
media_database.json   ←  ~1,048 entries of metadata
media.faiss           ←  binary FAISS index
embeddings.npy        ←  pre-computed numpy matrix
media_titles.json     ←  title list for autocomplete
```

### 3 — Start the backend

```bash
cd backend && uvicorn main:app --reload --port 8000
```

### 4 — Start the frontend

```bash
cd frontend && npm install && npm run dev
```

Open **http://localhost:3000** 

<br/>

## ◈ API Endpoints

| Method | Endpoint | Payload |
|:---|:---|:---|
| `POST` | `/recommend` | `{ "title": "Inception", "top_k": 8 }` |
| `GET` | `/api/titles` | `→ ["Inception", "The Dark Knight", ...]` |

<br/>

## ◈ Embedding Strategy

```python
def content_to_text(item: dict) -> str:
    parts = [
        " ".join(item.get('genres', [])),     # genres doubled
        " ".join(item.get('genres', [])),     # for extra semantic weight
        " ".join(item.get('directors', [])),
        " ".join(item.get('creators', [])),   # TV show-runners
        " ".join(item.get('cast', [])[:5]),
        item.get('plot', ''),
        " ".join(item.get('keywords', [])),
    ]
    return " ".join(p for p in parts if p).strip()
```

After ranking by cosine similarity, a second pass generates human-readable match reasons:

```
✓ Genre match: Action, Thriller
✓ Same director: Christopher Nolan
✓ Shared actor(s): Tom Hardy
✓ Similar themes: psychological, nonlinear narrative
```

<br/>

## ◈ Project Structure

```
neuralflix/
├── README.md
├── movie_recommender.ipynb      # Data pipeline (DB + FAISS)
├── media_database.json          # Generated: metadata
├── media.faiss                  # Generated: FAISS index
├── embeddings.npy               # Generated: numpy matrix
├── media_titles.json            # Generated: autocomplete list
│
├── assets/                      # README visuals
│   ├── neural.svg               # Animated neural engine diagram
│   └── pipeline.svg             # Animated pipeline diagram
│
├── backend/
│   └── main.py                  # FastAPI backend + FAISS search
│
└── frontend/
    ├── components/
    │   ├── HeroSection.jsx      # Animated landing + search
    │   ├── SearchBar.jsx        # Autocomplete + keyboard nav
    │   ├── RecommendationGrid.jsx
    │   ├── MovieCard.jsx        # Hover-reveal poster card
    │   ├── NeuralLoader.jsx     # Animated FAISS progress
    │   └── TerminalPanel.jsx    # Nerd-mode live log panel
    └── public/
        ├── file.svg
        ├── globe.svg
        ├── next.svg
        ├── vercel.svg
        └── window.svg
```

<br/>

## ◈ Configuration

| Variable | Location | Default | Description |
|:---|:---|:---|:---|
| `TMDB_API_KEY` | `movie_recommender.ipynb` | — | Your TMDB v3 key |
| `top_k` | `POST /recommend` | `8` | Results returned |
| `device` | `main.py` | `'cpu'` | Set `'cuda'` for GPU |
| `batch_size` | Cell 3 | `64` | Encoding batch size |
| `vote_count.gte` | Cell 2 | `1000` / `500` TV | Quality filter |

<br/>

## ◈ Credits

- [TMDB](https://www.themoviedb.org/) — content metadata API
- [sentence-transformers](https://www.sbert.net/) — `all-mpnet-base-v2`
- [FAISS](https://github.com/facebookresearch/faiss) — Facebook AI Similarity Search
- [FastAPI](https://fastapi.tiangolo.com/) — async Python web framework
- [Framer Motion](https://www.framer.com/motion/) — React animation library

<br/>

---

<!-- Made with Love section -->
<div align="center">

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0d0d20,100:1a0a2e&height=2&section=header" width="100%"/>

<br/>

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=22&pause=1000&color=BB86FC&center=true&vCenter=true&width=700&lines=Made+with+%E2%9D%A4%EF%B8%8F+for+Movie+Lovers+Like+That.;Built+by+passionate+cinephiles+%26+engineers." alt="Made with Love" />

<br/>

## ◈ Authors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Arghyadevs">
        <img src="https://img.shields.io/badge/Arghyadevs-00E5FF?style=for-the-badge&logo=github&logoColor=black" alt="Arghyadevs"/>
      </a>
      <br/><br/>
      <sub><b>Backend · Frontend · AWS Infrastructure</b></sub><br/>
      <sub>FastAPI · Next.js · EC2 · Amplify · DevOps</sub>
    </td>
    <td align="center">
      <a href="https://github.com/SoumyaJanaJGEC2001">
        <img src="https://img.shields.io/badge/Lucifer-BB86FC?style=for-the-badge&logo=github&logoColor=black" alt="Lucifer"/>
      </a>
      <br/><br/>
      <sub><b>ML Pipeline · Vector Search Engine</b></sub><br/>
      <sub>FAISS · SentenceTransformers · Embeddings · TMDB Data</sub>
    </td>
  </tr>
</table>

<br/>

<!-- Contribution snake or streak animation alternative -->
<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=500&size=14&pause=800&color=00FF41&center=true&vCenter=true&width=700&lines=Backend+hosted+on+AWS+EC2+%E2%80%94+FastAPI+%2B+Uvicorn+%2B+FAISS;Frontend+deployed+on+AWS+Amplify+%E2%80%94+Next.js+16+%2B+React+19;Vector+search+in+768+dimensions+%E2%80%94+all-mpnet-base-v2;Built+for+people+who+are+serious+about+what+they+watch+next." alt="Stack Details" />

<br/>

<img src="https://img.shields.io/badge/Backend-AWS%20EC2-FF9900?style=flat-square&logo=amazon-ec2&logoColor=white"/>
&nbsp;
<img src="https://img.shields.io/badge/Frontend-AWS%20Amplify-FF9900?style=flat-square&logo=aws-amplify&logoColor=white"/>
&nbsp;
<img src="https://img.shields.io/badge/ML-FAISS%20%2B%20SentenceTransformers-764ABC?style=flat-square&logo=pytorch&logoColor=white"/>
&nbsp;
<img src="https://img.shields.io/badge/Made%20with-%E2%9D%A4%EF%B8%8F%20Love-ff69b4?style=flat-square"/>

</div>

<br/>

<!-- Wave footer -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:BB86FC,100:00E5FF&height=100&section=footer&text=NeuralFlix%20%E2%80%94%20Arghyadevs%20%C3%97%20Lucifer&fontSize=18&fontColor=ffffff&fontAlignY=65&animation=twinkling" width="100%"/>

<div align="center">
<sub>Built for people who are serious about what they watch next. &nbsp;|&nbsp; <b>Arghyadevs</b> &amp; <b>Lucifer</b> · 2025</sub>
</div>
