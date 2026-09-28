"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EnquiryModal from "@/components/ui/EnquiryModal";

// Unlisted: shared by link only (see layout.tsx for the noindex metadata).
const FACTS = [
  { value: "100 m", label: "Outdoor range" },
  { value: "12+ hr", label: "Battery life" },
  { value: "10", label: "Taggers per kit" },
];

export default function ShowreelPage() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
      <Navbar onQuoteClick={() => setQuoteOpen(true)} />
      <main className="min-h-[100dvh] section-dark">
        <section
          className="max-w-6xl mx-auto px-6"
          style={{ paddingTop: "calc(var(--nav-h-top, 116px) + 40px)", paddingBottom: "clamp(64px, 9vw, 120px)" }}
        >
          <p className="eyebrow text-white/55 mb-4">Predator showreel</p>
          <h1 className="display-heading text-white mb-5" style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}>
            The Predator in 40 seconds
          </h1>
          <p
            className="text-white/65 leading-relaxed max-w-[56ch] mb-10"
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(1rem, 1.3vw, 1.125rem)" }}
          >
            Our flagship tagger, from the red-dot scope to the sensors built into the body. Best with the sound on.
          </p>

          <div
            className="overflow-hidden rounded-[1.5rem]"
            style={{ background: "#000", boxShadow: "0 30px 90px -30px rgba(37,99,235,0.45)" }}
          >
            <video
              controls
              playsInline
              preload="metadata"
              poster="/video/predator-showreel-poster.jpg"
              aria-label="Showreel of the Predator laser tagger: a 3D model firing, the red-dot scope, status screen and sensors, a 100 metre range test, and blue and red taggers facing off"
              className="block w-full"
              style={{ aspectRatio: "16 / 9", background: "#000" }}
            >
              <source src="/video/predator-showreel.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <dl className="grid grid-cols-3 gap-6 md:gap-12">
              {FACTS.map((fact) => (
                <div key={fact.label} className="flex flex-col-reverse gap-1">
                  <dt className="eyebrow text-white/50" style={{ fontSize: "0.75rem" }}>
                    {fact.label}
                  </dt>
                  <dd className="section-heading text-white" style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)" }}>
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-3">
              <Link href="/packages/predator" className="btn-outline-white">
                See the Predator kit
              </Link>
              <Link
                href="https://fareharbor.com/embeds/book/lasertag4hire/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-orange"
              >
                Book now
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <EnquiryModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
