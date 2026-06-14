"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "@/lib/data";
import type { Testimonial } from "@/lib/types";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "birthday", label: "Birthday" },
  { id: "school", label: "School" },
  { id: "corporate", label: "Corporate" },
  { id: "community", label: "Community" },
] as const;

export default function Testimonials() {
  const [active, setActive] = useState<string>("all");
  const constraintsRef = useRef<HTMLDivElement>(null);

  const filtered = active === "all"
    ? TESTIMONIALS
    : TESTIMONIALS.filter((t) => t.category === active);

  return (
    <section className="section-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">
          <div>
            <span
              className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-[var(--blue)]"
              style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.15)" }}
            >
              Reviews
            </span>
            <h2
              className="section-heading text-[var(--ink)]"
              style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)" }}
            >
              Don&apos;t just take our word for it
            </h2>
          </div>

          {/* Rating aggregate */}
          <div
            className="flex items-center gap-3 px-5 py-3 rounded-2xl self-start sm:self-auto"
            style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}
          >
            <div
              className="text-3xl font-bold text-[var(--ink)]"
              style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}
            >
              4.9
            </div>
            <div>
              <div className="flex gap-0.5 mb-0.5">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="var(--orange)">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <div
                className="text-xs text-[var(--muted)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                500+ events
              </div>
            </div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-250"
              style={{
                fontFamily: "var(--font-dm-sans)",
                background: active === cat.id ? "var(--blue)" : "rgba(0,0,0,0.05)",
                color: active === cat.id ? "white" : "var(--muted)",
                border: "none",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Draggable carousel */}
        <div ref={constraintsRef} className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="flex gap-4 overflow-x-auto scroll-strip pb-4"
            >
              {filtered.map((t, i) => (
                <TestimonialCard key={t.id} t={t} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: index * 0.06,
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="flex-shrink-0 card-bezel-outer"
      style={{ width: "clamp(280px, 40vw, 340px)" }}
    >
      <div className="card-bezel-inner p-6">
        {/* Stars */}
        <div className="flex gap-0.5 mb-4">
          {Array.from({ length: t.rating }).map((_, i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--orange)">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>

        {/* Quote */}
        <p
          className="text-[var(--ink)] leading-relaxed text-sm mb-5"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          &ldquo;{t.quote}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
            style={{
              background: index % 2 === 0 ? "var(--blue)" : "var(--crimson)",
              fontFamily: "var(--font-syne)",
            }}
          >
            {t.name.charAt(0)}
          </div>
          <div>
            <div
              className="text-sm font-semibold text-[var(--ink)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {t.name}
            </div>
            <div
              className="text-xs text-[var(--muted)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {t.role}
            </div>
          </div>
          <div className="ml-auto">
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                background: "var(--sky)",
                color: "var(--blue)",
                fontFamily: "var(--font-dm-sans)",
              }}
            >
              {t.location}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
