"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/data";

function useCountUp(target: number, duration: number = 1800, active: boolean = false) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const startTime = performance.now();
    const isDecimal = target % 1 !== 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Strong ease-out
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = eased * target;
      setCount(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [active, target, duration]);

  return count;
}

function StatItem({ stat, active }: { stat: typeof STATS[0]; active: boolean }) {
  const count = useCountUp(stat.numeric, 1600, active);
  const isDecimal = stat.numeric % 1 !== 0;
  const display = isDecimal ? count.toFixed(1) : count.toString();

  return (
    <div className="flex flex-col items-center text-center px-6 py-2">
      <div
        className="text-3xl lg:text-4xl font-bold text-white mb-1 tabular-nums"
        style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}
      >
        {display}
        <span className="text-white/60">{stat.suffix}</span>
      </div>
      <div
        className="text-sm text-blue-200/70"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {stat.label}
      </div>
    </div>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="section-blue"
    >
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 divide-x divide-white/10">
          {STATS.map((stat) => (
            <StatItem key={stat.label} stat={stat} active={active} />
          ))}
        </div>
      </div>
    </div>
  );
}
