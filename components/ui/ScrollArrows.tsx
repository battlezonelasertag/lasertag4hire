"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Paged arrows for a horizontal `.scroll-strip`.
 *
 * Render inside a `position: relative` wrapper that sits *outside* any
 * `overflow: hidden`, and pass `bleed` when the strip extends past that wrapper
 * (e.g. `-mx-6` → `bleed={24}`) so the buttons straddle the edge where cards clip.
 * `resetKey` re-binds the listeners when the strip element is replaced.
 */
export default function ScrollArrows({
  containerRef,
  bleed = 0,
  resetKey,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
  bleed?: number;
  resetKey?: string | number;
}) {
  const [canLeft, setCanLeft] = useState(false);
  // Starts visible so the affordance paints before measurement, and survives a
  // browser that reports stale scroll metrics on first layout.
  const [canRight, setCanRight] = useState(true);

  const getStrip = useCallback(
    () => containerRef.current?.querySelector<HTMLElement>(".scroll-strip") ?? null,
    [containerRef]
  );

  const sync = useCallback(() => {
    const el = getStrip();
    if (!el) return;
    // A padded strip rests at scrollLeft === its padding, not 0.
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > pad + 8);
    setCanRight(maxScroll > pad + 8 && el.scrollLeft < maxScroll - pad - 8);
  }, [getStrip]);

  useEffect(() => {
    const el = getStrip();
    if (!el) return;
    sync();
    const settle = window.setTimeout(sync, 400);
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    window.addEventListener("load", sync);
    return () => {
      window.clearTimeout(settle);
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      window.removeEventListener("load", sync);
    };
  }, [sync, getStrip, resetKey]);

  const page = (direction: 1 | -1) => {
    const el = getStrip();
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const amount = first ? first.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <>
      <Arrow direction="left" bleed={bleed} visible={canLeft} onClick={() => page(-1)} />
      <Arrow direction="right" bleed={bleed} visible={canRight} onClick={() => page(1)} />
    </>
  );
}

function Arrow({
  direction,
  bleed,
  visible,
  onClick,
}: {
  direction: "left" | "right";
  bleed: number;
  visible: boolean;
  onClick: () => void;
}) {
  const offset = -(bleed + 26);
  return (
    <button
      onClick={onClick}
      aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
      tabIndex={visible ? 0 : -1}
      className="hidden sm:flex items-center justify-center hover:brightness-110"
      style={{
        position: "absolute",
        // 50% of the wrapper sits below the card midpoint because the strip
        // carries bottom padding for its hidden scrollbar.
        top: "calc(50% - 4px)",
        left: direction === "left" ? offset : undefined,
        right: direction === "right" ? offset : undefined,
        transform: "translateY(-50%)",
        width: 52,
        height: 52,
        borderRadius: "50%",
        background: "var(--crimson)",
        border: "none",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        boxShadow: "0 6px 22px rgba(220,49,41,0.4)",
        transition: "opacity 0.25s cubic-bezier(0.23, 1, 0.32, 1), filter 0.2s",
        zIndex: 20,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {direction === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  );
}
