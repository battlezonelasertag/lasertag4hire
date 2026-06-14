"use client";

import Link from "next/link";

export default function FinalCTA({ onQuoteClick }: { onQuoteClick?: () => void }) {
  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, var(--crimson) 0%, #8b0f27 35%, #1e3a8a 70%, var(--blue) 100%)",
      }}
    >
      {/* Angled top edge */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: "80px",
          background: "var(--cream)",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)",
        }}
      />

      {/* Background noise/pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <span
          className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-white/60"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
        >
          Ready to play?
        </span>
        <h2
          className="display-heading text-white mb-6"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
        >
          Book your battle today
        </h2>
        <p
          className="text-white/60 leading-relaxed mb-10 max-w-xl mx-auto"
          style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.125rem" }}
        >
          Equipment arrives ready to play. You run the game. We handle the rest. Booking takes 2 minutes online.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="https://fareharbor.com/embeds/book/lasertag4hire/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-orange"
          >
            Book now — from $549
            <span className="btn-icon-wrap">
              <ArrowIcon />
            </span>
          </Link>
          <button
            onClick={onQuoteClick}
            className="btn-outline-white"
          >
            Get a free quote
          </button>
        </div>

        {/* Trust note */}
        <p
          className="text-white/40 text-xs mt-8"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          No deposit required to enquire · Reply within 24 hours · 4.9★ rated
        </p>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}
