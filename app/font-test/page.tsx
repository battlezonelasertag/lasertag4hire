import {
  Bricolage_Grotesque,
  Barlow_Condensed,
  Barlow,
  Plus_Jakarta_Sans,
  Space_Grotesk,
  DM_Sans,
} from "next/font/google";

// A — Bricolage Grotesque: chunky, editorial, modern personality
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--ft-bricolage",
});

// B — Barlow Condensed (display) + Barlow (body): athletic, action-brand feel
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--ft-barlow-cond",
});
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--ft-barlow",
});

// C — Plus Jakarta Sans: clean, modern, consumer-brand warmth
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--ft-jakarta",
});

// D — Space Grotesk: distinctive letterforms, modern-techy but approachable
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--ft-space",
});

// DM Sans for body in pairings A, C, D
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--ft-dm",
});

const PAIRINGS = [
  {
    id: "A",
    name: "Bricolage Grotesque",
    subtitle: "Display + DM Sans body",
    description: "Chunky, editorial — feels premium and distinctive without being cold or corporate.",
    displayFont: "var(--ft-bricolage)",
    bodyFont: "var(--ft-dm)",
    displayWeight: 800,
    displayTracking: "-0.025em",
    displayLeading: 1.0,
  },
  {
    id: "B",
    name: "Barlow Condensed",
    subtitle: "Display + Barlow body",
    description: "Condensed athletic headers — sporty, action-oriented, single-family cohesion.",
    displayFont: "var(--ft-barlow-cond)",
    bodyFont: "var(--ft-barlow)",
    displayWeight: 800,
    displayTracking: "-0.01em",
    displayLeading: 0.95,
  },
  {
    id: "C",
    name: "Plus Jakarta Sans",
    subtitle: "Display + body, single family",
    description: "Clean and modern with warmth — consumer-brand feel, versatile across all contexts.",
    displayFont: "var(--ft-jakarta)",
    bodyFont: "var(--ft-jakarta)",
    displayWeight: 800,
    displayTracking: "-0.03em",
    displayLeading: 1.0,
  },
  {
    id: "D",
    name: "Space Grotesk",
    subtitle: "Display + DM Sans body",
    description: "Distinctive letterforms give it real character — modern and approachable without being generic.",
    displayFont: "var(--ft-space)",
    bodyFont: "var(--ft-dm)",
    displayWeight: 700,
    displayTracking: "-0.025em",
    displayLeading: 1.0,
  },
];

