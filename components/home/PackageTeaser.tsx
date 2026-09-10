"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PACKAGES } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const PACKAGE_IMAGES: Record<string, string> = {
  "bolter-no-scope": "/images/packages_bolter_no_scope.jpg",
  "bolter-scope":    "/images/packages_bolter_scopes.jpg",
  "predator":        "/images/packages_predator.jpg",
};

export default function PackageTeaser() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".pkg-card");
    if (!cards) return;
    cards.forEach((card, i) => {
      gsap.from(card, {
        y: 48,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--cream)",
        padding: "clamp(72px, 10vw, 128px) clamp(24px, 6vw, 96px)",
        position: "relative",
        overflow: "hidden",
      }}
    >

<div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
            marginBottom: "clamp(40px, 6vw, 64px)",
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
                color: "var(--ink)",
                margin: 0,
              }}
            >
              Same kit,<br />
              <span style={{ color: "#E11D48" }}>three different taggers.</span>
            </h2>
          </div>
          <Link
            href="/packages"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 15,
              fontWeight: 600,
              color: "var(--blue)",
              textDecoration: "none",
              letterSpacing: "-0.01em",
              display: "flex",
              alignItems: "center",
              gap: 6,
              flexShrink: 0,
            }}
          >
            See all options
            <span style={{ fontSize: 18, lineHeight: 1 }}>→</span>
          </Link>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(10px, 1.5vw, 16px)",
          }}
        >
          {PACKAGES.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "clamp(24px, 3vw, 36px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            paddingTop: "clamp(24px, 3vw, 36px)",
            borderTop: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 14,
              color: "var(--muted)",
              margin: 0,
            }}
          >
            More than 10 players? Taggers are added in pairs, so tell us your numbers and we&apos;ll price it.
          </p>
          <Link href="/packages" className="btn-blue">
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

function PackageCard({ pkg }: { pkg: typeof PACKAGES[0] }) {
  const featured = pkg.featured;

  return (
    <Link
      href="/packages"
      className="pkg-card group"
      style={{
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        borderRadius: "1.25rem",
        overflow: "hidden",
        cursor: "pointer",
        background: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)",
      }}
    >
      {/* ── Photo section — intrinsic ratio via paddingTop ── */}
      <div style={{ position: "relative", paddingTop: "68%", overflow: "hidden", flexShrink: 0 }}>
        <img
          src={PACKAGE_IMAGES[pkg.id]}
          alt={pkg.name}
          className="group-hover:scale-105"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 15%",
            transition: "transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        />
      </div>

      {/* ── Info panel ── */}
      <div style={{
        background: "white",
        borderTop: "1px solid rgba(0,0,0,0.07)",
        padding: "clamp(14px,1.8vw,20px)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}>

        {/* Name + tagline */}
        <div>
          <h3 style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 700,
            fontSize: "clamp(18px,2vw,24px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--ink)",
            margin: "0 0 3px",
          }}>
            {pkg.name}
          </h3>
          <p style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 13,
            color: "var(--muted)",
            margin: 0,
            letterSpacing: "0.01em",
          }}>
            {pkg.tagline} · {pkg.ageRange}
          </p>
        </div>

        {/* Best for */}
        <div>
          <p style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 12, fontWeight: 700,
            letterSpacing: "0.15em", textTransform: "uppercase",
            color: "var(--muted)",
            margin: "0 0 7px",
          }}>
            Best for
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {pkg.bestFor.map((label) => (
              <span key={label} style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 12, fontWeight: 500,
                color: "var(--ink)",
                background: "rgba(0,0,0,0.05)",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: 100, padding: "3px 10px",
                whiteSpace: "nowrap",
              }}>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Price + CTA */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 10,
          borderTop: "1px solid rgba(0,0,0,0.06)",
          paddingTop: 12,
        }}>
          <div>
            <span style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
              color: "var(--muted)", display: "block", marginBottom: 1,
            }}>
              From
            </span>
            <span style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
              fontSize: "clamp(22px,2.4vw,30px)",
              letterSpacing: "-0.03em",
              color: "var(--ink)", lineHeight: 1,
            }}>
              ${pkg.price}
            </span>
          </div>

          <span style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 13, fontWeight: 700,
            color: featured ? "var(--crimson)" : "var(--blue)",
            border: `1.5px solid ${featured ? "rgba(220,49,41,0.35)" : "rgba(26,95,180,0.35)"}`,
            borderRadius: 100, padding: "8px 18px",
            background: featured ? "rgba(220,49,41,0.06)" : "rgba(26,95,180,0.06)",
            letterSpacing: "0.01em",
            display: "flex", alignItems: "center", gap: 6,
            flexShrink: 0,
          }}>
            Select <ArrowIcon />
          </span>
        </div>
      </div>
    </Link>
  );
}

function ArrowIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
