import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const { title } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    // Fetch recommendations from local FastAPI python server
    const aiResponse = await fetch("http://13.222.149.92:8000/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title, top_k: 8 }),
    });

    if (!aiResponse.ok) {
      const err = await aiResponse.json();
      return NextResponse.json(
        { error: err.detail || `FastAPI backend error: ${aiResponse.status}` },
        { status: aiResponse.status }
      );
    }

    const aiData = await aiResponse.json();
    const scored = aiData.recommendations || [];
    const inputMovie = aiData.input;

    // Compute match reasons and fetch actual TMDB posters
    const TMDB_API_KEY = process.env.TMDB_API_KEY;
    const inputGenres = new Set(inputMovie.genres || []);

    const recommendations = await Promise.all(scored.map(async (rec) => {
      const reasons = [];
      const sharedGenres = (rec.genres || []).filter((g) => inputGenres.has(g));
      if (sharedGenres.length > 0) {
        reasons.push(`Genre match: ${sharedGenres.join(", ")}`);
      }

      const inputCast = new Set(inputMovie.cast || []);
      const sharedCast = (rec.cast || []).filter((c) => inputCast.has(c));
      if (sharedCast.length > 0) {
        reasons.push(`Shared actor(s): ${sharedCast.join(", ")}`);
      }

      const inputDirectors = new Set(inputMovie.directors || []);
      const sharedDirectors = (rec.directors || []).filter((d) =>
        inputDirectors.has(d)
      );
      if (sharedDirectors.length > 0) {
        reasons.push(`Same director: ${sharedDirectors.join(", ")}`);
      }

      if (reasons.length === 0) {
        reasons.push("Similar mood and storytelling (semantic similarity)");
      }

      let posterUrl = null;
      if (rec.tmdb_id) {
        try {
          const type = rec.content_type === "TV Series" ? "tv" : "movie";
          const res = await fetch(`https://api.themoviedb.org/3/${type}/${rec.tmdb_id}?api_key=${TMDB_API_KEY}`);
          const tmdbData = await res.json();
          if (tmdbData.poster_path) {
            posterUrl = `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`;
          }
        } catch (e) {
          console.error("Poster fetch failed:", e);
        }
      }

      return {
        title: rec.title,
        year: rec.year,
        genres: rec.genres,
        rating: rec.rating,
        plot: rec.plot,
        cast: rec.cast,
        directors: rec.directors,
        keywords: rec.keywords,
        tmdb_id: rec.tmdb_id,
        content_type: rec.content_type,
        similarity: rec.similarity,
        posterUrl,
        reasons,
      };
    }));

    return NextResponse.json({
      input: {
        title: inputMovie.title,
        year: inputMovie.year,
        genres: inputMovie.genres,
        rating: inputMovie.rating,
      },
      recommendations,
      meta: {
        engine: "FAISS (python)",
        index_size: "unknown",
        vector_dim: 768,
        model: "all-mpnet-base-v2",
      },
    });
  } catch (error) {
    console.error("Error in recommend API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
