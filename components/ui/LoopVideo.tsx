"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type LoopVideoProps = {
  /** Path without extension. Expects `${src}.mp4` and `${src}-poster.jpg` in /public. */
  src: string;
  /** Describes what the clip shows. Omit for purely decorative footage. */
  label?: string;
  /** Extra gate on playback, e.g. only the selected item in a switcher. */
  active?: boolean;
  /** Rewind when deactivated so the clip explains itself from the start next time. */
  restartOnActive?: boolean;
  className?: string;
  style?: CSSProperties;
};

/**
 * Short silent loop that plays only while on screen (and active).
 * Holds on the poster frame for reduced-motion users, and loads nothing until first needed.
 */
export default function LoopVideo({
  src,
  label,
  active = true,
  restartOnActive = false,
  className,
  style,
}: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useRef(false);
  const activeRef = useRef(active);
  const sync = useRef<() => void>(() => {});

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    sync.current = () => {
      if (inView.current && activeRef.current && !reduceMotion.matches) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };
    const onMotionChange = () => sync.current();

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        sync.current();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    reduceMotion.addEventListener("change", onMotionChange);

    return () => {
      observer.disconnect();
      reduceMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  useEffect(() => {
    activeRef.current = active;
    if (!active && restartOnActive && ref.current) ref.current.currentTime = 0;
    sync.current();
  }, [active, restartOnActive]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={`${src}-poster.jpg`}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={className}
      style={style}
    >
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
}
