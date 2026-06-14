"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FEATURES } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const FEATURE_ICONS: Record<string, React.ReactNode> = {
  truck: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="2" />
      <path d="M16 8h5l3 5v5h-8V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  shield: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  phone: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .99h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  calendar: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" strokeWidth="2" />
    </svg>
  ),
  battery: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="16" height="10" rx="2" />
      <line x1="22" y1="11" x2="22" y2="13" strokeWidth="2" />
      <line x1="6" y1="12" x2="12" y2="12" />
    </svg>
  ),
  map: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
  ),
};

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll(".feature-item");
    if (!items) return;
    items.forEach((item, i) => {
      gsap.from(item, {
        y: 32,
        opacity: 0,
        duration: 0.65,
        delay: i * 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: item, start: "top 85%", once: true },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="section-blue py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span
            className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-white/60"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            Why choose us
          </span>
          <h2
            className="section-heading text-white"
            style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)" }}
          >
            Everything you need. Nothing you don&apos;t.
          </h2>
        </div>

        {/* Feature grid — asymmetric 2-col zig-zag on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className="feature-item group"
              style={{ marginTop: i % 3 === 1 ? "2rem" : 0 }}
            >
              <div
                className="h-full p-6 rounded-[1.25rem] transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-white"
                  style={{
                    background: i % 2 === 0
                      ? "rgba(225,29,72,0.25)"
                      : "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  {FEATURE_ICONS[feature.icon]}
                </div>
                <h3
                  className="card-heading text-white text-lg mb-2"
                >
                  {feature.title}
                </h3>
                <p
                  className="text-blue-200/60 text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
