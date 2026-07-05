"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EnquiryModal from "@/components/ui/EnquiryModal";
import { PACKAGES } from "@/lib/data";

/* ── Static data ─────────────────────────────────────────── */

const HERO_IMAGES: Record<string, string> = {
  "bolter-no-scope": "/images/page_header_bolter_no_scope.jpg",
  "bolter-scope":    "/images/page_header_bolter_scope.jpg",
  "predator":        "/images/page_header_predator.jpg",
};

const PRODUCT_IMAGES: Record<string, string> = {
  "bolter-no-scope": "/images/package-option-bolter-no-scope.jpg",
  "bolter-scope":    "/images/package-option-bolter-scope.jpg",
  "predator":        "/images/package-option-predator.jpg",
};

const DESCRIPTIONS: Record<string, string> = {
  "bolter-no-scope": "Our lightest tagger — at just 1.4kg with a compact polycarbonate shell, it's comfortable for even young kids to hold for hours. Great for backyards, birthday parties and any event with a mixed age group.",
  "bolter-scope":    "All the ergonomics of the Bolter with the addition of a real red-dot scope, doubling effective range to 100m and adding a whole new layer of precision to the game. Our most popular package.",
  "predator":        "Our flagship tagger. The Predator features a foregrip, red-dot scope and full 100m range — built for serious battles. The go-to for teens, adults, corporate events and anyone who wants the full tactical experience.",
};

const CHECKLIST: Record<string, string[]> = {
  "bolter-no-scope": ["10 players at a time", "50m outdoor range", "Lightweight 1.4kg — ages 5+", "Saturday hire includes Sunday free"],
  "bolter-scope":    ["10 players at a time", "100m outdoor range", "Real red-dot scope", "Saturday hire includes Sunday free"],
  "predator":        ["10 players at a time", "100m outdoor range", "Foregrip + red-dot scope", "Saturday hire includes Sunday free"],
};

const TESTIMONIALS: Record<string, { quote: string; name: string; role: string; rating: number }[]> = {
  "bolter-no-scope": [
    { quote: "The kids didn't stop playing for 3 hours straight. Setup was genuinely easy.", name: "Melissa K.", role: "Mum — 11th birthday party", rating: 5 },
    { quote: "Arrived fully charged and ready to go. Dropped it back with the prepaid label — couldn't be simpler.", name: "Josh R.", role: "Dad — backyard party for 10", rating: 5 },
  ],
  "bolter-scope":    [
    { quote: "Perfect for our Year 6 camp. Equipment quality was excellent and approval was easy.", name: "Annette F.", role: "Primary school teacher", rating: 5 },
    { quote: "Kids were completely engaged for three hours. The red-dot scopes added a whole new level of fun.", name: "Chris M.", role: "Community sports coach", rating: 5 },
  ],
  "predator":        [
    { quote: "Our team of 24 played for two hours straight. Genuinely a great bonding activity.", name: "Daniel W.", role: "HR Manager, corporate team day", rating: 5 },
    { quote: "The inflatable bunkers made the space look incredible. Our clients were genuinely impressed.", name: "Sarah T.", role: "Events Coordinator", rating: 5 },
  ],
};

const KIT_ITEMS = [
  { label: "Medic boxes ×2", desc: "For respawning eliminated players mid-game.", image: "/images/medic-box-image.jpg" },
  { label: "Master controller ×1", desc: "Manages game modes, teams and all tagger settings.", image: "/images/controller-image.jpg" },
  { label: "Spare magazines", desc: "Physical reload mechanic — eject and slot a fresh mag when you run dry.", image: null },
  { label: "Setup guide", desc: "Step-by-step instructions. Up and running in under 10 minutes.", image: null },
  { label: "Carry case", desc: "Hard carry case keeps everything safe in transit.", image: null },
  { label: "Prepaid return courier", desc: "Return label and booking included. Just pack it up and leave it out.", image: null },
];

const FAREHARBOR_ITEMS: Record<string, string> = {
  "bolter-no-scope": "632367",
  "bolter-scope":    "642824",
  "predator":        "642823",
};

