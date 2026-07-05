"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EnquiryModal from "@/components/ui/EnquiryModal";

const STATS = [
  { value: "18", suffix: "yrs", label: "In business" },
  { value: "500", suffix: "+", label: "Events delivered" },
  { value: "4.9", suffix: "★", label: "Customer rating" },
  { value: "Age 5", suffix: "+", label: "Safe for all ages" },
];

const WHY_US = [
  {
    icon: <HomeIcon />,
    heading: "Play in your own space",
    body: "Backyards, parks, school ovals, corporate carparks. No travel, no venue booking, no minimum spend. The battle happens wherever you want it.",
  },
  {
    icon: <DollarIcon />,
    heading: "Fraction of the cost",
    body: "Laser tag venues charge per head and per hour, then add catering minimums. Our flat hire rate covers everyone, for as long as you play.",
  },
  {
    icon: <CheckCircleIcon />,
    heading: "We handle the rest",
    body: "Equipment arrives fully charged, with setup guides and a direct line to us. Return is pre-booked. You're the host — not the coordinator.",
  },
];

const VALUES = [
  {
    icon: <ShieldIcon />,
    title: "Equipment-first",
    body: "We invest in the best taggers available and keep them maintained. Every hire goes out fully charged, tested and packed — no exceptions.",
  },
  {
    icon: <TruckIcon />,
    title: "Genuinely effortless",
    body: "Delivery, setup guides, live phone support and return collection. We designed the model so you don't have to think about logistics once.",
  },
  {
    icon: <SmileIcon />,
    title: "Safe for all ages",
    body: "Infrared technology means no pain, no mess and no risk. Kids as young as 5 play happily alongside adults — no modifications needed.",
  },
  {
    icon: <PhoneCallIcon />,
    title: "Always on call",
    body: "We give you our number and we pick up. If something comes up mid-event, we're on the line within minutes — not in a ticket queue.",
  },
];

