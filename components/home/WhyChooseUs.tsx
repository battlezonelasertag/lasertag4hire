"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATEMENTS = [
  {
    claim: "Delivery included.",
    detail: "We ship to your door charged, programmed and ready. You set up in under 10 minutes. A prepaid return courier handles pick-up the next day.",
    image: "/images/why-choose-us-teams.jpg",
  },
  {
    claim: "No heavy vests.",
    detail: "The sensors are built into the taggers, so there's nothing to strap on. The Bolter weighs 1.4kg, which a five-year-old can hold comfortably for a couple of hours.",
    image: "/images/why-choose-us-equipment.jpg",
  },
  {
    claim: "Live phone support.",
    detail: "Something not working on the day? Call 1300 661 565. We answer during your hire period and walk you through it.",
    image: "/images/why-choose-us-support.jpg",
  },
  {
    claim: "Saturday hire includes Sunday.",
    detail: "Hire Saturday, return Monday morning. You get the full weekend at the same price as a single day.",
    image: "/images/why-choose-us-weekend.jpg",
  },
  {
    claim: "18 years in business.",
    detail: "Over 500 events since 2007. Most of how we do things now came from working out what goes wrong at an event and making sure it can't happen again.",
    image: "/images/why-choose-us-setup.jpg",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const rows = sectionRef.current?.querySelectorAll(".wcu-row");
    if (!rows) return;
    rows.forEach((row) => {
      gsap.from(row, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: row, start: "top 88%", once: true },
      });
    });
  }, []);

  useEffect(() => {
    const rows = rowRefs.current.filter((r): r is HTMLDivElement => r !== null);
    if (!rows.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#09090B",
        padding: "clamp(72px, 10vw, 128px) clamp(24px, 6vw, 96px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle blue glow bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "40vw",
          height: "40vw",
          background: "radial-gradient(circle, rgba(0,52,102,0.18) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div
          className="wcu-row"
          style={{ marginBottom: "clamp(48px, 7vw, 80px)" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
              fontSize: "clamp(36px, 5vw, 64px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.0,
              color: "white",
              margin: 0,
            }}
          >
            Eighteen years of<br />
            <span style={{ color: "#E11D48" }}>working out the details.</span>
          </h2>
        </div>

        {/* Sticky image rail + statement list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4 items-start">
          {/* Sticky crossfading image — desktop only */}
          <div className="hidden lg:block order-2 lg:order-1" style={{ position: "sticky", top: "calc(var(--nav-h, 72px) + 28px)" }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4 / 5",
                borderRadius: 28,
                overflow: "hidden",
                background: "#111114",
              }}
            >
              {STATEMENTS.map((s, i) => (
                <img
                  key={s.image}
                  src={s.image}
                  alt=""
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    opacity: active === i ? 1 : 0,
                    transform: active === i ? "scale(1)" : "scale(1.06)",
                    transition: "opacity 0.9s ease, transform 1.4s ease",
                  }}
                />
              ))}

              {/* Bottom gradient for caption legibility */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 42%)",
                  pointerEvents: "none",
                }}
              />

              {/* Caption overlay */}
              <div style={{ position: "absolute", left: 28, right: 28, bottom: 28 }}>
                <div
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    color: "rgba(255,255,255,0.55)",
                    marginBottom: 8,
                  }}
                >
                  {String(active + 1).padStart(2, "0")} / {String(STATEMENTS.length).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 700,
                    fontSize: "clamp(20px, 1.8vw, 26px)",
                    letterSpacing: "-0.015em",
                    color: "white",
                  }}
                >
                  {STATEMENTS[active].claim}
                </div>
              </div>
            </div>
          </div>

          {/* Statement list */}
          <div className="order-1 lg:order-2">
            {STATEMENTS.map((s, i) => (
              <div
                key={s.claim}
                ref={(el) => { rowRefs.current[i] = el; }}
                data-index={i}
                className="wcu-row"
                onClick={() => setActive(i)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "44px 1fr",
                  gap: "clamp(16px, 2vw, 24px)",
                  alignItems: "start",
                  padding: "clamp(24px, 3vw, 32px) 0",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  cursor: "pointer",
                  ...(i === STATEMENTS.length - 1 ? { borderBottom: "1px solid rgba(255,255,255,0.06)" } : {}),
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 700,
                    fontSize: 20,
                    letterSpacing: "0.02em",
                    color: active === i ? "#E11D48" : "rgba(255,255,255,0.5)",
                    transition: "color 0.4s ease",
                    paddingTop: 4,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontWeight: 700,
                      fontSize: "clamp(19px, 2.2vw, 25px)",
                      letterSpacing: "-0.015em",
                      lineHeight: 1.2,
                      color: active === i ? "white" : "rgba(255,255,255,0.6)",
                      margin: "0 0 8px",
                      transition: "color 0.4s ease",
                    }}
                  >
                    {s.claim}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "clamp(14px, 1.2vw, 16px)",
                      lineHeight: 1.7,
                      color: "rgba(255,255,255,0.65)",
                      margin: 0,
                      maxWidth: 440,
                    }}
                  >
                    {s.detail}
                  </p>

                  {/* Inline image — mobile only, since the sticky rail is desktop-only */}
                  <div
                    className="lg:hidden"
                    style={{
                      marginTop: 20,
                      borderRadius: 18,
                      overflow: "hidden",
                      aspectRatio: "16 / 10",
                    }}
                  >
                    <img
                      src={s.image}
                      alt=""
                      aria-hidden="true"
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
