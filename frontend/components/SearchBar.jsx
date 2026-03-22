"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Loader2 } from "lucide-react";

export default function SearchBar({ onSelectMovie, isLoading }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allTitles, setAllTitles] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Fetch all titles on mount
  useEffect(() => {
    fetch("/api/titles")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setAllTitles(data);
      })
      .catch(console.error);
  }, []);

  // Filter suggestions
  const filterSuggestions = useCallback(
    (input) => {
      if (!input.trim()) {
        setSuggestions([]);
        return;
      }
      const lower = input.toLowerCase();
      const filtered = allTitles
        .filter((t) => t.toLowerCase().includes(lower))
        .slice(0, 8);
      setSuggestions(filtered);
      setHighlightedIndex(-1);
    },
    [allTitles]
  );

  // Debounced input handler
  useEffect(() => {
    const timer = setTimeout(() => filterSuggestions(query), 200);
    return () => clearTimeout(timer);
  }, [query, filterSuggestions]);

  const handleSelect = (title) => {
    setQuery(title);
    setSuggestions([]);
    setIsFocused(false);
    inputRef.current?.blur();
    onSelectMovie(title);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
        handleSelect(suggestions[highlightedIndex]);
      } else if (query.trim()) {
        handleSelect(query.trim());
      }
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const clearQuery = () => {
    setQuery("");
    setSuggestions([]);
    inputRef.current?.focus();
  };

  const showDropdown = isFocused && suggestions.length > 0;

  return (
    <div className="relative w-full max-w-2xl mx-auto" id="search-bar">
      {/* Glow ring */}
      <motion.div
        className="absolute -inset-1 rounded-2xl opacity-0 pointer-events-none"
        animate={{
          opacity: isFocused ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background:
            "linear-gradient(135deg, rgba(0,229,255,0.2), rgba(187,134,252,0.2))",
          filter: "blur(12px)",
        }}
      />

      {/* Input container */}
      <div
        className={`relative flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-300 ${
          isFocused
            ? "glass border-accent-cyan/30 glow-cyan"
            : "glass border-glass-border"
        }`}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 text-accent-cyan animate-spin flex-shrink-0" />
        ) : (
          <Search className="w-5 h-5 text-text-dim flex-shrink-0" />
        )}

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            // Delay to allow click on suggestion
            setTimeout(() => setIsFocused(false), 200);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search for a movie... (e.g. Inception, The Dark Knight)"
          disabled={isLoading}
          className="flex-1 bg-transparent outline-none text-text-primary placeholder:text-text-dim text-base sm:text-lg"
          id="search-input"
          autoComplete="off"
        />

        {query && (
          <button
            onClick={clearQuery}
            className="p-1 rounded-lg hover:bg-glass-bg-hover transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-text-dim" />
          </button>
        )}
      </div>

      {/* Autocomplete dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 rounded-xl overflow-hidden"
            style={{
              background: "rgba(15, 15, 25, 0.92)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(0,229,255,0.05)",
            }}
            id="search-dropdown"
          >
            <div className="p-2">
              <div className="px-3 py-1.5 text-[10px] text-text-dim uppercase tracking-widest font-mono">
                Suggestions • {suggestions.length} results
              </div>
              {suggestions.map((title, idx) => (
                <button
                  key={title}
                  onClick={() => handleSelect(title)}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-150 ${
                    idx === highlightedIndex
                      ? "bg-accent-cyan/10 text-accent-cyan"
                      : "text-text-primary hover:bg-glass-bg-hover"
                  }`}
                >
                  <Search
                    className={`w-3.5 h-3.5 flex-shrink-0 ${
                      idx === highlightedIndex
                        ? "text-accent-cyan"
                        : "text-text-dim"
                    }`}
                  />
                  <span className="truncate text-sm">{title}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
