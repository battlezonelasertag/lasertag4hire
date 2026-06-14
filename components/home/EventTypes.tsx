"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EVENT_TYPES } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function EventTypes() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headRef.current) {
      gsap.from(headRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 85%", once: true },
      });
    }

    const cards = stripRef.current?.querySelectorAll(".event-card");
    if (cards) {
      cards.forEach((card, i) => {
        gsap.from(card, {
          x: 30,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: stripRef.current, start: "top 80%", once: true },
        });
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="section-sky py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headRef} className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span
              className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-[var(--blue)]"
              style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.15)" }}
            >
              Who books with us
            </span>
            <h2
              className="section-heading text-[var(--ink)]"
              style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)" }}
            >
              Perfect for any occasion
            </h2>
          </div>
          <p
            className="text-[var(--muted)] max-w-xs text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            One hire covers ages 5 to 105. Flexible, fun, and adaptable to any event type.
          </p>
        </div>

        {/* Horizontal scroll strip */}
        <div
          ref={stripRef}
          className="scroll-strip pb-4 -mx-6 px-6"
          style={{ gap: "1rem" }}
        >
          {EVENT_TYPES.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Scroll hint — mobile */}
        <p
          className="text-[var(--muted)] text-xs mt-4 flex items-center gap-1.5 sm:hidden"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          Scroll to see more
        </p>
      </div>
    </section>
  );
}

function EventCard({ event }: { event: typeof EVENT_TYPES[0] }) {
  return (
    <div
      className="event-card flex-shrink-0 relative overflow-hidden rounded-[1.5rem] cursor-pointer group"
      style={{
        width: "clamp(240px, 36vw, 320px)",
        minHeight: "380px",
        background: `linear-gradient(${event.gradient})`,
      }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)" }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6" style={{ minHeight: "380px" }}>
        <div>
          {/* Category pill */}
          <span
            className="eyebrow inline-block px-3 py-1 rounded-full text-white/70"
            style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            {event.name}
          </span>
        </div>

        <div>
          <h3
            className="card-heading text-white text-xl mb-3"
          >
            {event.name}
          </h3>
          <p
            className="text-white/70 text-sm leading-relaxed mb-4"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {event.description}
          </p>

          {/* Highlights */}
          <div className="flex flex-col gap-1.5">
            {event.highlights.map((h) => (
              <span
                key={h}
                className="flex items-center gap-2 text-xs text-white/70"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                <span
                  className="w-1 h-1 rounded-full flex-shrink-0"
                  style={{ background: "white" }}
                />
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hover shimmer */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
