"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EnquiryModal from "@/components/ui/EnquiryModal";
import { PACKAGES } from "@/lib/data";

function MediaPlaceholder({ label, type, aspect }: { label: string; type: "photo" | "gif"; aspect: string }) {
  return (
    <div style={{
      aspectRatio: aspect,
      borderRadius: "1.25rem",
      border: "1.5px dashed rgba(0,0,0,0.1)",
      background: "rgba(0,0,0,0.03)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 14,
      padding: "clamp(24px,3vw,40px)",
    }}>
      {type === "gif" ? (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="2" y="6" width="28" height="20" rx="3" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
          <circle cx="11" cy="16" r="4" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
          <path d="M19 14h4M19 16h3M19 18h4" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="2" y="5" width="28" height="22" rx="3" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
          <circle cx="16" cy="16" r="5" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
          <circle cx="24" cy="9" r="1.5" fill="rgba(0,0,0,0.2)" />
        </svg>
      )}
      <span style={{
        fontFamily: "var(--font-dm-sans)",
        fontSize: 11,
        fontWeight: 500,
        color: "rgba(0,0,0,0.35)",
        textAlign: "center",
        lineHeight: 1.6,
        maxWidth: "32ch",
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: "var(--font-dm-sans)",
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "rgba(0,0,0,0.25)",
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: 100,
        padding: "3px 10px",
      }}>
        {type === "gif" ? "GIF placeholder" : "Photo placeholder"}
      </span>
    </div>
  );
}

const PACKAGE_IMAGES: Record<string, string> = {
  "bolter-no-scope": "/images/packages_bolter_no_scope.jpg",
  "bolter-scope":    "/images/packages_bolter_scopes.jpg",
  "predator":        "/images/packages_predator.jpg",
};