export default function FontTestPage() {
  const vars = [
    bricolage.variable,
    barlowCondensed.variable,
    barlow.variable,
    jakarta.variable,
    spaceGrotesk.variable,
    dmSans.variable,
  ].join(" ");

  return (
    <div className={vars} style={{ background: "#f5f5f0", minHeight: "100vh", padding: "48px 32px" }}>
      {/* Header */}
      <div style={{ maxWidth: 1200, margin: "0 auto 56px" }}>
        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            fontFamily: "var(--ft-dm)",
            color: "#2563EB",
            textDecoration: "none",
            marginBottom: 32,
          }}
        >
          ← Back to site
        </a>
        <h1 style={{ fontFamily: "var(--ft-dm)", fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#94A3B8", marginBottom: 8 }}>
          Font Pairing Test
        </h1>
        <p style={{ fontFamily: "var(--ft-dm)", fontSize: 16, color: "#09090B", maxWidth: 560 }}>
          Same copy, four different pairings. Each shown across a hero headline, a section heading, body text, and a button. Pick the one that feels right for LT4H.
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 24,
        }}
      >
        {PAIRINGS.map((p) => (
          <div
            key={p.id}
            style={{
              background: "white",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.04)",
            }}
          >
            {/* Label bar */}
            <div
              style={{
                padding: "14px 24px",
                borderBottom: "1px solid #f0f0ee",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "#09090B",
                  color: "white",
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: "var(--ft-dm)",
                  flexShrink: 0,
                }}
              >
                {p.id}
              </span>
              <div>
                <div style={{ fontFamily: "var(--ft-dm)", fontWeight: 600, fontSize: 14, color: "#09090B" }}>{p.name}</div>
                <div style={{ fontFamily: "var(--ft-dm)", fontSize: 12, color: "#94A3B8" }}>{p.subtitle}</div>
              </div>
            </div>

            {/* Dark hero preview */}
            <div
              style={{
                background: "linear-gradient(135deg, #0C1B3A 0%, #09090B 100%)",
                padding: "36px 32px 40px",
              }}
            >
              {/* Eyebrow */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 100,
                  padding: "5px 12px",
                  marginBottom: 20,
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#E11D48", display: "inline-block", flexShrink: 0 }} />
                <span
                  style={{
                    fontFamily: p.bodyFont,
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  Laser Tag Equipment Hire
                </span>
              </div>

              {/* Hero headline */}
              <div
                style={{
                  fontFamily: p.displayFont,
                  fontWeight: p.displayWeight,
                  fontSize: 52,
                  letterSpacing: p.displayTracking,
                  lineHeight: p.displayLeading,
                  color: "white",
                  marginBottom: 4,
                }}
              >
                Laser Tag.
              </div>
              <div
                style={{
                  fontFamily: p.displayFont,
                  fontWeight: p.displayWeight,
                  fontSize: 52,
                  letterSpacing: p.displayTracking,
                  lineHeight: p.displayLeading,
                  color: "#E11D48",
                  marginBottom: 20,
                }}
              >
                Anywhere.
              </div>

              {/* Body */}
              <p
                style={{
                  fontFamily: p.bodyFont,
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.6)",
                  maxWidth: 360,
                  marginBottom: 28,
                }}
              >
                We deliver premium laser tag equipment to your door — fully charged and ready to play.
              </p>

              {/* CTAs */}
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  style={{
                    background: "#F97316",
                    color: "#09090B",
                    border: "none",
                    borderRadius: 100,
                    padding: "11px 22px",
                    fontFamily: p.bodyFont,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Book now
                </button>
                <button
                  style={{
                    background: "transparent",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 100,
                    padding: "11px 22px",
                    fontFamily: p.bodyFont,
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Get a free quote
                </button>
              </div>
            </div>

            {/* Light section preview */}
            <div style={{ padding: "32px 32px 36px", background: "#FAFAF5" }}>
              {/* Eyebrow */}
              <div
                style={{
                  display: "inline-block",
                  background: "#EFF6FF",
                  color: "#2563EB",
                  borderRadius: 100,
                  padding: "4px 12px",
                  fontFamily: p.bodyFont,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Packages
              </div>

              {/* Section heading */}
              <div
                style={{
                  fontFamily: p.displayFont,
                  fontWeight: p.displayWeight,
                  fontSize: 36,
                  letterSpacing: p.displayTracking,
                  lineHeight: 1.1,
                  color: "#09090B",
                  marginBottom: 12,
                }}
              >
                Three setups.{" "}
                <span style={{ color: "#2563EB" }}>One mission.</span>
              </div>

              <p
                style={{
                  fontFamily: p.bodyFont,
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "#64748B",
                  maxWidth: 380,
                  marginBottom: 24,
                }}
              >
                Choose from three battle-ready tagger packages. All include 10 taggers, 24hr hire, and free return courier.
              </p>

              {/* Inline card example */}
              <div
                style={{
                  background: "white",
                  borderRadius: 14,
                  padding: "16px 20px",
                  border: "1px solid rgba(0,0,0,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: p.displayFont,
                      fontWeight: p.displayWeight,
                      fontSize: 18,
                      letterSpacing: p.displayTracking,
                      color: "#09090B",
                      marginBottom: 2,
                    }}
                  >
                    Predator
                  </div>
                  <div style={{ fontFamily: p.bodyFont, fontSize: 13, color: "#94A3B8" }}>
                    Foregrip + scope · Ages 8+
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: p.bodyFont, fontSize: 12, color: "#94A3B8", marginBottom: 2 }}>From</div>
                  <div
                    style={{
                      fontFamily: p.displayFont,
                      fontWeight: p.displayWeight,
                      fontSize: 22,
                      color: "#09090B",
                    }}
                  >
                    $649
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ padding: "16px 24px 20px", borderTop: "1px solid #f0f0ee" }}>
              <p style={{ fontFamily: "var(--ft-dm)", fontSize: 13, color: "#64748B", margin: 0 }}>{p.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div style={{ maxWidth: 1200, margin: "40px auto 0", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--ft-dm)", fontSize: 13, color: "#94A3B8" }}>
          Once you pick a favourite, all headings, navs, and UI will be updated globally.
        </p>
      </div>
    </div>
  );
}
