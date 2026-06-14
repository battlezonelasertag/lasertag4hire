"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PACKAGES } from "@/lib/data";
import type { Package } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

export default function PackageTeaser() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".pkg-card");
    if (!cards) return;
    cards.forEach((card, i) => {
      gsap.from(card, {
        y: 36,
        opacity: 0,
        duration: 0.7,
        delay: i * 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });
    });
  }, []);

  const featured = PACKAGES.find((p) => p.featured);
  const rest = PACKAGES.filter((p) => !p.featured);

  return (
    <section ref={sectionRef} className="section-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span
              className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-[var(--crimson)]"
              style={{ background: "rgba(225,29,72,0.08)", border: "1px solid rgba(225,29,72,0.15)" }}
            >
              Packages
            </span>
            <h2
              className="section-heading text-[var(--ink)]"
              style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)" }}
            >
              Three setups. One mission.
            </h2>
          </div>
          <Link
            href="/packages"
            className="btn-outline inline-flex self-start sm:self-auto text-sm"
          >
            Build your setup
            <span className="btn-icon-wrap" style={{ background: "rgba(37,99,235,0.1)" }}>
              <ArrowIcon />
            </span>
          </Link>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-4">
          {/* Featured — Predator */}
          {featured && <FeaturedCard pkg={featured} />}

          {/* Stacked smaller cards */}
          <div className="flex flex-col gap-4">
            {rest.map((pkg) => (
              <CompactCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <p
            className="text-[var(--muted)] text-sm mb-4"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Need more than 10 players? Add taggers in groups of 4.
          </p>
          <Link href="/packages" className="btn-blue inline-flex">
            Customise your package
            <span className="btn-icon-wrap btn-icon-wrap-white">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ pkg }: { pkg: Package }) {
  return (
    <div
      className="pkg-card card-bezel-outer"
    >
      <div
        className="card-bezel-inner relative overflow-hidden"
        style={{ minHeight: "440px" }}
      >
        {/* Gradient bg */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(145deg, #0C1B3A 0%, #09090B 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 75% 30%, rgba(225,29,72,0.25) 0%, transparent 55%), radial-gradient(circle at 20% 70%, rgba(37,99,235,0.2) 0%, transparent 50%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-8 h-full flex flex-col justify-between" style={{ minHeight: "440px" }}>
          <div>
            {pkg.badge && (
              <span
                className="eyebrow inline-block px-3 py-1.5 rounded-full mb-6 text-white/80"
                style={{ background: "rgba(225,29,72,0.25)", border: "1px solid rgba(225,29,72,0.4)" }}
              >
                {pkg.badge}
              </span>
            )}
            <h3
              className="display-heading text-white mb-1"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              {pkg.name}
            </h3>
            <p
              className="text-white/50 text-lg mb-6"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {pkg.tagline}
            </p>

            {/* Specs grid */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { label: "Weight", value: pkg.weight },
                { label: "Range", value: pkg.range },
                { label: "Ages", value: pkg.ageRange },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="px-3 py-2 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <div
                    className="text-xs text-white/40 mb-0.5"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {spec.label}
                  </div>
                  <div
                    className="text-sm font-semibold text-white"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Features list */}
            <ul className="flex flex-col gap-2">
              {pkg.features.slice(0, 5).map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-sm text-white/60"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(225,29,72,0.3)" }}
                  >
                    <CheckIcon />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between mt-8">
            <div>
              <div className="text-white/40 text-xs mb-1" style={{ fontFamily: "var(--font-dm-sans)" }}>
                From
              </div>
              <div
                className="text-4xl font-bold text-white"
                style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}
              >
                ${pkg.price}
              </div>
            </div>
            <Link
              href="/packages"
              className="btn-orange"
            >
              Book this
              <span className="btn-icon-wrap">
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompactCard({ pkg }: { pkg: Package }) {
  return (
    <div className="pkg-card card-bezel-outer flex-1">
      <div className="card-bezel-inner p-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex-1">
          {pkg.badge && (
            <span
              className="eyebrow inline-block px-2.5 py-1 rounded-full mb-3 text-[var(--blue)]"
              style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.15)" }}
            >
              {pkg.badge}
            </span>
          )}
          <h3
            className="card-heading text-[var(--ink)] text-xl mb-0.5"
          >
            {pkg.name}
          </h3>
          <p
            className="text-[var(--muted)] text-sm mb-4"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {pkg.tagline}
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            {[
              { label: pkg.weight },
              { label: pkg.range },
              { label: pkg.ageRange },
            ].map((spec) => (
              <span
                key={spec.label}
                className="text-xs px-2.5 py-1 rounded-full text-[var(--muted)]"
                style={{ background: "var(--sky)", fontFamily: "var(--font-dm-sans)" }}
              >
                {spec.label}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-row sm:flex-col items-end justify-between sm:justify-between gap-4 sm:gap-2 sm:min-w-[100px]">
          <div className="text-right">
            <div
              className="text-xs text-[var(--muted)] mb-0.5"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              From
            </div>
            <div
              className="text-2xl font-bold text-[var(--ink)]"
              style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}
            >
              ${pkg.price}
            </div>
          </div>
          <Link
            href="/packages"
            className="btn-outline text-sm px-4 py-2 whitespace-nowrap"
          >
            Select
          </Link>
        </div>
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
