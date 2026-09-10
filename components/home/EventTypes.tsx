"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EVENT_TYPES } from "@/lib/data";
import ScrollArrows from "@/components/ui/ScrollArrows";

gsap.registerPlugin(ScrollTrigger);

export default function EventTypes() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const stripWrapRef = useRef<HTMLDivElement>(null);

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
        // y, not x — a horizontal offset shifts the scroll container's resting
        // scrollLeft and makes the back arrow appear before you've scrolled.
        gsap.from(card, {
          y: 24,
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
        <div ref={headRef} className="mb-10">
          <h2
            className="section-heading text-[var(--ink)]"
            style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)" }}
          >
            From kids&apos; birthdays to corporate team days
          </h2>
        </div>

        {/* Horizontal scroll strip */}
        <div ref={stripWrapRef} style={{ position: "relative" }}>
          <div
            ref={stripRef}
            className="scroll-strip pb-4 -mx-6 px-6"
            style={{ gap: "1rem" }}
          >
            {EVENT_TYPES.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {/* Strip bleeds 24px past this wrapper via -mx-6 */}
          <ScrollArrows containerRef={stripWrapRef} bleed={24} />
        </div>

        {/* Scroll hint — mobile */}
        <p
          className="text-[var(--muted)] text-[13px] mt-4 flex items-center gap-1.5 sm:hidden"
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
        width: "clamp(260px, 38vw, 340px)",
        minHeight: "460px",
        background: `linear-gradient(${event.gradient})`,
      }}
    >
      {/* Photo — fills the card, fading to dark toward the bottom */}
      <img
        src={event.image}
        alt={event.name}
        className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ objectFit: "cover", objectPosition: "center 20%" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 28%, rgba(0,0,0,0.55) 48%, rgba(0,0,0,0.92) 66%, rgba(0,0,0,0.96) 100%)",
        }}
      />

      {/* Content — anchored to the bottom half */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6">
        <h3 className="card-heading text-white text-2xl mb-3">
          {event.name}
        </h3>
        <p
          className="text-white/80 text-base leading-relaxed mb-4"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          {event.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-col gap-2">
          {event.highlights.map((h) => (
            <span
              key={h}
              className="flex items-center gap-2 text-sm text-white/80"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "white" }}
              />
              {h}
            </span>
          ))}
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
