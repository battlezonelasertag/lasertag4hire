"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: "01",
    title: "Choose your setup",
    desc: "Pick a package, set your player count and add any extras. Book online or send a quote request — we confirm within 24 hours.",
  },
  {
    number: "02",
    title: "We ship it to you",
    desc: "Gear arrives fully charged 2 days before your event. Someone just needs to be home to sign for it.",
  },
  {
    number: "03",
    title: "You run the battle",
    desc: "Game modes are pre-configured. Setup takes under 10 minutes. We're on the phone the whole time if you need us.",
  },
  {
    number: "04",
    title: "We collect it",
    desc: "Pack it back in the case. We've already arranged the return courier — they collect next business day.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const line = lineRef.current;
    if (!el || !line) return;

    const trigger = { trigger: el, start: "top 72%", once: true };

    gsap.from(line, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: trigger,
    });

    gsap.from(el.querySelectorAll(".step-node"), {
      scale: 0,
      opacity: 0,
      duration: 0.45,
      ease: "back.out(1.7)",
      stagger: 0.13,
      delay: 0.25,
      scrollTrigger: trigger,
    });

    gsap.from(el.querySelectorAll(".step-body"), {
      y: 22,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.1,
      delay: 0.45,
      scrollTrigger: trigger,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--cream)",
        padding: "clamp(72px, 10vw, 128px) clamp(24px, 6vw, 96px)",
      }}
    >


      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Section header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(32px, 5vw, 80px)",
            marginBottom: "clamp(64px, 9vw, 112px)",
            alignItems: "end",
          }}
        >
          <div>
            <h2 style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
              fontSize: "clamp(32px, 4.5vw, 60px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.0,
              color: "var(--ink)",
              margin: 0,
            }}>
              From your couch<br />to the battlefield.
            </h2>
          </div>
          <p style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "clamp(14px, 1.2vw, 16px)",
            lineHeight: 1.75,
            color: "var(--muted)",
            margin: 0,
            alignSelf: "end",
          }}>
            We do the heavy lifting so you can focus on the fun. Equipment arrives charged and ready — you set it up in under 10 minutes.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>

          {/* Connecting track — draws in left-to-right on scroll */}
          <div
            ref={lineRef}
            style={{
              position: "absolute",
              top: 27,
              left: 28,
              right: 28,
              height: 1,
              background: "var(--blue)",
              opacity: 0.18,
              zIndex: 0,
            }}
          />

          {/* Steps */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
          }}>
            {STEPS.map((step, i) => (
              <div key={step.number} style={{ position: "relative" }}>

                {/* Faint ghost number behind circle */}
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: -16,
                    left: -6,
                    fontFamily: "var(--font-syne)",
                    fontWeight: 800,
                    fontSize: 88,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    color: "var(--blue)",
                    opacity: 0.04,
                    userSelect: "none",
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                >
                  {step.number}
                </span>

                {/* Numbered circle */}
                <div
                  className="step-node"
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "var(--blue)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 32,
                    fontFamily: "var(--font-syne)",
                    fontWeight: 700,
                    fontSize: 14,
                    letterSpacing: "0.04em",
                    position: "relative",
                    zIndex: 1,
                    flexShrink: 0,
                  }}
                >
                  {step.number}
                </div>

                {/* Step text */}
                <div
                  className="step-body"
                  style={{
                    paddingRight: i < STEPS.length - 1 ? "clamp(16px, 3vw, 48px)" : 0,
                  }}
                >
                  <p style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    margin: "0 0 10px",
                  }}>
                    Step {step.number}
                  </p>
                  <h3 style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 700,
                    fontSize: "clamp(16px, 1.6vw, 22px)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                    color: "var(--ink)",
                    margin: "0 0 12px",
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "clamp(13px, 1.1vw, 15px)",
                    lineHeight: 1.7,
                    color: "var(--muted)",
                    margin: 0,
                  }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
