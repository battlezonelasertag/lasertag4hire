"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { FREE_POSTCODES } from "@/lib/data";
import type { ServiceAreaMapProps } from "./ServiceAreaMapInner";

const ServiceAreaMap = dynamic<ServiceAreaMapProps>(
  () => import("./ServiceAreaMapInner"),
  { ssr: false, loading: () => <div style={{ width: "100%", height: "100%", background: "#e8edf2", borderRadius: "inherit" }} /> }
);

const AREAS = [
  "Sydney", "Melbourne",
  "Newcastle", "Canberra / ACT",
  "Hunter Valley", "Central Coast",
  "Wollongong", "Port Stephens",
  "Western Sydney", "Northern Rivers",
];

const SERVED_STATES = ["New South Wales", "Victoria"];

interface NominatimResult {
  lat: string;
  lon: string;
  address?: { postcode?: string; state?: string };
}

export default function ServiceArea() {
  const [query, setQuery]         = useState("");
  const [result, setResult]       = useState<"covered" | "quote" | "not-found" | null>(null);
  const [loading, setLoading]     = useState(false);
  const [pinCoords, setPinCoords]     = useState<[number, number] | null>(null);
  const [pinPostcode, setPinPostcode] = useState("");

  const handleCheck = async () => {
    const q = query.trim();
    if (q.length < 2) return;

    const isPostcode = /^\d{4}$/.test(q);
    setLoading(true);

    try {
      if (isPostcode) {
        const status = FREE_POSTCODES.includes(q) ? "covered" : "quote";
        setResult(status);
        setPinPostcode(q);

        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&postalcode=${q}&countrycodes=AU&limit=1`,
          { headers: { "Accept-Language": "en" } }
        );
        const data: NominatimResult[] = await res.json();
        if (data?.length) {
          setPinCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        }
      } else {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(q + ", Australia")}&countrycodes=AU&limit=5`,
          { headers: { "Accept-Language": "en" } }
        );
        const data: NominatimResult[] = await res.json();

        const best =
          data.find((r) => SERVED_STATES.includes(r.address?.state ?? "")) ?? data[0];

        if (!best?.address?.postcode) {
          setResult("not-found");
          return;
        }

        const pc = best.address.postcode.slice(0, 4);
        const status = FREE_POSTCODES.includes(pc) ? "covered" : "quote";
        setResult(status);
        setPinPostcode(pc);
        setPinCoords([parseFloat(best.lat), parseFloat(best.lon)]);
      }
    } catch {
      // network failure — leave result unchanged
    } finally {
      setLoading(false);
    }
  };

  const canCheck = query.trim().length >= 2 && !loading;

  return (
    <section style={{ background: "var(--sky)", padding: "clamp(64px,9vw,96px) clamp(24px,6vw,96px)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          flexWrap: "wrap", gap: 24, marginBottom: "clamp(32px,4vw,48px)",
        }}>
          <div>
            <span style={{
              display: "inline-flex", alignItems: "center",
              fontFamily: "var(--font-dm-sans)", fontSize: 11, fontWeight: 600,
              letterSpacing: "0.12em", textTransform: "uppercase" as const,
              color: "var(--blue)",
              border: "1px solid rgba(26,95,180,0.2)",
              background: "rgba(26,95,180,0.05)",
              borderRadius: 100, padding: "4px 12px", marginBottom: 12,
            }}>
              Service area
            </span>
            <h2 style={{
              fontFamily: "var(--font-syne)", fontWeight: 700,
              fontSize: "clamp(26px,3vw,42px)", letterSpacing: "-0.025em",
              lineHeight: 1.1, color: "var(--ink)", margin: 0,
            }}>
              We cover NSW and beyond.
            </h2>
          </div>
          <p style={{
            fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.7,
            color: "var(--muted)", margin: 0, maxWidth: "42ch",
          }}>
            Free delivery across the Hunter Valley, Port Stephens, Newcastle and surrounding areas. Regional deliveries available — enter your postcode to check.
          </p>
        </div>

        {/* Main grid: map left (wide), controls right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px]" style={{ gap: "clamp(16px,2vw,24px)", alignItems: "start" }}>

          {/* Map */}
          <div style={{
            height: "clamp(340px,50vw,560px)",
            borderRadius: "1.5rem",
            overflow: "hidden",
            border: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            position: "relative",
            zIndex: 0,
          }}>
            <ServiceAreaMap pinCoords={pinCoords} pinType={result === "not-found" ? null : result} pinPostcode={pinPostcode} />
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Postcode / suburb checker */}
            <div style={{
              background: "white",
              borderRadius: "1.25rem",
              border: "1px solid rgba(0,0,0,0.07)",
              padding: "clamp(20px,2.5vw,28px)",
            }}>
              <h3 style={{
                fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: 18,
                color: "var(--ink)", margin: "0 0 6px",
              }}>
                Is my area covered?
              </h3>
              <p style={{
                fontFamily: "var(--font-dm-sans)", fontSize: 13,
                color: "var(--muted)", margin: "0 0 16px", lineHeight: 1.6,
              }}>
                Enter your suburb or postcode — we&apos;ll drop a pin on the map.
              </p>

              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <input
                  type="text"
                  placeholder="Suburb or postcode"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setResult(null);
                    setPinCoords(null);
                    setPinPostcode("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && canCheck && handleCheck()}
                  style={{
                    flex: 1, padding: "10px 14px",
                    fontFamily: "var(--font-dm-sans)", fontSize: 14,
                    color: "var(--ink)", background: "var(--cream)",
                    border: "1.5px solid rgba(0,0,0,0.1)", borderRadius: "0.625rem",
                    outline: "none",
                  }}
                />
                <button
                  onClick={handleCheck}
                  disabled={!canCheck}
                  style={{
                    padding: "10px 18px",
                    fontFamily: "var(--font-dm-sans)", fontWeight: 600, fontSize: 14,
                    color: "white", background: "var(--blue)",
                    border: "none", borderRadius: "0.625rem", cursor: canCheck ? "pointer" : "default",
                    opacity: canCheck ? 1 : 0.5,
                    transition: "opacity 200ms",
                    whiteSpace: "nowrap",
                  }}
                >
                  {loading ? "…" : "Check"}
                </button>
              </div>

              {/* Result */}
              {result && (
                <div style={{
                  display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 14px",
                  borderRadius: "0.75rem",
                  background: result === "covered"
                    ? "rgba(26,95,180,0.06)"
                    : result === "not-found"
                      ? "rgba(0,0,0,0.04)"
                      : "rgba(245,158,11,0.07)",
                  border: `1px solid ${
                    result === "covered"
                      ? "rgba(26,95,180,0.15)"
                      : result === "not-found"
                        ? "rgba(0,0,0,0.1)"
                        : "rgba(245,158,11,0.2)"
                  }`,
                }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                    background: result === "covered" ? "var(--blue)" : result === "not-found" ? "var(--muted)" : "#f59e0b",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {result === "covered" ? <CheckIcon /> : <InfoIcon />}
                  </span>
                  <div>
                    <div style={{
                      fontFamily: "var(--font-dm-sans)", fontWeight: 700, fontSize: 13,
                      color: result === "covered" ? "var(--blue)" : "var(--ink)",
                      marginBottom: 2,
                    }}>
                      {result === "covered"
                        ? "Free delivery to your area!"
                        : result === "not-found"
                          ? "Suburb not found"
                          : "We can still help"}
                    </div>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>
                      {result === "covered"
                        ? `Postcode ${pinPostcode} is within our free delivery zone. Book online or get a quote.`
                        : result === "not-found"
                          ? "We couldn't find that location. Try a nearby suburb or enter your postcode directly."
                          : `Postcode ${pinPostcode} is outside our free zone — we ship regionally. Contact us for a delivery quote.`}
                    </p>
                  </div>
                </div>
              )}

              <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(0,0,0,0.06)", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--muted)", margin: 0 }}>
                  Or call{" "}
                  <a href="tel:1300661565" style={{ fontWeight: 600, color: "var(--blue)", textDecoration: "none" }}>
                    1300 661 565
                  </a>
                </p>
              </div>
            </div>

            {/* Coverage area list */}
            <div style={{
              background: "white", borderRadius: "1.25rem",
              border: "1px solid rgba(0,0,0,0.07)",
              padding: "clamp(18px,2.5vw,24px)",
            }}>
              <p style={{
                fontFamily: "var(--font-dm-sans)", fontSize: 11, fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase" as const,
                color: "var(--muted)", margin: "0 0 12px",
              }}>
                Free delivery areas
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px" }}>
                {AREAS.map((area) => (
                  <div key={area} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{
                      width: 5, height: 5, borderRadius: "50%",
                      background: "var(--blue)", flexShrink: 0,
                    }} />
                    <span style={{
                      fontFamily: "var(--font-dm-sans)", fontSize: 13,
                      color: "var(--ink)", lineHeight: 1.4,
                    }}>
                      {area}
                    </span>
                  </div>
                ))}
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
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}
