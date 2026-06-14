"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Placeholder grid using picsum
const GALLERY_ITEMS = [
  { seed: "lt4h-01", aspect: "tall", alt: "Kids playing laser tag" },
  { seed: "lt4h-02", aspect: "wide", alt: "Laser tag battle outdoors" },
  { seed: "lt4h-03", aspect: "square", alt: "Team game setup" },
  { seed: "lt4h-04", aspect: "tall", alt: "Birthday party laser tag" },
  { seed: "lt4h-05", aspect: "square", alt: "Corporate team day" },
  { seed: "lt4h-06", aspect: "wide", alt: "School group laser tag" },
  { seed: "lt4h-07", aspect: "square", alt: "Laser tag equipment" },
  { seed: "lt4h-08", aspect: "tall", alt: "Outdoor laser battle" },
];

const ASPECT_CLASSES: Record<string, string> = {
  tall:   "row-span-2",
  wide:   "col-span-2",
  square: "",
};

const PLACEHOLDER_COLORS = [
  "linear-gradient(135deg, #1e3a6e, #2563EB)",
  "linear-gradient(135deg, #7f1d2a, #E11D48)",
  "linear-gradient(135deg, #1e3a6e, #0ea5e9)",
  "linear-gradient(135deg, #4c1d95, #E11D48)",
  "linear-gradient(135deg, #064e3b, #2563EB)",
  "linear-gradient(135deg, #7f1d2a, #F97316)",
  "linear-gradient(135deg, #1e3a6e, #2563EB)",
  "linear-gradient(135deg, #1a1a2e, #E11D48)",
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = gridRef.current?.querySelectorAll(".gallery-item");
    if (!items) return;
    items.forEach((item, i) => {
      gsap.from(item, {
        scale: 0.95,
        opacity: 0,
        duration: 0.7,
        delay: i * 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 80%", once: true },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="section-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span
              className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-[var(--blue)]"
              style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.15)" }}
            >
              Gallery
            </span>
            <h2
              className="section-heading text-[var(--ink)]"
              style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)" }}
            >
              Battles worth remembering
            </h2>
          </div>
          <p
            className="text-[var(--muted)] text-sm max-w-xs leading-relaxed"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Real events. Real fun. Your photos here.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
          style={{ gridAutoRows: "200px" }}
        >
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={item.seed}
              className={`gallery-item rounded-2xl overflow-hidden relative ${ASPECT_CLASSES[item.aspect]}`}
            >
              {/* Placeholder gradient — replace with real images */}
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length] }}
              >
                <svg
                  className="opacity-20"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M20 5h-2.586l-2.707-2.707A1 1 0 0014 2H10a1 1 0 00-.707.293L6.586 5H4a2 2 0 00-2 2v11a2 2 0 002 2h16a2 2 0 002-2V7a2 2 0 00-2-2zM12 17a4 4 0 110-8 4 4 0 010 8z" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <p
          className="text-center text-[var(--muted)] text-xs mt-6"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Photos coming soon — real events, real kids, real battles.
        </p>
      </div>
    </section>
  );
}
