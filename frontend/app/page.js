"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import NeuralLoader from "@/components/NeuralLoader";
import RecommendationGrid from "@/components/RecommendationGrid";
import TerminalPanel from "@/components/TerminalPanel";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [inputMovie, setInputMovie] = useState(null);
  const [logs, setLogs] = useState([]);

  const addLog = useCallback((message, type = "info") => {
    setLogs((prev) => [...prev, { message, type, timestamp: Date.now() }]);
  }, []);

  const handleSelectMovie = async (title) => {
    if (!title) return;
    
    setIsLoading(true);
    setRecommendations(null);
    
    // Terminal logging flow
    addLog(`Received query for: "${title}"`, "prefix");
    
    try {
      addLog(`Initializing FAISS search pipeline...`);
      
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch recommendations");
      }

      // Simulate network delay for effect and terminal logs
      setTimeout(() => addLog(`Extracted feature vector from database.`), 800);
      setTimeout(() => addLog(`Querying FAISS index [model: ${data.meta.model}]...`), 1500);
      setTimeout(() => addLog(`Found ${data.recommendations.length} nearest neighbors. L2 distance computed.`, "success"), 2200);

      setTimeout(() => {
        setInputMovie(data.input);
        setRecommendations(data.recommendations);
        setIsLoading(false);
        
        // Scroll to results smoothly
        setTimeout(() => {
          document.getElementById("recommendations")?.scrollIntoView({ 
            behavior: "smooth",
            block: "start"
          });
        }, 100);
      }, 3000);

    } catch (err) {
      console.error(err);
      addLog(`ERR: ${err.message}`, "error");
      setIsLoading(false);
      alert(err.message);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Background stays persistent */}
      <HeroSection onSelectMovie={handleSelectMovie} isLoading={isLoading} />

      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex justify-center w-full bg-void-light/50 border-y border-glass-border"
          >
            <NeuralLoader />
          </motion.div>
        )}

        {recommendations && !isLoading && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 bg-void"
          >
            <RecommendationGrid 
              inputMovie={inputMovie} 
              recommendations={recommendations} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <TerminalPanel logs={logs} />
      
      {/* Footer */}
      {recommendations && !isLoading && (
        <footer className="py-8 text-center border-t border-glass-border">
          <p className="text-text-dim text-sm font-mono uppercase tracking-widest">
            Powered by FAISS & Sentence-Transformers
          </p>
        </footer>
      )}
    </main>
  );
}
