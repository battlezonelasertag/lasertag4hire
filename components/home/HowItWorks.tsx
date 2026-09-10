"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: "01",
    title: "Choose your setup",
    desc: "Pick a package, set your player count and add any extras. Book online or send a quote request, and we'll confirm within 24 hours.",
    icon: SlidersIcon,
  },
  {
    number: "02",
    title: "We ship it to you",
    desc: "Everything arrives fully charged two business days before your event. Someone will need to be there to sign for it.",
    icon: TruckIcon,
  },
  {
    number: "03",
    title: "You run the day",
    desc: "Setup takes about ten minutes and the game modes are already configured. We're on the phone through your whole hire period if something comes up.",
    icon: TargetIcon,
  },
  {
    number: "04",
    title: "We collect it",
    desc: "Pack it back in the box. We've already arranged the return courier, and they collect it the next business day.",
    icon: PackageIcon,
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (headRef.current) {
      gsap.from(headRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 85%", once: true },
      });
    }

    gsap.from(el.querySelectorAll(".step-card"), {
      y: 28,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: { trigger: el.querySelector(".step-grid"), start: "top 80%", once: true },
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
        <div ref={headRef} style={{ marginBottom: "clamp(48px, 6vw, 72px)", maxWidth: 640 }}>
          <p style={{
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--blue)",
            margin: "0 0 14px",
          }}>
            How it works
          </p>
          <h2 style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 700,
            fontSize: "clamp(32px, 4.5vw, 60px)",
            letterSpacing: "-0.025em",
            lineHeight: 1.0,
            color: "var(--ink)",
            margin: "0 0 18px",
          }}>
            Four steps, and<br />we do two of them.
          </h2>
          <p style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "clamp(15px, 1.2vw, 17px)",
            lineHeight: 1.6,
            color: "var(--muted)",
            margin: 0,
          }}>
            Four steps, from booking to collection. You won&apos;t need a venue, and you won&apos;t need anyone on site to run it for you.
          </p>
        </div>

        {/* Steps */}
        <div className="step-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((step, i) => (
            <div key={step.number} style={{ position: "relative" }}>
              <div
                className="step-card"
                style={{
                  height: "100%",
                  background: "white",
                  borderRadius: "1.25rem",
                  border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "0 4px 20px rgba(9,9,11,0.05)",
                  padding: "clamp(24px,2.4vw,30px)",
                  transition: "transform 280ms var(--ease-out-strong), box-shadow 280ms var(--ease-out-strong), border-color 280ms var(--ease-out-strong)",
                }}
              >
                {/* Icon tile with step-number badge */}
                <div style={{ position: "relative", width: 52, height: 52, marginBottom: 24 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: "1rem",
                    background: "var(--blue)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <step.icon />
                  </div>
                  <div style={{
                    position: "absolute", top: -8, right: -8,
                    width: 24, height: 24, borderRadius: "50%",
                    background: "var(--ink)", color: "white",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: 11,
                    border: "2px solid var(--cream)",
                  }}>
                    {i + 1}
                  </div>
                </div>

                <p style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  margin: "0 0 8px",
                }}>
                  Step {step.number}
                </p>
                <h3 style={{
                  fontFamily: "var(--font-syne)",
                  fontWeight: 700,
                  fontSize: "clamp(17px, 1.6vw, 20px)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  color: "var(--ink)",
                  margin: "0 0 10px",
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "clamp(14px, 1.1vw, 15.5px)",
                  lineHeight: 1.65,
                  color: "var(--muted)",
                  margin: 0,
                }}>
                  {step.desc}
                </p>
              </div>

              {/* Connector arrow between cards (desktop only) */}
              {i < STEPS.length - 1 && (
                <div
                  className="hidden lg:flex"
                  style={{
                    position: "absolute", top: "50%", right: -20,
                    transform: "translateY(-50%)", zIndex: 2,
                    width: 40, height: 40, borderRadius: "50%",
                    background: "var(--cream)",
                    alignItems: "center", justifyContent: "center",
                  }}
                  aria-hidden="true"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .step-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(26,95,180,0.14);
          border-color: rgba(26,95,180,0.2);
        }
      `}</style>
    </section>
  );
}

function SlidersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" />
      <path d="M3.5 8.5L12 13l8.5-4.5" />
      <path d="M12 22V13" />
    </svg>
  );
}
