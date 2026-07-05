"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FAQS } from "@/lib/data";

const PREVIEW_FAQS = FAQS.slice(0, 5);

export default function FAQPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          {/* Left: Header */}
          <div className="lg:sticky lg:top-32">
            <h2
              className="section-heading text-[var(--ink)] mb-4"
              style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)" }}
            >
              Everything you need to know
            </h2>
            <p
              className="text-[var(--muted)] leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.0625rem" }}
            >
              We&apos;ve covered the most common questions below. Can&apos;t find what you&apos;re looking for? Give us a call.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/faq" className="btn-outline inline-flex w-fit">
                See all FAQs
                <span className="btn-icon-wrap" style={{ background: "rgba(37,99,235,0.1)" }}>
                  <ArrowIcon />
                </span>
              </Link>
              <a
                href="tel:1300661565"
                className="text-sm text-[var(--muted)] hover:text-[var(--blue)] transition-colors duration-200 flex items-center gap-2"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                <PhoneIcon />
                1300 661 565
              </a>
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="flex flex-col gap-2">
            {PREVIEW_FAQS.map((faq, i) => (
              <div
                key={faq.question}
                className="card-bezel-outer"
              >
                <div className="card-bezel-inner">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                    style={{ background: "transparent", border: "none", cursor: "pointer" }}
                  >
                    <span
                      className="text-sm font-semibold text-[var(--ink)] pr-4"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {faq.question}
                    </span>
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-250"
                      style={{
                        background: openIndex === i ? "var(--blue)" : "rgba(0,0,0,0.06)",
                        transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      <PlusIcon active={openIndex === i} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === i && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div
                          className="px-6 pb-5 text-sm text-[var(--muted)] leading-relaxed"
                          style={{ fontFamily: "var(--font-dm-sans)" }}
                        >
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PlusIcon({ active }: { active: boolean }) {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={active ? "white" : "var(--muted)"} strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .99h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}
