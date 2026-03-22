"use client";

import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

export default function HeroSection({ onSelectMovie, isLoading }) {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(0,229,255,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(187,134,252,0.06) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(0,229,255,0.04) 0%, transparent 50%)",
          }}
        />
        <div className="grid-bg absolute inset-0 opacity-50" />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-accent-cyan"
          style={{
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 25}%`,
            opacity: 0.3,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-3xl w-full text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
          <span className="text-xs font-mono text-text-secondary tracking-wider uppercase">
            FAISS Vector Engine • 768-dim Embeddings
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4"
        >
          <span className="bg-gradient-to-r from-text-primary via-accent-cyan to-accent-purple bg-clip-text text-transparent">
            NeuralFlix
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg sm:text-xl text-text-secondary mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Find your next obsession. Powered by{" "}
          <span className="text-accent-cyan font-medium">neural embeddings</span>{" "}
          and{" "}
          <span className="text-accent-purple font-medium">
            cosine similarity search
          </span>
          .
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <SearchBar onSelectMovie={onSelectMovie} isLoading={isLoading} />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex items-center justify-center gap-8 mt-10"
        >
          {[
            { label: "Movies Indexed", value: "600+" },
            { label: "Vector Dimensions", value: "768" },
            { label: "Search Model", value: "MPNet" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-lg font-bold font-mono text-accent-cyan">
                {stat.value}
              </div>
              <div className="text-xs text-text-dim uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
