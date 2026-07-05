"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EnquiryModal from "@/components/ui/EnquiryModal";
import { FAQS } from "@/lib/data";

export default function FAQPage() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <Navbar onQuoteClick={() => setQuoteOpen(true)} />
      <main className="min-h-[100dvh] section-cream">
        {/* Header */}
        <div
          className="pt-36 pb-16 px-6 relative overflow-hidden"
          style={{ background: "#09090B" }}
        >
          <img
            src="/images/page_header_faq.jpg"
            alt=""
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.35, zIndex: 0 }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(9,9,11,0.85) 40%, rgba(9,9,11,0.4) 100%)", zIndex: 1 }} />
          <div className="max-w-3xl mx-auto" style={{ position: "relative", zIndex: 2 }}>
            <span
              className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-white/50"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              FAQs
            </span>
            <h1
              className="display-heading text-white mb-4"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Common questions
            </h1>
            <p
              className="text-white/50 leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.0625rem" }}
            >
              Everything you need to know before booking. Still have questions?{" "}
              <a href="tel:1300661565" className="text-white/80 hover:text-white underline">
                Call us on 1300 661 565
              </a>
            </p>
          </div>
        </div>

        {/* FAQ list */}
        <div className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <div key={faq.question} className="card-bezel-outer">
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
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-250"
                      style={{
                        background: openIndex === i ? "var(--blue)" : "rgba(0,0,0,0.06)",
                        transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={openIndex === i ? "white" : "var(--muted)"} strokeWidth="2.5" strokeLinecap="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === i && (
                      <motion.div
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

          {/* CTA */}
          <div
            className="mt-12 p-8 rounded-2xl text-center"
            style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}
          >
            <h3
              className="card-heading text-[var(--ink)] text-lg mb-2"
            >
              Still have questions?
            </h3>
            <p
              className="text-[var(--muted)] text-sm mb-5"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              We&apos;re happy to help. Give us a call or send a message and we&apos;ll reply within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:1300661565" className="btn-blue">
                Call 1300 661 565
              </a>
              <button onClick={() => setQuoteOpen(true)} className="btn-outline">
                Send a message
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <EnquiryModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
