"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Cpu, Database, Zap, Network } from "lucide-react";

const STEPS = [
  { text: "Initializing FAISS index...", icon: Database, delay: 0 },
  { text: "Loading 768-dim embeddings...", icon: Cpu, delay: 600 },
  { text: "Encoding query vector...", icon: Zap, delay: 1200 },
  { text: "Computing cosine similarity...", icon: Network, delay: 1800 },
  { text: "Nearest neighbors found: 8", icon: Zap, delay: 2400 },
];

const NODE_COUNT = 12;

export default function NeuralLoader() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timers = STEPS.map((step, i) =>
      setTimeout(() => setActiveStep(i), step.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Generate node positions in a circle
  const nodes = [...Array(NODE_COUNT)].map((_, i) => {
    const angle = (i / NODE_COUNT) * Math.PI * 2;
    const radius = 80;
    return {
      x: Math.cos(angle) * radius + 110,
      y: Math.sin(angle) * radius + 110,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-20 px-4"
      id="neural-loader"
    >
      {/* Neural network visualization */}
      <div className="relative w-56 h-56 mb-10">
        <svg
          viewBox="0 0 220 220"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Connection lines */}
          {nodes.map((from, i) =>
            nodes
              .slice(i + 1)
              .filter((_, j) => (i + j) % 3 === 0)
              .map((to, j) => (
                <motion.line
                  key={`${i}-${j}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="url(#lineGradient)"
                  strokeWidth={0.8}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: [0, 1],
                    opacity: [0, 0.4, 0.1],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.15 + j * 0.1,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              ))
          )}

          {/* Gradient definition */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#BB86FC" stopOpacity="0.6" />
            </linearGradient>
            <radialGradient id="nodeGlow">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Nodes */}
          {nodes.map((node, i) => (
            <motion.g key={i}>
              {/* Glow */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={8}
                fill="url(#nodeGlow)"
                animate={{
                  r: [6, 12, 6],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 2 + (i % 3) * 0.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
              {/* Core dot */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={3}
                fill="#00E5FF"
                animate={{
                  r: [2, 4, 2],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5 + (i % 4) * 0.3,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            </motion.g>
          ))}

          {/* Center core */}
          <motion.circle
            cx={110}
            cy={110}
            r={6}
            fill="#BB86FC"
            animate={{
              r: [5, 8, 5],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx={110}
            cy={110}
            r={20}
            fill="none"
            stroke="#BB86FC"
            strokeWidth={0.5}
            animate={{
              r: [15, 30, 15],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </svg>
      </div>

      {/* Step text */}
      <div className="flex flex-col items-center gap-3 max-w-md">
        <motion.h3
          className="text-lg font-semibold text-text-primary"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Searching Neural Pathways
        </motion.h3>

        <div className="space-y-2 w-full">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isActive = i <= activeStep;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: isActive ? 1 : 0.2,
                  x: isActive ? 0 : -10,
                }}
                transition={{ duration: 0.3, delay: step.delay / 1000 }}
                className="flex items-center gap-3 font-mono text-xs sm:text-sm"
              >
                <Icon
                  className={`w-4 h-4 flex-shrink-0 ${
                    isActive ? "text-accent-cyan" : "text-text-dim"
                  }`}
                />
                <span
                  className={
                    i === activeStep
                      ? "text-accent-cyan"
                      : isActive
                      ? "text-text-secondary"
                      : "text-text-dim"
                  }
                >
                  {step.text}
                </span>
                {i === activeStep && (
                  <motion.span
                    className="text-accent-cyan"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    █
                  </motion.span>
                )}
                {i < activeStep && (
                  <span className="text-terminal-green ml-auto">✓</span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
