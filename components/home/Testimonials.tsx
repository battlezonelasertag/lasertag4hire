"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GOOGLE_REVIEWS, TESTIMONIALS } from "@/lib/data";
import type { Testimonial } from "@/lib/types";
import ScrollArrows from "@/components/ui/ScrollArrows";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "birthday", label: "Birthdays" },
  { id: "school", label: "Schools & vac care" },
  { id: "community", label: "Youth groups" },
  { id: "groups", label: "Families & groups" },
] as const;

export default function Testimonials() {
  const [active, setActive] = useState<string>("all");
  const constraintsRef = useRef<HTMLDivElement>(null);
  const stripWrapRef = useRef<HTMLDivElement>(null);

  const filtered = active === "all"
    ? TESTIMONIALS
    : TESTIMONIALS.filter((t) => t.category === active);

  return (
    <section className="section-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">
          <div>
            <h2
              className="section-heading text-[var(--ink)]"
              style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)" }}
            >
              {GOOGLE_REVIEWS.rating} stars from {GOOGLE_REVIEWS.count} Google reviews
            </h2>
          </div>

          {/* Rating aggregate */}
          <a
            href={GOOGLE_REVIEWS.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-3 rounded-2xl self-start sm:self-auto transition-transform duration-150 active:scale-[0.97]"
            style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", textDecoration: "none" }}
          >
            <div
              className="text-3xl font-bold text-[var(--ink)]"
              style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}
            >
              {GOOGLE_REVIEWS.rating}
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
                className="text-[13px] text-[var(--muted)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {GOOGLE_REVIEWS.count} reviews on Google
              </div>
            </div>
          </a>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className="px-4 py-1.5 rounded-full text-[15px] font-medium transition-all duration-250"
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

        {/* Draggable carousel — arrows sit outside the overflow clip */}
        <div ref={stripWrapRef} style={{ position: "relative" }}>
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

          {/* resetKey re-binds listeners when the filter swaps the strip element */}
          <ScrollArrows containerRef={stripWrapRef} resetKey={active} />
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
        <div className="flex gap-0.5 mb-4" aria-label={`${t.rating} out of 5 stars`} role="img">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < t.rating ? "var(--orange)" : "rgba(0,0,0,0.12)"}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>

        {/* Quote once pasted from Google; until then, what they hired for and a link to read it */}
        {t.quote ? (
          <>
            <p
              className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] mb-2"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {t.event}
            </p>
            <ReviewText quote={t.quote} />
          </>
        ) : (
          <div className="mb-5">
            <p
              className="card-heading text-[var(--ink)] text-xl mb-2"
              style={{ lineHeight: 1.2 }}
            >
              {t.event}
            </p>
            <a
              href={GOOGLE_REVIEWS.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-semibold text-[var(--blue)]"
              style={{ fontFamily: "var(--font-dm-sans)", textDecoration: "none" }}
            >
              Read {t.name.split(" ")[0]}&apos;s review on Google ↗
            </a>
          </div>
        )}

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
              className="text-base font-semibold text-[var(--ink)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {t.name}
            </div>
            <div
              className="text-[13px] text-[var(--muted)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {t.rating}-star review
            </div>
          </div>
          <div className="ml-auto">
            <span
              className="text-[13px] px-2 py-0.5 rounded-full"
              style={{
                background: "var(--sky)",
                color: "var(--blue)",
                fontFamily: "var(--font-dm-sans)",
              }}
            >
              {t.source}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* Full review text, clamped to six lines with an in-place "Read more" when it runs longer. */
function ReviewText({ quote }: { quote: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const paragraphs = quote.split(/\n\s*\n/);

  useLayoutEffect(() => {
    const el = ref.current;
    if (el) setOverflows(el.scrollHeight > el.clientHeight + 1);
  }, [quote]);

  return (
    <div className="mb-5">
      <div
        ref={ref}
        className={`text-[var(--ink)] leading-relaxed text-base ${expanded ? "" : "line-clamp-6"}`}
        style={{ fontFamily: "var(--font-dm-sans)", whiteSpace: "pre-line" }}
      >
        {paragraphs.map((para, i) => (
          <p key={i} className={i > 0 ? "mt-3" : ""}>
            {i === 0 && "\u201C"}
            {para}
            {i === paragraphs.length - 1 && "\u201D"}
          </p>
        ))}
      </div>
      {(overflows || expanded) && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-[15px] font-semibold text-[var(--blue)] transition-transform duration-150 active:scale-[0.97]"
          style={{ fontFamily: "var(--font-dm-sans)", background: "none", border: "none", padding: 0, cursor: "pointer" }}
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}
