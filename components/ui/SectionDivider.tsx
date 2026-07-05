const PATHS = {
  // Jagged sawtooth — fractured, high-energy
  organic: {
    back:  "M0,48 L200,16 L380,54 L580,10 L780,46 L980,14 L1160,48 L1320,18 L1440,36 L1440,90 L0,90 Z",
    front: "M0,62 L240,34 L440,66 L640,26 L840,60 L1040,28 L1220,62 L1380,36 L1440,50 L1440,90 L0,90 Z",
  },
  // Clean diagonal slash — decisive, bold
  wave: {
    back:  "M0,46 L1440,14 L1440,90 L0,90 Z",
    front: "M0,60 L1440,28 L1440,90 L0,90 Z",
  },
  // Chevron V — structured, directional
  splash: {
    back:  "M0,22 L480,66 L960,16 L1440,54 L1440,90 L0,90 Z",
    front: "M0,36 L480,80 L960,30 L1440,68 L1440,90 L0,90 Z",
  },
};

interface SectionDividerProps {
  from: string;
  to: string;
  variant?: keyof typeof PATHS;
  flip?: boolean;
  height?: number;
}

export default function SectionDivider({
  from,
  to,
  variant = "organic",
  flip = false,
  height = 90,
}: SectionDividerProps) {
  const { back, front } = PATHS[variant];

  return (
    <div
      aria-hidden="true"
      style={{
        background: from,
        lineHeight: 0,
        overflow: "hidden",
        transform: flip ? "scaleX(-1)" : undefined,
      }}
    >
      <svg
        viewBox={`0 0 1440 ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height }}
      >
        <path d={back} fill={to} opacity={0.35} />
        <path d={front} fill={to} />
      </svg>
    </div>
  );
}
