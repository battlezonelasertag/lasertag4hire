"use client";

import { useState } from "react";

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section
      className="section-dark py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 50%, rgba(37,99,235,0.12) 0%, transparent 55%), radial-gradient(circle at 70% 50%, rgba(225,29,72,0.1) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-white/50"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            See it in action
          </span>
          <h2
            className="section-heading text-white"
            style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)" }}
          >
            Epic battles. Every time.
          </h2>
        </div>

        {/* Video placeholder */}
        <div
          className="relative rounded-[1.5rem] overflow-hidden mx-auto"
          style={{ maxWidth: "900px", aspectRatio: "16/9", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Replace with actual video */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: "linear-gradient(145deg, #0C1B3A 0%, #1a0a1a 100%)",
            }}
          >
            {/* Placeholder visual */}
            <div className="text-center">
              <div
                className="text-6xl font-bold text-white/10 mb-4"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                LT4H
              </div>
              <p
                className="text-white/30 text-sm"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Event video coming soon
              </p>
            </div>
          </div>

          {/* Play button overlay */}
          {!playing && (
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex items-center justify-center group"
              aria-label="Play video"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(12px)",
                  border: "1.5px solid rgba(255,255,255,0.3)",
                }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="white"
                  style={{ marginLeft: "3px" }}
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
