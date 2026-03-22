"use client";

import { motion } from "framer-motion";
import MovieCard from "./MovieCard";
import { Sparkles } from "lucide-react";

export default function RecommendationGrid({ inputMovie, recommendations }) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto w-full" id="recommendations">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center sm:text-left"
      >
        <div className="flex items-center justify-center sm:justify-start gap-2 text-accent-cyan font-mono text-sm uppercase tracking-widest mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Results Generated</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Because you grouped{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple">
            {inputMovie?.title || "that selection"}
          </span>
        </h2>
        <p className="text-text-secondary text-lg max-w-2xl">
          Here are your top neural matches based on cosine distance across 768
          feature dimensions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recommendations.map((movie, index) => (
          <MovieCard key={movie.tmdb_id || movie.title} movie={movie} index={index} />
        ))}
      </div>
    </section>
  );
}
