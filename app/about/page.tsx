"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EnquiryModal from "@/components/ui/EnquiryModal";

export default function AboutPage() {
  const [quoteOpen, setQuoteOpen] = useState(false);

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
            src="/images/page_header_about.jpg"
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
              About us
            </span>
            <h1
              className="display-heading text-white mb-4"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              The LT4H story
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
          <div className="flex flex-col gap-12">
            {/* Story */}
            <div>
              <h2
                className="section-heading text-[var(--ink)] mb-6"
                style={{ fontSize: "1.75rem" }}
              >
                Laser tag for everyone, anywhere
              </h2>
              <div
                className="flex flex-col gap-4 text-[var(--muted)] leading-relaxed"
                style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.0625rem" }}
              >
                <p>
                  Laser Tag 4 Hire has been bringing the fun since 2007 — before most of our customers were even old enough to hold a tagger. Based in Port Stephens, NSW, we started with a simple idea: laser tag should be something anyone can experience, not just those who live near a venue.
                </p>
                <p>
                  We built our business around the hassle-free model. You shouldn&apos;t have to hire a van, brief your guests on game rules from scratch, or worry about getting your equipment back. That&apos;s all on us.
                </p>
                <p>
                  Over 18 years and 500+ events later, we&apos;re still here — and still just as excited about a great laser tag battle as we were at the beginning.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Equipment-first",
                  description:
                    "We invest in the best taggers available and keep them maintained. Every hire goes out fully charged and tested.",
                },
                {
                  title: "Genuinely easy",
                  description:
                    "We designed the whole hire model to be effortless. Delivery, setup, support and return — all sorted for you.",
                },
                {
                  title: "Safe for all ages",
                  description:
                    "Infrared technology means no pain, no mess, and no risk. Kids as young as 5 play happily alongside adults.",
                },
                {
                  title: "Always on call",
                  description:
                    "We give you our number and we answer it. If something comes up during your event, we&apos;re there.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl"
                  style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}
                >
                  <h3 className="card-heading text-[var(--ink)] text-base mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Contact details */}
            <div
              className="p-8 rounded-2xl"
              style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}
            >
              <h3 className="card-heading text-[var(--ink)] text-lg mb-5">Get in touch</h3>
              <div
                className="flex flex-col gap-3 text-sm text-[var(--muted)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[var(--ink)] w-20">Phone</span>
                  <a href="tel:1300661565" className="hover:text-[var(--blue)] transition-colors">1300 661 565</a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[var(--ink)] w-20">Email</span>
                  <a href="mailto:info@lasertag4hire.com.au" className="hover:text-[var(--blue)] transition-colors">info@lasertag4hire.com.au</a>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-[var(--ink)] w-20">Address</span>
                  <span>PO Box 417, Salamander Bay NSW 2317</span>
                </div>
              </div>
              <div className="flex gap-3 mt-6 flex-wrap">
                <Link href="/packages" className="btn-blue text-sm">
                  View packages
                </Link>
                <button onClick={() => setQuoteOpen(true)} className="btn-outline text-sm">
                  Get a quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <EnquiryModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
