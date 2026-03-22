"use client";

import { motion } from "framer-motion";
import { Star, Navigation } from "lucide-react";

export default function MovieCard({ movie, index }) {
  const { title, year, genres, rating, plot, similarity, reasons, posterUrl } = movie;

  // Final Background Image
  const bgImage = posterUrl || `https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=600`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-[420px] rounded-2xl overflow-hidden glass hover:glow-cyan border border-glass-border transition-all duration-300 transform hover:-translate-y-2"
    >
      {/* Background Poster (Simulated with gradient overlay) */}
      <div className="absolute inset-0 z-0 bg-void-lighter">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out group-hover:scale-105"
          style={{
            backgroundImage: `url('${bgImage}')`,
          }}
        />
        <div className="absolute inset-0 bg-void/60 group-hover:bg-void/80 transition-colors duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/90 to-transparent" />
      </div>

      {/* Similarity Match Badge */}
      {similarity && (
        <div className="absolute top-4 right-4 z-20">
          <div className="glass px-2.5 py-1 rounded-full border border-accent-cyan/30 flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,229,255,0.2)]">
            <Navigation className="w-3 h-3 text-accent-cyan" />
            <span className="font-mono text-xs font-bold text-text-primary">
              {(similarity * 100).toFixed(1)}% Match
            </span>
          </div>
        </div>
      )}

      {/* Content Container */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5 flex flex-col justify-end h-full">
        {/* Always visible info */}
        <div className="transform transition-transform duration-300 group-hover:-translate-y-4">
          <div className="flex items-center gap-2 mb-2 text-text-secondary text-sm font-medium">
            <span>{year}</span>
            {rating && (
              <>
                <span className="w-1 h-1 rounded-full bg-glass-border" />
                <span className="flex items-center gap-1 text-rating-gold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {rating.toFixed(1)}
                </span>
              </>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-text-primary leading-tight mb-2 drop-shadow-md">
            {title}
          </h3>

          <div className="flex flex-wrap gap-1.5 mb-1">
            {(genres || []).slice(0, 3).map((g) => (
              <span
                key={g}
                className="px-2 py-0.5 rounded uppercase tracking-wider text-[10px] font-semibold bg-white/10 text-text-secondary"
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Hover Reveal: Plot & Reasons */}
        <div className="absolute left-5 right-5 bottom-5 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
          <p className="text-sm text-text-secondary line-clamp-3 mb-3 leading-relaxed">
            {plot || "No synopsis available."}
          </p>

          {reasons && reasons.length > 0 && (
            <div className="pt-3 border-t border-glass-border">
              <span className="text-[10px] uppercase font-mono tracking-wider text-text-dim block mb-1">
                Vector Analysis
              </span>
              <p className="text-xs text-accent-purple font-medium line-clamp-1">
                {reasons[0]}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
