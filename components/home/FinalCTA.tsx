"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA({ onQuoteClick }: { onQuoteClick?: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 80%", once: true },
      defaults: { ease: "power3.out" },
    });
    tl.from(el.querySelector(".cta-line1"), { y: 32, opacity: 0, duration: 0.7 })
      .from(el.querySelector(".cta-rule"), { scaleX: 0, duration: 0.75, transformOrigin: "left", ease: "power2.out" }, "-=0.3")
      .from(el.querySelectorAll(".cta-bot"), { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4");

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#dc3129",
        overflow: "hidden",
        position: "relative",
        paddingBottom: "clamp(48px, 6vw, 80px)",
      }}
    >
      {/* Dot texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Headline */}
        <div className="cta-line1" style={{ padding: "clamp(48px, 7vw, 80px) clamp(24px, 6vw, 96px) 0" }}>
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
              fontSize: "clamp(36px, 5.5vw, 80px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "white",
              margin: 0,
              maxWidth: "18ch",
            }}
          >
            Ready to bring the battle to your backyard?
          </h2>
        </div>

        {/* Rule */}
        <div
          className="cta-rule"
          style={{
            height: 1,
            background: "rgba(255,255,255,0.2)",
            margin: "clamp(28px, 4vw, 52px) clamp(24px, 6vw, 96px)",
          }}
        />

        {/* Bottom row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "clamp(20px, 4vw, 64px)",
            padding: "0 clamp(24px, 6vw, 96px)",
            alignItems: "center",
          }}
        >
          <p
            className="cta-bot"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "clamp(15px, 1.35vw, 18px)",
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.55)",
              margin: 0,
              maxWidth: "48ch",
            }}
          >
            Equipment arrives ready to play. You run the game. We handle the rest. No deposit required to enquire.
          </p>

          <div className="cta-bot" style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Link
              href="https://fareharbor.com/embeds/book/lasertag4hire/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "white",
                color: "#dc3129",
                borderRadius: 100,
                padding: "14px 28px",
                fontFamily: "var(--font-dm-sans)",
                fontSize: 15,
                fontWeight: 700,
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "transform 160ms",
              }}
            >
              Book now — from $549
            </Link>
            <button
              onClick={onQuoteClick}
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "transparent",
                color: "white",
                border: "1.5px solid rgba(255,255,255,0.4)",
                borderRadius: 100,
                padding: "13px 28px",
                fontFamily: "var(--font-dm-sans)",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "border-color 200ms, transform 160ms",
              }}
            >
              Get a free quote
            </button>
          </div>
        </div>

        {/* Trust */}
        <p
          className="cta-bot"
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 11,
            color: "rgba(255,255,255,0.3)",
            margin: "clamp(28px, 3vw, 44px) clamp(24px, 6vw, 96px) 0",
            letterSpacing: "0.04em",
          }}
        >
          No deposit required · Reply within 24 hours · 4.9★ rated
        </p>
      </div>
    </section>
  );
}