const BESTFOR_DETAIL: Record<string, string> = {
  "Younger kids":          "Lightweight enough for ages 5+ to hold comfortably for hours.",
  "Backyard parties":      "Sets up in under 10 minutes on any outdoor surface.",
  "Vacation care":         "Multiple game modes keep large groups engaged across a full day.",
  "Birthday parties":      "No venue needed — the battle comes to your backyard.",
  "School groups":         "Structured gameplay with minimal supervision required.",
  "Teens & adults":        "Full tactical experience with realistic range and reload mechanics.",
  "Corporate events":      "Gets teams competing and communicating without the awkwardness.",
  "Large outdoor battles": "100m range means sprawling, tactical gameplay across large properties.",
};

/* ── Best-for icon ──────────────────────────────────────── */

function BestForIcon({ label, color }: { label: string; color: string }) {
  const s = {
    width: 20, height: 20, viewBox: "0 0 24 24", fill: "none",
    stroke: color, strokeWidth: 1.5 as number,
    strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  };
  switch (label) {
    case "Younger kids":
      return <svg {...s}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
    case "Backyard parties":
      return <svg {...s}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
    case "Vacation care":
      return <svg {...s}><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/></svg>;
    case "Birthday parties":
      return <svg {...s}><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>;
    case "School groups":
      return <svg {...s}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
    case "Teens & adults":
      return <svg {...s}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
    case "Corporate events":
      return <svg {...s}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
    case "Large outdoor battles":
      return <svg {...s}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/></svg>;
    default:
      return <svg {...s}><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>;
  }
}

/* ── FareHarbor calendar widget ─────────────────────────── */

function FareHarborCalendar({ itemId }: { itemId: string }) {
  // FareHarbor's calendar script uses document.write(), which fails when injected
  // dynamically after page load. An srcdoc iframe gives it a fresh document to write into.
  const srcDoc = [
    "<!DOCTYPE html><html><head>",
    '<meta name="viewport" content="width=device-width,initial-scale=1">',
    "<style>html,body{margin:0;padding:0;}</style>",
    "</head><body>",
    `<script src="https://fareharbor.com/embeds/api/v1/?autolightframe=yes"><\/script>`,
    `<script src="https://fareharbor.com/embeds/script/calendar/lasertag4hire/items/${itemId}/?fallback=simple&full-items=yes&flow=1395419"><\/script>`,
    "</body></html>",
  ].join("");

  return (
    <iframe
      srcDoc={srcDoc}
      style={{ width: "100%", height: "34.375rem", border: "none", display: "block" }}
      title="FareHarbor Booking Calendar"
    />
  );
}

/* ── Page ────────────────────────────────────────────────── */