export default function PackagesPage() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
      <Navbar onQuoteClick={() => setQuoteOpen(true)} />
      <main className="min-h-[100dvh]" style={{ background: "var(--cream)" }}>

        {/* Hero */}
        <div className="pt-36 pb-16 px-6 relative overflow-hidden" style={{ background: "#09090B" }}>
          <img
            src="/images/page_header_packages.jpg"
            alt=""
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.35, zIndex: 0 }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(9,9,11,0.85) 40%, rgba(9,9,11,0.4) 100%)", zIndex: 1 }} />
          <div className="max-w-7xl mx-auto" style={{ position: "relative", zIndex: 2 }}>
            <h1
              className="display-heading text-white mb-4"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Choose your package
            </h1>
            <p
              className="text-white/50 max-w-xl leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.0625rem" }}
            >
              Three tagger options, each suited to a different crowd. Compare below and click through for the full breakdown.
            </p>
          </div>
        </div>

        {/* Package cards */}
        <div style={{ padding: "clamp(48px,7vw,96px) clamp(24px,6vw,96px)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(12px,2vw,20px)" }}>
              {PACKAGES.map((pkg) => (
                <Link
                  key={pkg.id}
                  href={`/packages/${pkg.id}`}
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "1.25rem",
                    overflow: "hidden",
                    background: "white",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)",
                    transition: "transform 240ms cubic-bezier(0.23,1,0.32,1), box-shadow 240ms",
                  }}
                  className="group"
                >
                  {/* Photo */}
                  <div style={{ position: "relative", paddingTop: "62%", overflow: "hidden", flexShrink: 0 }}>
                    <img
                      src={PACKAGE_IMAGES[pkg.id]}
                      alt={pkg.name}
                      className="group-hover:scale-105"
                      style={{
                        position: "absolute", inset: 0,
                        width: "100%", height: "100%",
                        objectFit: "cover", objectPosition: "center 15%",
                        transition: "transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)",
                      }}
                    />
                  </div>

                  {/* Info panel */}
                  <div style={{ padding: "clamp(16px,2vw,22px)", display: "flex", flexDirection: "column", gap: 12 }}>
                    <div>
                      <h2 style={{
                        fontFamily: "var(--font-syne)", fontWeight: 700,
                        fontSize: "clamp(20px,2.2vw,26px)", letterSpacing: "-0.02em", lineHeight: 1.1,
                        color: "var(--ink)", margin: "0 0 3px",
                      }}>
                        {pkg.name}
                      </h2>
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--muted)", margin: 0 }}>
                        {pkg.tagline} · {pkg.ageRange}
                      </p>
                    </div>

                    {/* Specs row */}
                    <div style={{ display: "flex", gap: 16 }}>
                      {[
                        { label: "Range", value: pkg.range },
                        { label: "Weight", value: pkg.weight },
                        { label: "Players", value: `${pkg.taggers}+` },
                      ].map(s => (
                        <div key={s.label}>
                          <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,0,0,0.28)", marginBottom: 2 }}>{s.label}</div>
                          <div style={{ fontFamily: "var(--font-syne)", fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{s.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Best for */}
                    <div>
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(0,0,0,0.3)", margin: "0 0 6px" }}>Best for</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                        {pkg.bestFor.map(label => (
                          <span key={label} style={{
                            fontFamily: "var(--font-dm-sans)", fontSize: 11, fontWeight: 500,
                            color: "var(--ink)", background: "rgba(0,0,0,0.05)",
                            border: "1px solid rgba(0,0,0,0.08)", borderRadius: 100,
                            padding: "3px 10px", whiteSpace: "nowrap",
                          }}>
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price + CTA */}
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
                      borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 12,
                    }}>
                      <div>
                        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.3)", display: "block", marginBottom: 1 }}>From</span>
                        <span style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "clamp(22px,2.4vw,28px)", letterSpacing: "-0.03em", color: "var(--ink)", lineHeight: 1 }}>
                          ${pkg.price}
                        </span>
                      </div>
                      <span style={{
                        fontFamily: "var(--font-dm-sans)", fontSize: 13, fontWeight: 700,
                        color: pkg.featured ? "var(--crimson)" : "var(--blue)",
                        border: `1.5px solid ${pkg.featured ? "rgba(220,49,41,0.35)" : "rgba(26,95,180,0.35)"}`,
                        borderRadius: 100, padding: "9px 18px",
                        background: pkg.featured ? "rgba(220,49,41,0.06)" : "rgba(26,95,180,0.06)",
                        display: "flex", alignItems: "center", gap: 6, flexShrink: 0,
                        transition: "background 200ms",
                      }}>
                        View package
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Every package includes */}
        <section style={{ background: "white", padding: "clamp(72px,9vw,112px) clamp(24px,6vw,96px)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>

            {/* Header */}
            <div style={{ marginBottom: "clamp(40px,5vw,60px)" }}>
              <span style={{
                display: "inline-flex", alignItems: "center",
                fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--blue)", background: "rgba(26,95,180,0.08)",
                border: "1px solid rgba(26,95,180,0.14)",
                borderRadius: 100, padding: "5px 14px", marginBottom: 18,
              }}>
                Every hire
              </span>
              <h2 style={{
                fontFamily: "var(--font-syne)", fontWeight: 700,
                fontSize: "clamp(32px,4.5vw,58px)", letterSpacing: "-0.025em",
                lineHeight: 1.05, color: "var(--ink)", margin: 0,
              }}>
                We&apos;ve covered<br />
                <span style={{ color: "rgba(9,9,11,0.22)" }}>everything.</span>
              </h2>
            </div>

            {/* Bento grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 0.9fr",
              gap: "clamp(10px,1.2vw,14px)",
            }}>

              {/* Left — Free delivery (large blue hero card) */}
              <div style={{
                background: "var(--blue)",
                borderRadius: "1.75rem",
                padding: "clamp(32px,3.5vw,48px)",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
                minHeight: "clamp(340px,42vw,500px)",
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                  pointerEvents: "none",
                }} />

                {/* Icon */}
                <div style={{
                  width: 52, height: 52, borderRadius: "1rem",
                  background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative",
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" rx="1.5" />
                    <path d="M16 8h4l3 3v5h-7V8z" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>

                <div style={{ position: "relative", marginTop: "auto", paddingTop: "clamp(28px,3.5vw,48px)" }}>
                  <p style={{
                    fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700,
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.65)", margin: "0 0 14px",
                  }}>
                    Free delivery
                  </p>
                  <h3 style={{
                    fontFamily: "var(--font-syne)", fontWeight: 700,
                    fontSize: "clamp(22px,2.8vw,36px)", letterSpacing: "-0.025em",
                    lineHeight: 1.1, color: "white", margin: "0 0 16px",
                  }}>
                    Arrives 2 days early.<br />Charged. Ready.
                  </h3>
                  <p style={{
                    fontFamily: "var(--font-dm-sans)", fontSize: "clamp(13px,1.1vw,15px)",
                    lineHeight: 1.7, color: "rgba(255,255,255,0.72)", margin: "0 0 28px",
                  }}>
                    Your kit ships ahead of your event, pre-configured for the game modes you&apos;ve selected. It arrives in a hard carry case, fully charged — unbox and play. No setup, no surprises.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      "Delivered 2 business days before your event",
                      "Pre-charged and configured on arrival",
                      "Hard carry case included",
                    ].map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.5)", flexShrink: 0 }} />
                        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "rgba(255,255,255,0.72)" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px,1.2vw,14px)" }}>

                {/* Prepaid return */}
                <div style={{
                  background: "var(--cream)",
                  borderRadius: "1.75rem",
                  padding: "clamp(24px,2.8vw,36px)",
                  border: "1px solid rgba(0,0,0,0.06)",
                  flex: 1,
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "0.875rem",
                    background: "rgba(26,95,180,0.09)", border: "1px solid rgba(26,95,180,0.13)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 18,
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="1 4 1 10 7 10" />
                      <path d="M3.51 15a9 9 0 1 0 .49-3.5" />
                    </svg>
                  </div>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--blue)", margin: "0 0 8px" }}>
                    Prepaid return
                  </p>
                  <h3 style={{
                    fontFamily: "var(--font-syne)", fontWeight: 700,
                    fontSize: "clamp(17px,1.8vw,22px)", letterSpacing: "-0.02em",
                    lineHeight: 1.2, color: "var(--ink)", margin: "0 0 10px",
                  }}>
                    Pack it up. Leave it out.
                  </h3>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, lineHeight: 1.65, color: "var(--muted)", margin: 0 }}>
                    A prepaid return label ships inside the case. Once you&apos;re done, pack everything in and leave it at the door — we arrange collection. No drop-offs, no fees.
                  </p>
                </div>

                {/* Bottom two cards */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(10px,1.2vw,14px)" }}>

                  {/* Phone support */}
                  <div style={{
                    background: "var(--cream)",
                    borderRadius: "1.75rem",
                    padding: "clamp(20px,2.5vw,30px)",
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: "0.75rem",
                      background: "rgba(220,49,41,0.09)", border: "1px solid rgba(220,49,41,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: 16,
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--crimson)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.52 2 2 0 0 1 3.6 1.36h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <h3 style={{
                      fontFamily: "var(--font-syne)", fontWeight: 700,
                      fontSize: "clamp(14px,1.5vw,17px)", letterSpacing: "-0.02em",
                      lineHeight: 1.2, color: "var(--ink)", margin: "0 0 8px",
                    }}>
                      Live phone support
                    </h3>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, lineHeight: 1.6, color: "var(--muted)", margin: 0 }}>
                      A real person on the line while your event runs.
                    </p>
                  </div>

                  {/* Weekend free */}
                  <div style={{
                    background: "white",
                    borderRadius: "1.75rem",
                    padding: "clamp(20px,2.5vw,30px)",
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: "0.75rem",
                      background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.18)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: 16,
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <h3 style={{
                      fontFamily: "var(--font-syne)", fontWeight: 700,
                      fontSize: "clamp(14px,1.5vw,17px)", letterSpacing: "-0.02em",
                      lineHeight: 1.2, color: "var(--ink)", margin: "0 0 8px",
                    }}>
                      Sat + Sun<br />same price
                    </h3>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, lineHeight: 1.6, color: "var(--muted)", margin: 0 }}>
                      Book Saturday, keep it through Sunday at no extra cost.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Equipment Technology Section */}
        <div style={{ background: "var(--cream)", padding: "clamp(72px,10vw,120px) clamp(24px,6vw,96px)", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,80px)", alignItems: "end", marginBottom: "clamp(64px,9vw,96px)" }}>
              <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "clamp(32px,4.5vw,56px)", letterSpacing: "-0.025em", lineHeight: 1.05, color: "var(--ink)", margin: 0 }}>
                Not just lights<br />
                <span style={{ color: "var(--crimson)" }}>and sounds.</span>
              </h2>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(14px,1.2vw,16px)", lineHeight: 1.75, color: "var(--muted)", margin: 0, alignSelf: "end" }}>
                Our taggers run a professional-grade hit system — real health, real ammo, real consequences. Every shot and every kill is tracked automatically so you can focus on the game.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(64px,8vw,96px)" }}>

              {/* Row 1 — Hit points */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,72px)", alignItems: "center" }}>
                <MediaPlaceholder label="Close-up photo: tagger display screen showing live HP and current game mode" type="photo" aspect="4/3" />
                <div>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--crimson)", marginBottom: 16 }}>Hit points</p>
                  <h3 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "clamp(24px,2.8vw,38px)", letterSpacing: "-0.02em", lineHeight: 1.1, color: "var(--ink)", margin: "0 0 20px" }}>
                    Every hit actually hurts.
                  </h3>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(14px,1.15vw,16px)", lineHeight: 1.75, color: "var(--muted)", margin: "0 0 24px" }}>
                    Each player starts with a set HP pool displayed live on the tagger&apos;s built-in screen. Incoming shots chip away at your health — take enough hits and you&apos;re eliminated. No honour system, no arguments. The hardware decides.
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                    {["HP displayed in real time on the tagger screen", "Configurable starting health per game mode", "Auto-respawn or single-life modes available"].map(f => (
                      <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--crimson)", flexShrink: 0, marginTop: 7 }} />
                        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--muted)", lineHeight: 1.55 }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Row 2 — Magazines (flipped) */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,72px)", alignItems: "center" }}>
                <div>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 16 }}>Ammunition</p>
                  <h3 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "clamp(24px,2.8vw,38px)", letterSpacing: "-0.02em", lineHeight: 1.1, color: "var(--ink)", margin: "0 0 20px" }}>
                    Run dry. Reload. Re-engage.
                  </h3>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(14px,1.15vw,16px)", lineHeight: 1.75, color: "var(--muted)", margin: "0 0 24px" }}>
                    Each tagger ships with spare magazines. When your mag runs dry, you physically eject it and slot in a fresh one — just like the real thing. That moment of vulnerability mid-battle completely changes how you play.
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                    {["Each magazine holds a set number of rounds", "Spare mags included in every kit", "Physical reload mechanics add real tactical pressure"].map(f => (
                      <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--blue)", flexShrink: 0, marginTop: 7 }} />
                        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--muted)", lineHeight: 1.55 }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <MediaPlaceholder label="GIF: magazine being ejected from tagger and fresh mag slotted in — close-up, dramatic angle" type="gif" aspect="4/3" />
              </div>

              {/* Row 3 — Vibration motor */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,72px)", alignItems: "center" }}>
                <MediaPlaceholder label="Close-up photo or slow-motion video: hands gripping tagger, trigger being pulled — emphasising tactile weight and feel" type="photo" aspect="4/3" />
                <div>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 16 }}>Vibration motor</p>
                  <h3 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "clamp(24px,2.8vw,38px)", letterSpacing: "-0.02em", lineHeight: 1.1, color: "var(--ink)", margin: "0 0 20px" }}>
                    You feel every shot you fire.
                  </h3>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(14px,1.15vw,16px)", lineHeight: 1.75, color: "var(--muted)", margin: "0 0 24px" }}>
                    Each tagger has a built-in vibration motor that fires on every trigger pull and incoming hit. It&apos;s a small detail that makes a big difference — the physical feedback makes every shot feel real, not digital.
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                    {["Motor pulses on every trigger pull", "Incoming hit vibration confirms damage", "Adds physical weight and presence to the game"].map(f => (
                      <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(0,0,0,0.2)", flexShrink: 0, marginTop: 7 }} />
                        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--muted)", lineHeight: 1.55 }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>

      </main>
      <Footer />
      <EnquiryModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