export default function AboutPage() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
      <Navbar onQuoteClick={() => setQuoteOpen(true)} />
      <main className="min-h-[100dvh]" style={{ background: "var(--cream)" }}>

        {/* ── Hero ────────────────────────────────────── */}
        <div
          className="relative overflow-hidden flex items-end"
          style={{ background: "#09090B", minHeight: "clamp(340px, 50vw, 520px)", paddingTop: 100 }}
        >
          <img
            src="/images/page_header_about.jpg"
            alt=""
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.3, zIndex: 0 }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,9,11,0.9) 0%, rgba(9,9,11,0.4) 60%, rgba(9,9,11,0.2) 100%)", zIndex: 1 }} />
          <div className="max-w-7xl mx-auto px-6 pb-16 w-full" style={{ position: "relative", zIndex: 2 }}>
            <span
              style={{
                display: "inline-flex", alignItems: "center",
                fontFamily: "var(--font-dm-sans)", fontSize: 11, fontWeight: 600,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.06)",
                borderRadius: 100, padding: "4px 14px", marginBottom: 16,
              }}
            >
              About us
            </span>
            <h1
              style={{
                fontFamily: "var(--font-syne)", fontWeight: 700,
                fontSize: "clamp(2.2rem, 5vw, 3.75rem)", letterSpacing: "-0.03em",
                lineHeight: 1.05, color: "white", margin: 0,
              }}
            >
              18 years.<br />500+ events.<br />Still just as excited.
            </h1>
          </div>
        </div>

        {/* ── Stats strip ─────────────────────────────── */}
        <div style={{ background: "var(--ink)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div
            className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4"
            style={{ gap: 0 }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: "clamp(24px,3vw,36px) 24px",
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-syne)", fontWeight: 700,
                    fontSize: "clamp(2rem,4vw,2.75rem)", letterSpacing: "-0.03em",
                    color: "white", lineHeight: 1,
                  }}
                >
                  {s.value}<span style={{ color: "var(--crimson)" }}>{s.suffix}</span>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-dm-sans)", fontSize: 12, fontWeight: 500,
                    color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em",
                    textTransform: "uppercase", marginTop: 6,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Story ───────────────────────────────────── */}
        <div style={{ padding: "clamp(64px,8vw,96px) clamp(24px,6vw,96px)" }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px]" style={{ gap: "clamp(40px,6vw,80px)", alignItems: "start" }}>

              {/* Text */}
              <div>
                <span
                  style={{
                    display: "inline-block", fontFamily: "var(--font-dm-sans)", fontSize: 11,
                    fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
                    color: "var(--blue)", marginBottom: 16,
                  }}
                >
                  Our story
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-syne)", fontWeight: 700,
                    fontSize: "clamp(1.6rem,3vw,2.25rem)", letterSpacing: "-0.025em",
                    lineHeight: 1.15, color: "var(--ink)", margin: "0 0 24px",
                  }}
                >
                  We started because laser tag shouldn&apos;t need a venue.
                </h2>
                <div
                  style={{
                    fontFamily: "var(--font-dm-sans)", fontSize: "1.0625rem",
                    lineHeight: 1.75, color: "var(--muted)",
                    display: "flex", flexDirection: "column", gap: 16,
                  }}
                >
                  <p>
                    Laser Tag 4 Hire launched in 2007 out of Port Stephens, NSW — well before most of our customers were old enough to hold a tagger. Back then, if you didn&apos;t live near a dedicated venue, laser tag wasn&apos;t really an option.
                  </p>
                  <p>
                    That bothered us. So we built a model where the equipment comes to you — fully charged, tested, and ready to go. No venue hire. No van. No complicated setup. Just bring your group and we handle the rest.
                  </p>
                  <p>
                    Five hundred events later, that idea hasn&apos;t changed. What has changed is the equipment — which is substantially better than anything we started with — and our coverage, which now spans NSW, VIC and beyond.
                  </p>
                </div>
              </div>

              {/* Pull quote card */}
              <div style={{ position: "sticky", top: 100 }}>
                <div
                  style={{
                    background: "var(--ink)",
                    borderRadius: "1.5rem",
                    padding: "clamp(28px,4vw,40px)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute", top: -20, right: -20,
                      width: 140, height: 140, borderRadius: "50%",
                      background: "rgba(220,49,41,0.15)", filter: "blur(40px)",
                    }}
                  />
                  <svg
                    width="32" height="24" viewBox="0 0 32 24" fill="none"
                    style={{ marginBottom: 20, opacity: 0.3 }}
                  >
                    <path d="M0 24V14.4C0 6.4 4.267 1.6 12.8 0L14.4 2.4C10.667 3.467 8.267 5.6 7.2 8.8H12.8V24H0ZM19.2 24V14.4C19.2 6.4 23.467 1.6 32 0L33.6 2.4C29.867 3.467 27.467 5.6 26.4 8.8H32V24H19.2Z" fill="white"/>
                  </svg>
                  <blockquote
                    style={{
                      fontFamily: "var(--font-syne)", fontWeight: 600,
                      fontSize: "clamp(1.1rem,2vw,1.35rem)", lineHeight: 1.4,
                      color: "white", margin: "0 0 24px",
                    }}
                  >
                    The battle comes to you. That&apos;s always been the whole idea.
                  </blockquote>
                  <div
                    style={{
                      fontFamily: "var(--font-dm-sans)", fontSize: 13,
                      color: "rgba(255,255,255,0.4)", fontStyle: "italic",
                    }}
                  >
                    — Founded 2007, Port Stephens NSW
                  </div>
                </div>

                {/* Mini rating card */}
                <div
                  style={{
                    background: "white", borderRadius: "1.25rem", marginTop: 16,
                    padding: "20px 24px", border: "1px solid rgba(0,0,0,0.07)",
                    display: "flex", alignItems: "center", gap: 16,
                  }}
                >
                  <div
                    style={{
                      width: 48, height: 48, borderRadius: "50%",
                      background: "rgba(26,95,180,0.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <StarIcon />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-syne)", fontWeight: 700,
                        fontSize: "1.5rem", color: "var(--ink)", lineHeight: 1,
                      }}
                    >
                      4.9 / 5
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-dm-sans)", fontSize: 12,
                        color: "var(--muted)", marginTop: 3,
                      }}
                    >
                      Average customer rating across 500+ events
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── Why hire, not venue? ─────────────────────── */}
        <div style={{ background: "var(--sky)", padding: "clamp(56px,7vw,80px) clamp(24px,6vw,96px)" }}>
          <div className="max-w-7xl mx-auto">
            <div style={{ marginBottom: "clamp(32px,4vw,48px)", textAlign: "center" }}>
              <span
                style={{
                  display: "inline-block", fontFamily: "var(--font-dm-sans)", fontSize: 11,
                  fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
                  color: "var(--blue)", marginBottom: 12,
                }}
              >
                Why hire?
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-syne)", fontWeight: 700,
                  fontSize: "clamp(1.6rem,3vw,2.25rem)", letterSpacing: "-0.025em",
                  lineHeight: 1.15, color: "var(--ink)", margin: 0,
                }}
              >
                Better than booking a venue.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 16 }}>
              {WHY_US.map((item) => (
                <div
                  key={item.heading}
                  style={{
                    background: "white", borderRadius: "1.25rem",
                    padding: "clamp(24px,3vw,32px)",
                    border: "1px solid rgba(0,0,0,0.07)",
                  }}
                >
                  <div
                    style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: "rgba(26,95,180,0.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: 16,
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-syne)", fontWeight: 700,
                      fontSize: "1.0625rem", color: "var(--ink)", margin: "0 0 10px",
                    }}
                  >
                    {item.heading}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans)", fontSize: 14,
                      color: "var(--muted)", lineHeight: 1.65, margin: 0,
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Values ──────────────────────────────────── */}
        <div style={{ padding: "clamp(56px,7vw,80px) clamp(24px,6vw,96px)" }}>
          <div className="max-w-7xl mx-auto">
            <div style={{ marginBottom: "clamp(32px,4vw,48px)" }}>
              <span
                style={{
                  display: "inline-block", fontFamily: "var(--font-dm-sans)", fontSize: 11,
                  fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
                  color: "var(--blue)", marginBottom: 12,
                }}
              >
                How we work
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-syne)", fontWeight: 700,
                  fontSize: "clamp(1.6rem,3vw,2.25rem)", letterSpacing: "-0.025em",
                  lineHeight: 1.15, color: "var(--ink)", margin: 0,
                }}
              >
                The things we don&apos;t compromise on.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 16 }}>
              {VALUES.map((item) => (
                <div
                  key={item.title}
                  style={{
                    background: "white", borderRadius: "1.25rem",
                    padding: "clamp(24px,3vw,32px)",
                    border: "1px solid rgba(0,0,0,0.07)",
                    display: "flex", gap: 20,
                  }}
                >
                  <div
                    style={{
                      width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                      background: "rgba(220,49,41,0.07)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-syne)", fontWeight: 700,
                        fontSize: "1rem", color: "var(--ink)", margin: "0 0 8px",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans)", fontSize: 14,
                        color: "var(--muted)", lineHeight: 1.65, margin: 0,
                      }}
                    >
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ─────────────────────────────────────── */}
        <div
          style={{
            background: "var(--ink)", margin: "0 clamp(16px,3vw,40px) clamp(16px,3vw,40px)",
            borderRadius: "1.75rem", overflow: "hidden", position: "relative",
            padding: "clamp(48px,6vw,72px) clamp(32px,6vw,72px)",
          }}
        >
          <div
            style={{
              position: "absolute", inset: 0,
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px", pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute", bottom: -60, right: -60,
              width: 280, height: 280, borderRadius: "50%",
              background: "rgba(220,49,41,0.2)", filter: "blur(80px)",
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2
              style={{
                fontFamily: "var(--font-syne)", fontWeight: 700,
                fontSize: "clamp(1.75rem,4vw,2.75rem)", letterSpacing: "-0.03em",
                lineHeight: 1.1, color: "white", margin: "0 0 12px",
                maxWidth: "22ch",
              }}
            >
              Ready to bring the battle to your backyard?
            </h2>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.65,
                color: "rgba(255,255,255,0.5)", margin: "0 0 32px", maxWidth: "48ch",
              }}
            >
              We&apos;ll reply within 24 hours. No commitment, no hard sell — just a straight answer on availability and pricing.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                onClick={() => setQuoteOpen(true)}
                className="btn-crimson"
                style={{ fontSize: 15, padding: "12px 28px" }}
              >
                Get a free quote
              </button>
              <Link
                href="/packages"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  fontFamily: "var(--font-dm-sans)", fontWeight: 600, fontSize: 15,
                  color: "rgba(255,255,255,0.6)", textDecoration: "none",
                  padding: "12px 28px", borderRadius: 100,
                  border: "1px solid rgba(255,255,255,0.12)",
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "white"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.3)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.12)"; }}
              >
                View packages
              </Link>
            </div>
            <div
              style={{
                marginTop: 40, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.08)",
                display: "flex", gap: 32, flexWrap: "wrap",
              }}
            >
              <ContactItem icon={<PhoneCallIcon color="rgba(255,255,255,0.35)" />}>
                <a href="tel:1300661565" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", fontFamily: "var(--font-dm-sans)", fontSize: 14 }}>
                  1300 661 565
                </a>
              </ContactItem>
              <ContactItem icon={<MailIcon color="rgba(255,255,255,0.35)" />}>
                <a href="mailto:info@lasertag4hire.com.au" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", fontFamily: "var(--font-dm-sans)", fontSize: 14 }}>
                  info@lasertag4hire.com.au
                </a>
              </ContactItem>
              <ContactItem icon={<LocationIcon color="rgba(255,255,255,0.35)" />}>
                <span style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-dm-sans)", fontSize: 14 }}>
                  PO Box 417, Salamander Bay NSW 2317
                </span>
              </ContactItem>
            </div>
          </div>
        </div>

      </main>
      <Footer />
      <EnquiryModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}

function ContactItem({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {icon}
      {children}
    </div>
  );
}

/* ── Icons ──────────────────────────────────────────── */

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}
function DollarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
    </svg>
  );
}
function CheckCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--crimson)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}
function TruckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--crimson)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  );
}
function SmileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--crimson)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
    </svg>
  );
}
function PhoneCallIcon({ color = "var(--crimson)" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .99h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  );
}
function MailIcon({ color = "var(--crimson)" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}
function LocationIcon({ color = "var(--crimson)" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--blue)" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}