export default function PackageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const pkg = PACKAGES.find((p) => p.id === id);
  if (!pkg) notFound();

  const [quoteOpen, setQuoteOpen] = useState(false);
  const [activeKit, setActiveKit] = useState(0);
  const accentColor = pkg.featured ? "var(--crimson)" : "var(--blue)";
  const testimonials = TESTIMONIALS[pkg.id] ?? [];

  return (
    <>
      <Navbar onQuoteClick={() => setQuoteOpen(true)} />
      <main style={{ background: "var(--cream)" }}>

        {/* ── Hero — floating card over full-bleed photo ── */}
        <div style={{ position: "relative" }}>

          {/* Full-bleed background photo — absolute, fills hero height set by card */}
          <img
            src={HERO_IMAGES[pkg.id]}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center 20%",
            }}
          />

          {/* Bottom scrim — blends into cream below */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 220,
            background: "linear-gradient(to top, var(--cream) 0%, transparent 100%)",
            pointerEvents: "none",
          }} />

          {/* Card in normal flow — its height determines the hero height */}
          <div style={{
            position: "relative",
            zIndex: 10,
            minHeight: "88vh",
            paddingTop: 92,
            paddingRight: "clamp(24px, 6vw, 96px)",
            paddingBottom: 64,
            display: "flex", alignItems: "flex-start", justifyContent: "flex-end",
          }}>
          {/* Right-side floating card */}
          <div style={{
            width: "clamp(340px, 42vw, 520px)",
            background: "white",
            borderRadius: "1.75rem",
            boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 24px 72px rgba(0,0,0,0.10)",
            padding: "clamp(28px, 3.5vw, 44px)",
          }}>
            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 22 }}>
              <Link href="/packages" style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--muted)", textDecoration: "none" }}>
                Packages
              </Link>
              <span style={{ color: "rgba(0,0,0,0.2)", fontSize: 11 }}>›</span>
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--ink)" }}>
                {pkg.name}
              </span>
            </div>

            {/* Package name + tagline */}
            <h1 style={{
              fontFamily: "var(--font-syne)", fontWeight: 700,
              fontSize: "clamp(28px, 3.2vw, 44px)", letterSpacing: "-0.03em", lineHeight: 1.05,
              color: "var(--ink)", margin: "0 0 4px",
            }}>
              {pkg.name}
            </h1>
            <p style={{
              fontFamily: "var(--font-dm-sans)", fontSize: 11, fontWeight: 700,
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: accentColor, margin: "0 0 20px",
            }}>
              {pkg.tagline}
            </p>

            {/* Description */}
            <p style={{
              fontFamily: "var(--font-dm-sans)", fontSize: "clamp(13px, 1.1vw, 15px)",
              lineHeight: 1.7, color: "var(--muted)", margin: "0 0 24px",
            }}>
              {DESCRIPTIONS[pkg.id]}
            </p>

            {/* Checklist */}
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 10 }}>
              {CHECKLIST[pkg.id].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                    background: accentColor,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, fontWeight: 500, color: "var(--ink)" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(0,0,0,0.07)", marginBottom: 24 }} />

            {/* Price */}
            <div style={{ marginBottom: 20 }}>
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,0,0,0.3)", display: "block", marginBottom: 4 }}>
                From
              </span>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "clamp(32px,3.5vw,48px)", letterSpacing: "-0.04em", color: "var(--ink)", lineHeight: 1 }}>
                  ${pkg.price}
                </span>
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--muted)" }}>AUD</span>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a
                href="#book"
                className="btn-crimson"
                style={{ justifyContent: "center" }}
              >
                Check availability
                <span className="btn-icon-wrap">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M6 2v8M2 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
              <button
                onClick={() => setQuoteOpen(true)}
                className="btn-outline"
                style={{ justifyContent: "center" }}
              >
                Get a free quote
              </button>
            </div>
          </div>
          </div>

          {/* Testimonial widgets — lower-left of the initial viewport */}
          {testimonials.length > 0 && (
            <div style={{
              position: "absolute", top: "clamp(480px, 68vh, 680px)", left: "clamp(24px, 6vw, 96px)",
              zIndex: 10,
              display: "flex", gap: 12,
            }}>
              {testimonials.map((t, idx) => (
                <div key={idx} style={{
                  width: "clamp(220px, 22vw, 300px)",
                  background: "white",
                  borderRadius: "1.25rem",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1), 0 12px 40px rgba(0,0,0,0.07)",
                  padding: "20px 22px",
                }}>
                  {/* Stars */}
                  <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--ink)", lineHeight: 1.55, margin: "0 0 12px" }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: pkg.featured ? "var(--crimson)" : "var(--blue)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: 12, color: "white",
                      flexShrink: 0,
                    }}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{t.name}</div>
                      <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--muted)" }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Book your date ── */}
        <div id="book" style={{ background: "white", padding: "clamp(56px,8vw,96px) clamp(24px,6vw,96px)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "0.7fr clamp(14em, 37%, 24em) 1.3fr", gap: "clamp(32px,4vw,52px)", alignItems: "start" }}>

              {/* Left — context */}
              <div style={{ position: "sticky", top: 92 }}>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,0,0,0.3)", margin: "0 0 10px" }}>
                  Book online
                </p>
                <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "clamp(22px,2.6vw,34px)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--ink)", margin: "0 0 16px" }}>
                  {pkg.name}
                </h2>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 16 }}>
                  <span style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "clamp(28px,3vw,40px)", letterSpacing: "-0.04em", color: "var(--ink)", lineHeight: 1 }}>
                    ${pkg.price}
                  </span>
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--muted)" }}>AUD</span>
                </div>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, lineHeight: 1.7, color: "var(--muted)", margin: "0 0 24px" }}>
                  Select a date to see availability. You&apos;ll complete your booking securely through FareHarbor.
                </p>
                <div style={{ height: 1, background: "rgba(0,0,0,0.07)", marginBottom: 20 }} />
                <button
                  onClick={() => setQuoteOpen(true)}
                  className="btn-outline"
                  style={{ justifyContent: "center", width: "100%" }}
                >
                  Prefer a quote instead?
                </button>
              </div>

              {/* Centre — what happens next */}
              <div style={{ position: "sticky", top: 92 }}>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,0,0,0.3)", margin: "0 0 20px" }}>
                  What happens next
                </p>
                {[
                  { n: "1", title: "Pick a date", body: "Green dates are available. Grey dates are booked or unavailable." },
                  { n: "2", title: "Complete your booking", body: "Pay securely through FareHarbor. No hidden fees, no deposit required to enquire." },
                  { n: "3", title: "We ship your kit", body: "Your gear arrives fully charged, pre-configured, and packed in a hard carry case." },
                  { n: "4", title: "Play, then return free", body: "A prepaid return courier label is included. Just pack it up and leave it out." },
                ].map(({ n, title, body }) => (
                  <div key={n} style={{ display: "flex", gap: 14, marginBottom: 22 }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                      background: accentColor,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: 11, color: "white",
                    }}>
                      {n}
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-syne)", fontSize: 14, fontWeight: 700, color: "var(--ink)", marginBottom: 4, lineHeight: 1.2 }}>{title}</div>
                      <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--muted)", lineHeight: 1.65 }}>{body}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right — calendar */}
              <div>
                <FareHarborCalendar itemId={FAREHARBOR_ITEMS[pkg.id]} />
              </div>

            </div>
          </div>
        </div>

        {/* ── Add extras — Spotlight ── */}
        <div style={{ background: "#0d2b5e", padding: "clamp(56px,8vw,96px) clamp(24px,6vw,96px)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>

            {/* Header */}
            <div style={{
              display: "flex", alignItems: "flex-end", justifyContent: "space-between",
              flexWrap: "wrap", gap: "clamp(16px,2vw,24px)",
              marginBottom: "clamp(32px,4vw,48px)",
            }}>
              <div>
                <span style={{
                  display: "inline-flex", alignItems: "center",
                  fontFamily: "var(--font-dm-sans)", fontSize: 11, fontWeight: 600,
                  letterSpacing: "0.12em", textTransform: "uppercase" as const,
                  color: "rgba(255,255,255,0.5)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 100, padding: "4px 12px", marginBottom: 12,
                }}>
                  Optional add-ons
                </span>
                <h2 style={{
                  fontFamily: "var(--font-syne)", fontWeight: 700,
                  fontSize: "clamp(26px,3vw,40px)", letterSpacing: "-0.025em",
                  lineHeight: 1.1, color: "white", margin: 0,
                }}>
                  Scale it up.
                </h2>
              </div>
              <p style={{
                fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.7,
                color: "rgba(255,255,255,0.5)", margin: 0, maxWidth: "42ch",
              }}>
                Every package starts at 10 players. Add extra taggers or inflatable cover to turn a backyard into a full-scale battlefield.
              </p>
            </div>

            {/* Spotlight cards */}
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "clamp(12px,1.5vw,16px)" }}>
              {[
                {
                  title: "Additional taggers",
                  desc: "Each add-on includes 2 extra laser taggers, letting more friends or family join the battle. Perfect for larger parties and team-building events — just select how many sets you need at booking.",
                  note: "Subject to availability — book early.",
                  price: "$84 / 2 taggers",
                  cta: "Enquire about extras",
                  image: "/images/additional-taggers-image.jpg",
                },
                {
                  title: "Inflatable obstacles",
                  desc: "Pop-up barriers create dynamic cover and tactical opportunities, transforming any backyard, park, or open space into a proper battlefield. Great for encouraging strategy and boosting the experience.",
                  note: null as string | null,
                  price: "$78 / 2 bunkers",
                  cta: "Enquire about obstacles",
                  image: "/images/inflatable-packages-image.jpg",
                },
              ].map((addon) => (
                <div
                  key={addon.title}
                  style={{
                    position: "relative",
                    borderRadius: "1.5rem",
                    overflow: "hidden",
                    height: "clamp(400px,48vw,540px)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                >
                  <img
                    src={addon.image}
                    alt={addon.title}
                    style={{
                      position: "absolute", inset: 0,
                      width: "100%", height: "100%",
                      objectFit: "cover", display: "block",
                    }}
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.05) 100%)",
                  }} />
                  <div style={{ position: "relative", padding: "clamp(24px,3vw,36px)" }}>
                    <span style={{
                      display: "inline-flex", alignItems: "center",
                      fontFamily: "var(--font-dm-sans)", fontSize: 12, fontWeight: 700,
                      color: "white",
                      background: pkg.featured ? "var(--crimson)" : "var(--blue)",
                      borderRadius: 100, padding: "5px 14px",
                      marginBottom: 14, letterSpacing: "0.01em",
                    }}>
                      {addon.price}
                    </span>
                    <h3 style={{
                      fontFamily: "var(--font-syne)", fontWeight: 700,
                      fontSize: "clamp(22px,2.8vw,34px)", letterSpacing: "-0.02em",
                      color: "white", margin: "0 0 10px", lineHeight: 1.1,
                    }}>
                      {addon.title}
                    </h3>
                    <p style={{
                      fontFamily: "var(--font-dm-sans)", fontSize: 14,
                      color: "rgba(255,255,255,0.65)", lineHeight: 1.6,
                      margin: "0 0 24px", maxWidth: "38ch",
                    }}>
                      {addon.desc}
                    </p>
                    <button
                      onClick={() => setQuoteOpen(true)}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        fontFamily: "var(--font-dm-sans)", fontWeight: 600, fontSize: 14,
                        color: "white",
                        background: "rgba(255,255,255,0.12)",
                        border: "1px solid rgba(255,255,255,0.25)",
                        borderRadius: 100, padding: "10px 20px",
                        cursor: "pointer",
                        backdropFilter: "blur(8px)",
                        transition: "background 300ms cubic-bezier(0.23,1,0.32,1), border-color 300ms cubic-bezier(0.23,1,0.32,1)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.2)";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.4)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.25)";
                      }}
                    >
                      {addon.cta}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                    {addon.note && (
                      <p style={{
                        fontFamily: "var(--font-dm-sans)", fontSize: 12,
                        color: "rgba(255,255,255,0.35)", lineHeight: 1.5,
                        margin: "12px 0 0", fontStyle: "italic",
                      }}>
                        {addon.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── What's in the kit — Interactive Manifest ── */}
        <div style={{ background: "white", borderTop: "1px solid rgba(0,0,0,0.07)" }}>

          {/* Section heading */}
          <div style={{
            maxWidth: 1280, margin: "0 auto",
            padding: "clamp(64px,9vw,112px) clamp(24px,6vw,96px) clamp(40px,5vw,56px)",
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            flexWrap: "wrap", gap: "clamp(16px,3vw,40px)",
          }}>
            <div>
              <span style={{
                display: "inline-flex",
                fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: accentColor,
                background: pkg.featured ? "rgba(220,49,41,0.08)" : "rgba(26,95,180,0.08)",
                border: `1px solid ${pkg.featured ? "rgba(220,49,41,0.14)" : "rgba(26,95,180,0.14)"}`,
                borderRadius: 100, padding: "5px 14px", marginBottom: 14,
              }}>
                In the box
              </span>
              <h2 style={{
                fontFamily: "var(--font-syne)", fontWeight: 700,
                fontSize: "clamp(32px,4vw,54px)", letterSpacing: "-0.025em",
                lineHeight: 1.05, color: "var(--ink)", margin: 0,
              }}>
                What comes<br />in the kit
              </h2>
            </div>
            <p style={{
              fontFamily: "var(--font-dm-sans)", fontSize: "clamp(13px,1.1vw,15px)",
              lineHeight: 1.7, color: "var(--muted)", margin: 0, maxWidth: "40ch",
            }}>
              Everything arrives fully charged, pre-configured and packed in a hard carry case — ready to play straight out of the box.
            </p>
          </div>

          {/* Interactive split */}
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ maxWidth: 1280, margin: "0 auto" }}>

            {/* Left — sticky image stage */}
            <div style={{ padding: "0 clamp(24px,6vw,96px) clamp(32px,4vw,48px)" }} className="lg:pr-[clamp(12px,1.5vw,24px)] lg:pb-[clamp(64px,9vw,112px)]">
              <div className="lg:sticky lg:top-[92px]">
                <div style={{
                  borderRadius: "1.5rem", overflow: "hidden",
                  background: "var(--cream)", position: "relative",
                  height: "clamp(240px, 45vw, 540px)",
                }}>
                  {/* Photo: tagger (index 0) */}
                  <img src={PRODUCT_IMAGES[pkg.id]} alt={`${pkg.name} tagger`} style={{
                    position: "absolute", inset: 0, width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: "center",
                    opacity: activeKit === 0 ? 1 : 0,
                    transition: "opacity 600ms cubic-bezier(0.23,1,0.32,1)",
                  }} />

                  {/* Photo: medic boxes (index 1) */}
                  <img src="/images/medic-box-image.jpg" alt="Medic boxes" style={{
                    position: "absolute", inset: 0, width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: "center",
                    opacity: activeKit === 1 ? 1 : 0,
                    transition: "opacity 600ms cubic-bezier(0.23,1,0.32,1)",
                  }} />

                  {/* Photo: master controller (index 2) */}
                  <img src="/images/controller-image.jpg" alt="Master controller" style={{
                    position: "absolute", inset: 0, width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: "center",
                    opacity: activeKit === 2 ? 1 : 0,
                    transition: "opacity 600ms cubic-bezier(0.23,1,0.32,1)",
                  }} />

                  {/* Typographic panels for accessory items (indices 3–6) */}
                  {([
                    { label: "Spare\nmagazines",   iconPath: "M8 3h8a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM9 7h6M9 11h6M9 15h4" },
                    { label: "Setup\nguide",        iconPath: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
                    { label: "Carry\ncase",         iconPath: "M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM8 2v4M16 2v4M2 10h20" },
                    { label: "Prepaid\nreturn",     iconPath: "M1 4v6h6M3.51 15a9 9 0 1 0 .49-3.5" },
                  ] as { label: string; iconPath: string }[]).map((panel, panelIdx) => (
                    <div key={panel.label} style={{
                      position: "absolute", inset: 0,
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center", gap: 20,
                      background: "var(--cream)",
                      opacity: activeKit === panelIdx + 3 ? 1 : 0,
                      transition: "opacity 600ms cubic-bezier(0.23,1,0.32,1)",
                    }}>
                      <span style={{
                        position: "absolute",
                        fontFamily: "var(--font-syne)", fontWeight: 700,
                        fontSize: "clamp(56px,9vw,96px)", letterSpacing: "-0.04em",
                        lineHeight: 1.0, color: "rgba(0,0,0,0.05)",
                        textAlign: "center", whiteSpace: "pre-line",
                        userSelect: "none", pointerEvents: "none",
                      }}>
                        {panel.label}
                      </span>
                      <div style={{
                        width: 72, height: 72, borderRadius: "1.125rem",
                        background: "white",
                        boxShadow: "0 2px 16px rgba(0,0,0,0.07), 0 8px 32px rgba(0,0,0,0.04)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        position: "relative",
                      }}>
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
                          stroke={accentColor} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d={panel.iconPath} />
                        </svg>
                      </div>
                      <span style={{
                        fontFamily: "var(--font-syne)", fontWeight: 700,
                        fontSize: "clamp(16px,1.8vw,22px)", letterSpacing: "-0.02em",
                        color: "var(--ink)", position: "relative", textAlign: "center",
                        whiteSpace: "pre-line",
                      }}>
                        {panel.label}
                      </span>
                    </div>
                  ))}

                  {/* Counter badge */}
                  <div style={{
                    position: "absolute", bottom: 20, left: 20,
                    background: "rgba(0,0,0,0.45)",
                    borderRadius: 100, padding: "6px 14px",
                    pointerEvents: "none",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-dm-sans)", fontSize: 11, fontWeight: 600,
                      letterSpacing: "0.1em", color: "rgba(255,255,255,0.75)",
                    }}>
                      {String(activeKit + 1).padStart(2, "0")} / {String(KIT_ITEMS.length + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — numbered manifest rows */}
            <div style={{ padding: "0 clamp(24px,6vw,96px) clamp(64px,9vw,112px)" }} className="lg:pl-[clamp(12px,1.5vw,24px)]">
              {([
                { label: `${pkg.name} taggers ×${pkg.taggers}`, desc: `${pkg.weight} · ${pkg.range} range · ${pkg.ageRange}` },
                ...KIT_ITEMS,
              ]).map((item, i) => (
                <div
                  key={item.label}
                  onMouseEnter={() => setActiveKit(i)}
                  style={{
                    borderBottom: "1px solid rgba(0,0,0,0.07)",
                    padding: "clamp(18px,2.2vw,26px) clamp(12px,1.5vw,18px)",
                    borderRadius: 10,
                    background: activeKit === i
                      ? pkg.featured ? "rgba(220,49,41,0.04)" : "rgba(26,95,180,0.04)"
                      : "transparent",
                    transition: "background 280ms cubic-bezier(0.23,1,0.32,1)",
                    cursor: "default",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(14px,1.8vw,22px)" }}>
                    {/* Number */}
                    <span style={{
                      fontFamily: "var(--font-syne)", fontWeight: 700,
                      fontSize: "clamp(18px,2.2vw,28px)", letterSpacing: "-0.04em",
                      lineHeight: 1, flexShrink: 0, minWidth: "2ch",
                      color: activeKit === i ? accentColor : "rgba(0,0,0,0.13)",
                      transition: "color 280ms cubic-bezier(0.23,1,0.32,1)",
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Label + revealed description */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontFamily: "var(--font-syne)", fontWeight: 700,
                        fontSize: "clamp(13px,1.35vw,17px)", letterSpacing: "-0.015em",
                        lineHeight: 1.25,
                        color: activeKit === i ? "var(--ink)" : "rgba(0,0,0,0.5)",
                        marginBottom: activeKit === i ? 7 : 0,
                        transition: "color 280ms cubic-bezier(0.23,1,0.32,1), margin 350ms cubic-bezier(0.23,1,0.32,1)",
                      }}>
                        {item.label}
                      </div>
                      <div style={{
                        fontFamily: "var(--font-dm-sans)", fontSize: 13,
                        color: "var(--muted)", lineHeight: 1.6,
                        maxHeight: activeKit === i ? "80px" : "0px",
                        opacity: activeKit === i ? 1 : 0,
                        overflow: "hidden",
                        transition: "max-height 420ms cubic-bezier(0.23,1,0.32,1), opacity 280ms cubic-bezier(0.23,1,0.32,1)",
                      }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Best for ── */}
        <div style={{ background: "white", borderTop: "1px solid rgba(0,0,0,0.07)", padding: "clamp(56px,8vw,96px) clamp(24px,6vw,96px)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>

            {/* Section header */}
            <div style={{
              display: "flex", alignItems: "flex-end", justifyContent: "space-between",
              flexWrap: "wrap", gap: "clamp(16px,2vw,24px)",
              marginBottom: "clamp(32px,4vw,52px)",
            }}>
              <div>
                <span style={{
                  display: "inline-flex", alignItems: "center",
                  fontFamily: "var(--font-dm-sans)", fontSize: 11, fontWeight: 600,
                  letterSpacing: "0.12em", textTransform: "uppercase" as const,
                  color: accentColor,
                  border: `1px solid ${pkg.featured ? "rgba(220,49,41,0.2)" : "rgba(26,95,180,0.2)"}`,
                  background: pkg.featured ? "rgba(220,49,41,0.05)" : "rgba(26,95,180,0.05)",
                  borderRadius: 100, padding: "4px 12px", marginBottom: 12,
                }}>
                  {pkg.name}
                </span>
                <h2 style={{
                  fontFamily: "var(--font-syne)", fontWeight: 700,
                  fontSize: "clamp(26px,3vw,40px)", letterSpacing: "-0.025em",
                  lineHeight: 1.1, color: "var(--ink)", margin: 0,
                }}>
                  Right for your event?
                </h2>
              </div>
              <p style={{
                fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.7,
                color: "var(--muted)", margin: 0, maxWidth: "38ch",
              }}>
                The {pkg.name} works best for the following events and group types.
              </p>
            </div>

            {/* Cards — column count matches item count so there are never orphans */}
            <div
              className={`grid grid-cols-1 ${pkg.bestFor.length <= 3 ? "min-[560px]:grid-cols-3" : "min-[400px]:grid-cols-2 min-[760px]:grid-cols-4"}`}
              style={{ gap: "clamp(10px,1.2vw,14px)" }}
            >
              {pkg.bestFor.map((label) => (
                <div key={label} style={{
                  background: "var(--cream)",
                  borderRadius: "1.25rem",
                  border: "1px solid rgba(0,0,0,0.06)",
                  padding: "clamp(20px,2.5vw,28px)",
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "0.75rem", flexShrink: 0,
                    background: pkg.featured ? "rgba(220,49,41,0.07)" : "rgba(26,95,180,0.07)",
                    border: `1px solid ${pkg.featured ? "rgba(220,49,41,0.1)" : "rgba(26,95,180,0.1)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 16,
                  }}>
                    <BestForIcon label={label} color={accentColor} />
                  </div>
                  <h3 style={{
                    fontFamily: "var(--font-syne)", fontWeight: 700,
                    fontSize: "clamp(14px,1.2vw,16px)", color: "var(--ink)",
                    margin: "0 0 8px", lineHeight: 1.3,
                  }}>
                    {label}
                  </h3>
                  <p style={{
                    fontFamily: "var(--font-dm-sans)", fontSize: 13,
                    color: "var(--muted)", lineHeight: 1.6, margin: 0,
                  }}>
                    {BESTFOR_DETAIL[label] ?? "A great fit for this type of event."}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── Other packages ── */}
        <div style={{ background: "#09090B", padding: "clamp(48px,6vw,72px) clamp(24px,6vw,96px)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "clamp(20px,2.4vw,30px)", letterSpacing: "-0.02em", color: "white", margin: "0 0 6px" }}>
                Not sure this is the right fit?
              </h2>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "rgba(255,255,255,0.4)", margin: 0 }}>
                Compare all three packages and find the one that suits your event.
              </p>
            </div>
            <Link href="/packages" className="btn-outline-white" style={{ flexShrink: 0 }}>
              View all packages
            </Link>
          </div>
        </div>

        {/* ── CTA ── */}
        <div style={{ background: "var(--crimson)", position: "relative", overflow: "hidden", padding: "clamp(64px,9vw,96px) clamp(24px,6vw,96px) clamp(48px,6vw,72px)" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
          <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr auto", gap: "clamp(24px,4vw,64px)", alignItems: "center" }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "clamp(28px,4vw,52px)", letterSpacing: "-0.03em", lineHeight: 1.05, color: "white", margin: "0 0 12px" }}>
                Ready to bring the battle to your backyard?
              </h2>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(14px,1.2vw,16px)", color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.7 }}>
                Equipment arrives ready to play. You run the game. No deposit required to enquire.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
              <a
                href="https://fareharbor.com/embeds/book/lasertag4hire/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "white", color: "var(--crimson)", borderRadius: 100, padding: "14px 28px", fontFamily: "var(--font-dm-sans)", fontSize: 15, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}
              >
                Book now — from ${pkg.price}
              </a>
              <button
                onClick={() => setQuoteOpen(true)}
                style={{ display: "inline-flex", alignItems: "center", background: "transparent", color: "white", border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: 100, padding: "13px 28px", fontFamily: "var(--font-dm-sans)", fontSize: 15, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
              >
                Get a free quote
              </button>
            </div>
          </div>
        </div>

      </main>
      <div style={{ background: "var(--crimson)", padding: "0 clamp(16px,2.5vw,28px)" }}>
        <Footer />
      </div>
      <EnquiryModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
