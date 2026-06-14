"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PackageConfigurator from "@/components/packages/PackageConfigurator";
import EnquiryModal from "@/components/ui/EnquiryModal";

export default function PackagesPage() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
      <Navbar onQuoteClick={() => setQuoteOpen(true)} />
      <main className="min-h-[100dvh] section-cream">
        {/* Hero */}
        <div
          className="pt-36 pb-16 px-6"
          style={{
            background: "linear-gradient(135deg, #0C1B3A 0%, #09090B 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto">
            <span
              className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-white/50"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              Build your setup
            </span>
            <h1
              className="display-heading text-white mb-4"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Pick your package
            </h1>
            <p
              className="text-white/50 max-w-xl leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.0625rem" }}
            >
              Choose your tagger type, set your player count, add any extras. We&apos;ll confirm everything within 24 hours.
            </p>
          </div>
        </div>

        {/* Configurator */}
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <PackageConfigurator />
        </div>

        {/* What&apos;s included */}
        <div
          className="border-t py-16 px-6"
          style={{ borderColor: "rgba(0,0,0,0.07)" }}
        >
          <div className="max-w-7xl mx-auto">
            <h2
              className="section-heading text-[var(--ink)] mb-8"
              style={{ fontSize: "1.75rem" }}
            >
              Every package includes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: "Free delivery",
                  desc: "Equipment arrives 2 business days before your event, fully charged.",
                },
                {
                  title: "Prepaid return",
                  desc: "We book the courier pickup. You just need to pack it up.",
                },
                {
                  title: "Phone support",
                  desc: "We&apos;re on the line during your event if anything comes up.",
                },
                {
                  title: "Saturday + Sunday free",
                  desc: "Saturday booking? Keep the kit through Sunday at no extra cost.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-2xl"
                  style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}
                >
                  <div
                    className="w-2 h-2 rounded-full mb-3"
                    style={{ background: "var(--blue)" }}
                  />
                  <h3
                    className="card-heading text-[var(--ink)] text-sm mb-1"
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-xs text-[var(--muted)] leading-relaxed"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                    dangerouslySetInnerHTML={{ __html: item.desc }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <EnquiryModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
