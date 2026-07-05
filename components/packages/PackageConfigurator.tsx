"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PACKAGES, ADD_ONS } from "@/lib/data";

const PACKAGE_IMAGES: Record<string, string> = {
  "bolter-no-scope": "/images/package-option-bolter-no-scope.jpg",
  "bolter-scope":    "/images/package-option-bolter-scope.jpg",
  "predator":        "/images/package-option-predator.jpg",
};
import type { ConfiguratorState } from "@/lib/types";
import EnquiryModal from "@/components/ui/EnquiryModal";

const EXTRA_TAGGER_PRICE = 60;
const BUNKER_PRICE = 80;

function calcTotal(state: ConfiguratorState): number {
  const pkg = PACKAGES.find((p) => p.id === state.packageId);
  if (!pkg) return 0;
  const extraGroups = Math.max(0, Math.floor((state.taggerCount - 10) / 4));
  const bunker = state.addBunkers ? BUNKER_PRICE : 0;
  return pkg.price + extraGroups * EXTRA_TAGGER_PRICE + bunker;
}

export default function PackageConfigurator() {
  const [config, setConfig] = useState<ConfiguratorState>({
    packageId: "predator",
    taggerCount: 10,
    addBunkers: false,
  });
  const [quoteOpen, setQuoteOpen] = useState(false);

  const selectedPkg = PACKAGES.find((p) => p.id === config.packageId)!;
  const total = calcTotal(config);

  const increment = useCallback(() => {
    setConfig((prev) => ({ ...prev, taggerCount: prev.taggerCount + 4 }));
  }, []);

  const decrement = useCallback(() => {
    setConfig((prev) => ({
      ...prev,
      taggerCount: Math.max(10, prev.taggerCount - 4),
    }));
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
        {/* Left: configuration steps */}
        <div className="flex flex-col gap-8">
          {/* Step 1 */}
          <ConfigStep number="01" title="Choose your tagger">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PACKAGES.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setConfig((prev) => ({ ...prev, packageId: pkg.id }))}
                  className="text-left transition-all duration-250"
                  style={{ background: "transparent", border: "none", padding: 0 }}
                >
                  <div
                    className="card-bezel-outer"
                    style={{
                      boxShadow:
                        config.packageId === pkg.id
                          ? "0 0 0 2px var(--blue)"
                          : "none",
                    }}
                  >
                    <div className="card-bezel-inner p-5 relative">
                      {/* Package image */}
                      <div
                        className="rounded-xl overflow-hidden mb-4"
                        style={{ height: 120 }}
                      >
                        <img
                          src={PACKAGE_IMAGES[pkg.id]}
                          alt={pkg.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                        />
                      </div>

                      {pkg.badge && (
                        <span
                          className="eyebrow inline-block px-2.5 py-1 rounded-full mb-3 text-[var(--blue)]"
                          style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.15)" }}
                        >
                          {pkg.badge}
                        </span>
                      )}

                      {/* Selection indicator */}
                      <div
                        className="absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                        style={{
                          borderColor: config.packageId === pkg.id ? "var(--blue)" : "rgba(0,0,0,0.15)",
                          background: config.packageId === pkg.id ? "var(--blue)" : "transparent",
                        }}
                      >
                        {config.packageId === pkg.id && (
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>

                      <h3 className="card-heading text-[var(--ink)] text-base mb-0.5">
                        {pkg.name}
                      </h3>
                      <p className="text-[var(--muted)] text-xs mb-4" style={{ fontFamily: "var(--font-dm-sans)" }}>
                        {pkg.tagline}
                      </p>

                      <div className="flex flex-col gap-1.5 mb-4">
                        {[
                          { label: "Weight", value: pkg.weight },
                          { label: "Range", value: pkg.range },
                          { label: "Best for", value: pkg.ageRange },
                        ].map((spec) => (
                          <div key={spec.label} className="flex items-center justify-between">
                            <span className="text-xs text-[var(--muted)]" style={{ fontFamily: "var(--font-dm-sans)" }}>{spec.label}</span>
                            <span className="text-xs font-semibold text-[var(--ink)]" style={{ fontFamily: "var(--font-dm-sans)" }}>{spec.value}</span>
                          </div>
                        ))}
                      </div>

                      <div
                        className="text-xl font-bold text-[var(--ink)]"
                        style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}
                      >
                        ${pkg.price}
                        <span className="text-xs font-normal text-[var(--muted)] ml-1" style={{ fontFamily: "var(--font-dm-sans)" }}>
                          base
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ConfigStep>

          {/* Step 2 */}
          <ConfigStep number="02" title="How many taggers?">
            <div className="card-bezel-outer">
              <div className="card-bezel-inner p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div
                      className="text-4xl font-bold text-[var(--ink)]"
                      style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}
                    >
                      {config.taggerCount}
                    </div>
                    <div
                      className="text-sm text-[var(--muted)]"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      taggers
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={decrement}
                      disabled={config.taggerCount <= 10}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-30"
                      style={{
                        background: "var(--sky)",
                        border: "1.5px solid rgba(37,99,235,0.2)",
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                    <button
                      onClick={increment}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                      style={{
                        background: "var(--blue)",
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div
                  className="text-xs text-[var(--muted)] flex items-center gap-1.5"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  Minimum 10. Extra groups of 4 from ${EXTRA_TAGGER_PRICE} each.
                </div>
              </div>
            </div>
          </ConfigStep>

          {/* Step 3 */}
          <ConfigStep number="03" title="Add inflatable bunkers?">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { value: false, label: "No bunkers", description: "Use natural cover — furniture, trees, walls" },
                { value: true, label: "Yes please", description: "Pop-up tactical bunkers delivered with your kit" },
              ].map((opt) => (
                <button
                  key={String(opt.value)}
                  onClick={() => setConfig((prev) => ({ ...prev, addBunkers: opt.value }))}
                  style={{ background: "transparent", border: "none", padding: 0, textAlign: "left" }}
                >
                  <div
                    className="card-bezel-outer"
                    style={{
                      boxShadow:
                        config.addBunkers === opt.value
                          ? "0 0 0 2px var(--blue)"
                          : "none",
                    }}
                  >
                    <div className="card-bezel-inner p-5 flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200"
                        style={{
                          borderColor: config.addBunkers === opt.value ? "var(--blue)" : "rgba(0,0,0,0.15)",
                          background: config.addBunkers === opt.value ? "var(--blue)" : "transparent",
                        }}
                      >
                        {config.addBunkers === opt.value && (
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="card-heading text-[var(--ink)] text-sm mb-0.5">{opt.label}</div>
                        <div className="text-xs text-[var(--muted)]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                          {opt.description}
                        </div>
                        {opt.value && (
                          <div className="text-xs font-semibold text-[var(--blue)] mt-1.5" style={{ fontFamily: "var(--font-dm-sans)" }}>
                            +${BUNKER_PRICE}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-xs text-[var(--muted)] mt-3" style={{ fontFamily: "var(--font-dm-sans)" }}>
              Bunker pricing is indicative — final quote confirmed on enquiry.
            </p>
          </ConfigStep>
        </div>

        {/* Right: Sticky summary panel */}
        <div className="lg:sticky lg:top-28">
          <StickyPanel
            config={config}
            total={total}
            onQuote={() => setQuoteOpen(true)}
          />
        </div>
      </div>

      <EnquiryModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}

function ConfigStep({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <span
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
          style={{ background: "var(--blue)", fontFamily: "var(--font-syne)" }}
        >
          {number}
        </span>
        <h3
          className="card-heading text-[var(--ink)] text-lg"
        >
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function StickyPanel({
  config,
  total,
  onQuote,
}: {
  config: ConfiguratorState;
  total: number;
  onQuote: () => void;
}) {
  const pkg = PACKAGES.find((p) => p.id === config.packageId)!;

  return (
    <div className="card-bezel-outer">
      <div className="card-bezel-inner p-6 flex flex-col gap-5">
        <div>
          <div
            className="text-xs uppercase tracking-widest text-[var(--muted)] mb-3"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Your setup
          </div>

          {/* Line items */}
          <div className="flex flex-col gap-3">
            <LineItem
              label={`${pkg.name} — ${pkg.tagline}`}
              value={`$${pkg.price}`}
            />
            {config.taggerCount > 10 && (
              <LineItem
                label={`+${config.taggerCount - 10} extra taggers`}
                value={`$${Math.floor((config.taggerCount - 10) / 4) * 60}`}
              />
            )}
            {config.addBunkers && (
              <LineItem label="Inflatable bunkers" value="$80*" />
            )}
            <LineItem label="Delivery + return courier" value="Included" isIncluded />
            <LineItem label="Phone support" value="Included" isIncluded />
            {config.packageId === "bolter-scope" || config.packageId === "predator" ? (
              <LineItem label="Saturday + Sunday free" value="Included" isIncluded />
            ) : null}
          </div>

          {/* Divider */}
          <div
            className="border-t my-4"
            style={{ borderColor: "rgba(0,0,0,0.07)" }}
          />

          {/* Total */}
          <div className="flex items-center justify-between">
            <span
              className="text-sm font-semibold text-[var(--ink)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Estimated total
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={total}
                initial={{ y: -6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 6, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                className="text-2xl font-bold text-[var(--ink)]"
                style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}
              >
                ${total}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <Link
            href="https://fareharbor.com/embeds/book/lasertag4hire/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-crimson w-full text-center py-3.5"
          >
            Book this setup
            <span className="btn-icon-wrap">
              <ArrowIcon />
            </span>
          </Link>
          <button
            onClick={onQuote}
            className="btn-outline w-full py-3.5"
          >
            Request a custom quote
          </button>
        </div>

        <p
          className="text-xs text-[var(--muted)] text-center"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          *Bunker pricing confirmed on enquiry. No deposit to request a quote.
        </p>
      </div>
    </div>
  );
}

function LineItem({
  label,
  value,
  isIncluded,
}: {
  label: string;
  value: string;
  isIncluded?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span
        className="text-sm text-[var(--muted)] flex items-center gap-1.5"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {isIncluded && (
          <span
            className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(37,99,235,0.15)" }}
          >
            <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        )}
        {label}
      </span>
      <span
        className="text-sm font-semibold whitespace-nowrap"
        style={{
          fontFamily: "var(--font-dm-sans)",
          color: isIncluded ? "var(--blue)" : "var(--ink)",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}
