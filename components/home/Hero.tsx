"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

const TRUST_PILLS = [
  { label: "500+ events run" },
  { label: "4.9★ customer rating" },
  { label: "Since 2007" },
  { label: "Delivery included" },
];

export default function Hero({ onQuoteClick }: { onQuoteClick?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(eyebrowRef.current, { y: 20, opacity: 0, duration: 0.6 })
      .from(headlineRef.current, { y: 40, opacity: 0, duration: 0.75 }, "-=0.3")
      .from(subRef.current, { y: 24, opacity: 0, duration: 0.6 }, "-=0.4")
      .from(ctasRef.current, { y: 20, opacity: 0, duration: 0.55 }, "-=0.35")
      .from(pillsRef.current, { y: 16, opacity: 0, duration: 0.5 }, "-=0.3")
      .from(visualRef.current, { x: 40, opacity: 0, duration: 0.9 }, "-=0.85");
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0C1B3A 0%, #09090B 100%)" }}
    >
      {/* Background grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(37,99,235,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(225,29,72,0.12) 0%, transparent 50%)",
        }}
      />

      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div>
            {/* Eyebrow */}
            <div ref={eyebrowRef} className="mb-6">
              <span
                className="eyebrow inline-flex items-center gap-2 px-4 py-2 rounded-full text-white/70"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--crimson)" }}
                />
                Laser tag equipment hire · Delivered to you
              </span>
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="display-heading text-white mb-6"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
            >
              Laser Tag.{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, var(--crimson) 0%, #ff6b6b 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Anywhere.
              </span>
            </h1>

            {/* Sub */}
            <p
              ref={subRef}
              className="text-white/60 leading-relaxed mb-8 max-w-xl"
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.125rem" }}
            >
              We deliver premium laser tag equipment to your door — fully charged and ready to play. Birthdays, school events, corporate days and more. You set up in minutes. We pick it up the next day.
            </p>

            {/* CTAs */}
            <div ref={ctasRef} className="flex flex-wrap gap-3 mb-10">
              <Link
                href="https://fareharbor.com/embeds/book/lasertag4hire/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-orange"
              >
                Book now
                <span className="btn-icon-wrap">
                  <ArrowIcon />
                </span>
              </Link>
              <button
                onClick={onQuoteClick}
                className="btn-outline-white"
              >
                Get a free quote
              </button>
            </div>

            {/* Trust pills */}
            <div ref={pillsRef} className="flex flex-wrap gap-2">
              {TRUST_PILLS.map((pill) => (
                <span
                  key={pill.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white/60"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  <span
                    className="w-1 h-1 rounded-full bg-green-400"
                  />
                  {pill.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div ref={visualRef} className="hidden lg:block">
            <HeroVisual />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(9,9,11,0.3))" }}
      />
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative">
      {/* Outer bezel */}
      <div
        className="relative rounded-[1.75rem] p-1.5"
        style={{
          background: "rgba(255,255,255,0.06)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.1), 0 24px 64px rgba(0,0,0,0.5)",
        }}
      >
        {/* Inner panel */}
        <div
          className="rounded-[1.4rem] overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #1a2744 0%, #0f172a 100%)",
            minHeight: "380px",
          }}
        >
          {/* Placeholder image area */}
          <div
            className="relative w-full h-80 lg:h-96 flex items-center justify-center"
            style={{
              background:
                "linear-gradient(145deg, rgba(37,99,235,0.2) 0%, rgba(225,29,72,0.15) 100%)",
            }}
          >
            {/* Floating badge */}
            <div
              className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 rounded-full"
              style={{
                background: "rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(12px)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "var(--crimson)" }}
              />
              <span
                className="text-xs font-medium text-white/80"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Battle in progress
              </span>
            </div>

            {/* Tagger icon */}
            <TaggerIllustration />

            {/* Price badge */}
            <div
              className="absolute bottom-4 right-4 px-4 py-2 rounded-2xl"
              style={{
                background: "rgba(0,0,0,0.6)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                className="text-xs text-white/50 mb-0.5"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Packages from
              </div>
              <div
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}
              >
                $549
              </div>
            </div>
          </div>

          {/* Info strip */}
          <div className="px-5 py-4 flex items-center justify-between">
            <div>
              <div
                className="text-sm font-semibold text-white/90"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Predator Package
              </div>
              <div
                className="text-xs text-white/40"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                10 taggers · 24h hire · Free return courier
              </div>
            </div>
            <Link
              href="/packages"
              className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-white/15"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "white",
                fontFamily: "var(--font-dm-sans)",
              }}
            >
              View all
            </Link>
          </div>
        </div>
      </div>

      {/* Floating stat cards */}
      <div
        className="absolute -left-8 top-1/4 px-4 py-3 rounded-2xl"
        style={{
          background: "rgba(37,99,235,0.9)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 24px rgba(37,99,235,0.4)",
        }}
      >
        <div
          className="text-xl font-bold text-white"
          style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}
        >
          12hr
        </div>
        <div
          className="text-xs text-blue-200"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Battery life
        </div>
      </div>

      <div
        className="absolute -right-4 bottom-1/4 px-4 py-3 rounded-2xl"
        style={{
          background: "rgba(225,29,72,0.9)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 24px rgba(225,29,72,0.4)",
        }}
      >
        <div
          className="text-xl font-bold text-white"
          style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}
        >
          100m
        </div>
        <div
          className="text-xs text-rose-200"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Range
        </div>
      </div>
    </div>
  );
}

function TaggerIllustration() {
  return (
    <svg
      width="180"
      height="140"
      viewBox="0 0 180 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-80"
    >
      {/* Tagger body */}
      <rect x="30" y="55" width="100" height="40" rx="10" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      {/* Barrel */}
      <rect x="130" y="65" width="35" height="20" rx="5" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      {/* Scope */}
      <rect x="65" y="42" width="50" height="16" rx="5" fill="rgba(37,99,235,0.5)" stroke="rgba(37,99,235,0.8)" strokeWidth="1.5" />
      {/* Red dot */}
      <circle cx="108" cy="50" r="4" fill="var(--crimson)" />
      {/* Grip */}
      <rect x="45" y="93" width="28" height="25" rx="8" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      {/* Trigger */}
      <path d="M68 103 Q75 107 72 115" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Beam effect */}
      <line x1="165" y1="75" x2="180" y2="75" stroke="var(--crimson)" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <line x1="165" y1="75" x2="178" y2="68" stroke="var(--crimson)" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      <line x1="165" y1="75" x2="178" y2="82" stroke="var(--crimson)" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}
