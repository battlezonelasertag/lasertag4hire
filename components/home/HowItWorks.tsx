"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HOW_IT_WORKS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const STEP_ICONS = [
  // Choose
  <svg key="choose" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12l2 2 4-4" />
    <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
  </svg>,
  // Ship
  <svg key="ship" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </svg>,
  // Play
  <svg key="play" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>,
  // Return
  <svg key="return" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
  </svg>,
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const steps = stepsRef.current?.querySelectorAll(".step-card");
    if (!steps) return;

    steps.forEach((step, i) => {
      gsap.from(step, {
        y: 40,
        opacity: 0,
        duration: 0.65,
        delay: i * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: step,
          start: "top 85%",
          once: true,
        },
      });
    });
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="section-cream py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 max-w-xl">
          <span
            className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-[var(--blue)]"
            style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.15)" }}
          >
            How it works
          </span>
          <h2
            className="section-heading text-[var(--ink)]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            From your couch to the battlefield
          </h2>
          <p
            className="text-[var(--muted)] leading-relaxed mt-4"
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.0625rem" }}
          >
            We do the heavy lifting. You run the battle.
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="relative">
          {/* Connecting line — desktop only */}
          <div
            className="hidden lg:block absolute top-10 left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--blue) 20%, var(--blue) 80%, transparent)",
              opacity: 0.2,
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {HOW_IT_WORKS.map((step, i) => (
              <div
                key={step.number}
                className="step-card flex flex-col"
              >
                {/* Number + icon */}
                <div className="relative mb-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 relative z-10"
                    style={{
                      background: i % 2 === 0 ? "var(--blue)" : "var(--crimson)",
                      boxShadow: i % 2 === 0
                        ? "0 8px 24px rgba(37,99,235,0.3)"
                        : "0 8px 24px rgba(225,29,72,0.3)",
                    }}
                  >
                    <span className="text-white">{STEP_ICONS[i]}</span>
                  </div>
                  <span
                    className="absolute -top-2 -left-2 text-6xl font-bold select-none"
                    style={{
                      fontFamily: "var(--font-syne)",
                      color: "rgba(0,0,0,0.04)",
                      lineHeight: 1,
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                <h3
                  className="card-heading text-[var(--ink)] mb-2 text-lg"
                >
                  {step.title}
                </h3>
                <p
                  className="text-[var(--muted)] leading-relaxed text-sm"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
