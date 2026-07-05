"use client";

import { useEffect, useRef } from "react";
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
    detail: "Our taggers are lightweight and ergonomic — the Bolter weighs 1.4kg. Ages 5 and up can play comfortably. No strapping in, no bulk.",
    image: "/images/why-choose-us-equipment.jpg",
  },
  {
    claim: "Live phone support.",
    detail: "Something not working on the day? Call 1300 661 565. We answer during your hire period and walk you through it.",
    image: "/images/why-choose-us-support.jpg",
  },
  {
    claim: "Saturday hire includes Sunday.",
    detail: "Hire Saturday, return Monday morning. You get the full weekend — not just the day. Same price.",
    image: "/images/why-choose-us-weekend.jpg",
  },
  {
    claim: "18 years in business.",
    detail: "Over 500 events since 2007. We know what works. Our gear has run thousands of battles and our process is airtight.",
    image: "/images/why-choose-us-setup.jpg",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(32px, 5vw, 80px)",
            marginBottom: "clamp(48px, 7vw, 80px)",
            alignItems: "end",
          }}
        >
          <div>
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
              Why 500+ groups<br />
              <span style={{ color: "#E11D48" }}>have chosen us.</span>
            </h2>
          </div>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "clamp(15px, 1.3vw, 17px)",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.38)",
              margin: 0,
              alignSelf: "end",
            }}
          >
            We&apos;re not a platform. We&apos;re people who care about your event going perfectly.
          </p>
        </div>

        {/* Statement list */}
        <div>
          {STATEMENTS.map((s, i) => (
            <div
              key={s.claim}
              className="wcu-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.4fr 96px",
                gap: "clamp(24px, 4vw, 64px)",
                alignItems: "start",
                padding: "clamp(24px, 3vw, 36px) 0",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                ...(i === STATEMENTS.length - 1 ? { borderBottom: "1px solid rgba(255,255,255,0.06)" } : {}),
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-syne)",
                  fontWeight: 700,
                  fontSize: "clamp(17px, 2vw, 22px)",
                  letterSpacing: "-0.015em",
                  lineHeight: 1.2,
                  color: "white",
                  margin: 0,
                }}
              >
                {s.claim}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "clamp(14px, 1.2vw, 16px)",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.38)",
                  margin: 0,
                }}
              >
                {s.detail}
              </p>
              <img
                src={s.image}
                alt=""
                aria-hidden="true"
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 12,
                  objectFit: "cover",
                  objectPosition: "center",
                  opacity: 0.75,
                  flexShrink: 0,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
