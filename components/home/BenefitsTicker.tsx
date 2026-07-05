const BENEFITS = [
  "Delivery included",
  "No deposit required",
  "Live phone support 7 days",
  "Ages 5 and up",
  "Saturday hire includes Sunday",
  "Fully charged on arrival",
  "Set up in under 10 minutes",
  "100m outdoor range",
  "12hr battery life",
  "500+ events since 2007",
  "Free return courier",
  "10 taggers per kit",
];

const SEP = (
  <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden="true" style={{ flexShrink: 0 }}>
    <rect x="1" y="1" width="4" height="4" transform="rotate(45 3 3)" fill="var(--crimson)" />
  </svg>
);

export default function BenefitsTicker() {
  const items = [...BENEFITS, ...BENEFITS];

  return (
    <div
      style={{
        background: "var(--cream)",
        borderTop: "1px solid rgba(0,0,0,0.07)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        overflow: "hidden",
        padding: "14px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "max-content",
          animation: "marquee 40s linear infinite",
        }}
      >
        {items.map((benefit, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 28,
              paddingRight: 28,
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 500,
                fontSize: "clamp(12px, 1vw, 14px)",
                color: "var(--ink)",
                letterSpacing: "-0.01em",
              }}
            >
              {benefit}
            </span>
            {SEP}
          </div>
        ))}
      </div>
    </div>
  );
}
