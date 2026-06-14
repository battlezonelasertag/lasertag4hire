"use client";

import { useState } from "react";
import { FREE_POSTCODES } from "@/lib/data";

export default function ServiceArea() {
  const [postcode, setPostcode] = useState("");
  const [result, setResult] = useState<"covered" | "quote" | null>(null);

  const handleCheck = () => {
    if (postcode.length !== 4) return;
    setResult(FREE_POSTCODES.includes(postcode) ? "covered" : "quote");
  };

  return (
    <section className="section-sky py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <span
              className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-[var(--blue)]"
              style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.15)" }}
            >
              Service area
            </span>
            <h2
              className="section-heading text-[var(--ink)] mb-4"
              style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)" }}
            >
              We cover NSW and beyond
            </h2>
            <p
              className="text-[var(--muted)] leading-relaxed mb-6"
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.0625rem" }}
            >
              Free delivery across the Hunter Valley, Port Stephens, Newcastle, and surrounding areas. Regional and metro areas available — contact us for a quote.
            </p>

            {/* Coverage areas */}
            <div className="grid grid-cols-2 gap-2 mb-8">
              {[
                "Port Stephens",
                "Newcastle",
                "Hunter Valley",
                "Maitland",
                "Cessnock",
                "Raymond Terrace",
                "Nelson Bay",
                "Forster / Tuncurry",
              ].map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-2 text-sm text-[var(--ink)]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "var(--blue)" }}
                  />
                  {area}
                </div>
              ))}
            </div>

            <p
              className="text-xs text-[var(--muted)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Outside these areas? We&apos;ll quote on delivery — we ship nationally and regional deliveries are often available.
            </p>
          </div>

          {/* Right: Postcode checker */}
          <div>
            <div className="card-bezel-outer">
              <div className="card-bezel-inner p-8">
                <h3
                  className="card-heading text-[var(--ink)] text-xl mb-2"
                >
                  Is my area covered?
                </h3>
                <p
                  className="text-[var(--muted)] text-sm mb-6"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Enter your postcode to check free delivery eligibility.
                </p>

                <div className="flex gap-3 mb-4">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="e.g. 2317"
                    value={postcode}
                    onChange={(e) => {
                      setPostcode(e.target.value.replace(/\D/g, ""));
                      setResult(null);
                    }}
                    className="flex-1 px-4 py-3 rounded-xl border text-[var(--ink)] text-sm outline-none transition-all duration-200"
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      border: "1.5px solid rgba(0,0,0,0.12)",
                      borderRadius: "0.625rem",
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                  />
                  <button
                    onClick={handleCheck}
                    className="btn-blue px-5 py-3 text-sm"
                  >
                    Check
                  </button>
                </div>

                {/* Result */}
                {result && (
                  <div
                    className="flex items-start gap-3 p-4 rounded-xl"
                    style={{
                      background: result === "covered" ? "rgba(37,99,235,0.06)" : "rgba(249,115,22,0.06)",
                      border: result === "covered" ? "1px solid rgba(37,99,235,0.2)" : "1px solid rgba(249,115,22,0.2)",
                    }}
                  >
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: result === "covered" ? "var(--blue)" : "var(--orange)" }}
                    >
                      {result === "covered" ? <CheckIcon /> : <InfoIcon />}
                    </span>
                    <div>
                      <div
                        className="text-sm font-semibold mb-0.5"
                        style={{
                          fontFamily: "var(--font-dm-sans)",
                          color: result === "covered" ? "var(--blue)" : "var(--ink)",
                        }}
                      >
                        {result === "covered"
                          ? "Free delivery to your area!"
                          : "We can still help"}
                      </div>
                      <p
                        className="text-xs text-[var(--muted)]"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        {result === "covered"
                          ? `Postcode ${postcode} is covered under free delivery. Book online or get a quote.`
                          : `Postcode ${postcode} is outside our free zone, but we ship regionally. Contact us for a delivery quote.`}
                      </p>
                    </div>
                  </div>
                )}

                {/* Contact */}
                <div
                  className="mt-6 pt-6 border-t"
                  style={{ borderColor: "rgba(0,0,0,0.06)" }}
                >
                  <p
                    className="text-xs text-[var(--muted)] text-center"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    Or call us on{" "}
                    <a
                      href="tel:1300661565"
                      className="font-semibold text-[var(--blue)] hover:underline"
                    >
                      1300 661 565
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}
