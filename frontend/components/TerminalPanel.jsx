"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Minimize2, Maximize2 } from "lucide-react";

export default function TerminalPanel({ logs }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when new logs drop
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isOpen, isExpanded]);

  return (
    <>
      {/* Floating Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 bg-void-light border border-glass-border px-4 py-3 rounded-full flex items-center gap-2 text-terminal-green shadow-[0_0_20px_rgba(0,255,65,0.15)] hover:shadow-[0_0_30px_rgba(0,255,65,0.3)] hover:scale-105 transition-all duration-300"
          >
            <Terminal className="w-4 h-4" />
            <span className="font-mono text-sm tracking-widest hidden sm:inline">
              ENGAGE NERD MODE
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{
              opacity: 1,
              y: 0,
              height: isExpanded ? "60vh" : "300px",
            }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#050505] border-t border-glass-border shadow-[0_-10px_40px_rgba(0,0,0,0.8)] flex flex-col font-mono text-sm"
          >
            {/* Header / Title Bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#111] border-b border-[#222]">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex items-center gap-2 text-text-dim text-xs tracking-wider">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>faiss_pipeline.log</span>
                </div>
              </div>

              <div className="flex gap-1">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1.5 text-text-dim hover:text-text-primary hover:bg-[#222] rounded transition-colors"
                >
                  {isExpanded ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-text-dim hover:text-red-400 hover:bg-[#222] rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Terminal Output */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-1.5 scroll-smooth"
            >
              <div className="text-terminal-green/50 mb-4 whitespace-pre">
                {`  _   _                       _ ______ _ _      
 | \\ | |                     | |  ____| (_)     
 |  \\| | ___ _   _ _ __  __ _| | |__  | |___  __
 | . \` |/ _ \\ | | | '__|/ _\` | |  __| | | \\ \\/ /
 | |\\  |  __/ |_| | |  | (_| | | |    | | |>  < 
 |_| \\_|\\___|\\__,_|_|   \\__,_|_|_|    |_|_/_/\\_\\`}
              </div>
              <div className="text-text-secondary mb-4 opacity-70">
                System initialized. Listening for query requests...
              </div>

              {logs.map((log, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${
                    log.type === "error"
                      ? "text-red-400"
                      : log.type === "warn"
                      ? "text-yellow-400"
                      : log.type === "success"
                      ? "text-accent-cyan"
                      : "text-terminal-green"
                  }`}
                >
                  <span className="text-text-dim opacity-50 shrink-0 select-none">
                    {new Date(log.timestamp).toISOString().split("T")[1].slice(0, 12)}
                  </span>
                  <span className="break-words">
                    {log.type === "prefix" ? "❯ " : ""}
                    {log.message}
                  </span>
                </div>
              ))}
              
              <div className="flex gap-3 text-terminal-green mt-2">
                <span className="text-text-dim opacity-50 shrink-0 select-none">
                  {new Date().toISOString().split("T")[1].slice(0, 12)}
                </span>
                <span className="cursor-blink">❯ </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
