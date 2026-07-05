"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { number: 500, suffix: "+", label: "Events run" },
  { number: 18,  suffix: " yrs", label: "In business" },
  { number: 4.9, suffix: "★", label: "Customer rating" },
  { number: 12,  suffix: "hr", label: "Battery life" },
];

function useCountUp(target: number, duration = 1600, active = false) {
  const [count, setCount] = useState(0);
  const frame = useRef<number>(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const isFloat = target % 1 !== 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      const val = eased * target;
      setCount(isFloat ? Math.round(val * 10) / 10 : Math.floor(val));
      if (p < 1) frame.current = requestAnimationFrame(tick);
      else setCount(target);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [active, target, duration]);
  return count;
}

function StatItem({ stat, active }: { stat: typeof STATS[0]; active: boolean }) {
  const count = useCountUp(stat.number, 1600, active);
  const display = stat.number % 1 !== 0 ? count.toFixed(1) : count.toString();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "clamp(32px, 4vw, 52px) clamp(24px, 3vw, 48px)",
        borderRight: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-syne)",
          fontWeight: 700,
          fontSize: "clamp(52px, 7vw, 96px)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "white",
          tabularNums: "tabular-nums",
        } as React.CSSProperties}
      >
        {display}
        <span style={{ color: "rgba(255,255,255,0.5)" }}>{stat.suffix}</span>
      </span>
      <span
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "clamp(12px, 1.1vw, 14px)",
          color: "rgba(255,255,255,0.45)",
          letterSpacing: "0.06em",
          marginTop: 8,
        }}
      >
        {stat.label}
      </span>
    </div>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setActive(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ background: "var(--blue)" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {STATS.map((stat) => (
          <StatItem key={stat.label} stat={stat} active={active} />
        ))}
      </div>
    </div>
  );
}
