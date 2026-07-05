"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export default function Hero({ onQuoteClick }: { onQuoteClick?: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(el.querySelector(".h-over"), { y: 12, opacity: 0, duration: 0.5 })
      .from(el.querySelector(".h-line1"), { y: 32, opacity: 0, duration: 0.7 }, "-=0.2")
      .from(el.querySelector(".h-sub"), { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
      .from(el.querySelectorAll(".h-bot"), { y: 18, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.3")
      .from(el.querySelector(".h-trust"), { opacity: 0, duration: 0.7 }, "-=0.2");

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={rootRef}
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
        overflow: "hidden",
        background: "#09090B",
      }}
    >
      {/* Hero background image */}
      <img
        src="/images/why-choose-us-inclusive.jpg"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 30%",
          zIndex: 0,
        }}
      />

      {/* Video background (overlays image when available) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/why-choose-us-inclusive.jpg"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay — heavier at bottom for text legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(9,9,11,0.92) 0%, rgba(9,9,11,0.5) 55%, rgba(9,9,11,0.25) 100%)",
          zIndex: 1,
        }}
      />

      {/* Content — bottom-anchored */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "clamp(48px, 6vw, 96px)",
          paddingBottom: "clamp(48px, 6vw, 80px)",
        }}
      >
        {/* Overline */}
        <div
          className="h-over"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: "clamp(18px, 2.5vw, 28px)",
          }}
        >
          <span style={{ width: 24, height: 1, background: "rgba(255,255,255,0.25)", display: "block", flexShrink: 0 }} />
          <span
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Laser Tag Equipment Hire · NSW
          </span>
        </div>

        {/* Headline */}
        <h1
          className="h-line1"
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 700,
            fontSize: "clamp(36px, 5.5vw, 80px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "white",
            margin: "0 0 clamp(14px, 1.8vw, 22px)",
            maxWidth: "16ch",
          }}
        >
          Premium laser tag,<br />delivered to your door.
        </h1>

        {/* Subtext */}
        <p
          className="h-sub"
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "clamp(14px, 1.2vw, 17px)",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.5)",
            margin: "0 0 clamp(24px, 3vw, 40px)",
            maxWidth: "46ch",
          }}
        >
          Fully charged, programmed and ready to play. Perfect for birthdays, school events, vacation care and corporate days across NSW.
        </p>

        {/* CTAs */}
        <div className="h-bot" style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <Link
            href="https://fareharbor.com/embeds/book/lasertag4hire/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-crimson"
          >
            Book now
            <span className="btn-icon-wrap" style={{ background: "rgba(255,255,255,0.15)" }}>
              <ArrowIcon />
            </span>
          </Link>
          <button onClick={onQuoteClick} className="btn-outline-white">
            Get a quote
          </button>
        </div>

        {/* Trust line */}
        <div
          className="h-trust"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(16px, 2.5vw, 32px)",
            flexWrap: "wrap",
            marginTop: "clamp(20px, 2.5vw, 36px)",
          }}
        >
          {["500+ events run", "Operating since 2007", "Delivered across NSW", "4.9★ rated"].map((item) => (
            <span
              key={item}
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 11,
                color: "rgba(255,255,255,0.22)",
                letterSpacing: "0.05em",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
