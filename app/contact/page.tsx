"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  postcode: string;
  packageInterest: string;
  playerCount: string;
  message: string;
}

const EMPTY_FORM: FormData = {
  firstName: "", lastName: "", email: "", phone: "",
  eventDate: "", eventType: "", postcode: "",
  packageInterest: "", playerCount: "", message: "",
};

const EVENT_TYPES = [
  "Birthday party", "School / vacation care", "Corporate team day",
  "Community / council event", "Sports team", "Other",
];

const PACKAGE_OPTIONS = [
  "Bolter — no scope ($549)", "Bolter — with scope ($599)",
  "Predator ($649)", "Not sure yet",
];

export default function ContactPage() {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setForm(EMPTY_FORM);
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-[100dvh] section-cream">
        {/* Header */}
        <div
          className="pt-36 pb-16 px-6"
          style={{ background: "linear-gradient(135deg, #0C1B3A 0%, #09090B 100%)" }}
        >
          <div className="max-w-3xl mx-auto">
            <span
              className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-white/50"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              Contact
            </span>
            <h1
              className="display-heading text-white mb-4"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Get in touch
            </h1>
            <p className="text-white/50 leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.0625rem" }}>
              We reply within 24 hours. For urgent enquiries, call{" "}
              <a href="tel:1300661565" className="text-white/80 underline hover:text-white">1300 661 565</a>.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
            {/* Form */}
            <div>
              {status === "success" ? (
                <div
                  className="p-10 rounded-2xl text-center"
                  style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: "rgba(37,99,235,0.1)" }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h2 className="card-heading text-[var(--ink)] text-xl mb-2">Message sent!</h2>
                  <p className="text-[var(--muted)] text-sm" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    We&apos;ll be in touch within 24 hours. Check your inbox for a confirmation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-[var(--ink)]" style={{ fontFamily: "var(--font-dm-sans)" }}>First name *</span>
                      <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required placeholder="Jane" className="form-input" />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-[var(--ink)]" style={{ fontFamily: "var(--font-dm-sans)" }}>Last name *</span>
                      <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Smith" className="form-input" />
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-[var(--ink)]" style={{ fontFamily: "var(--font-dm-sans)" }}>Email *</span>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="jane@example.com" className="form-input" />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-[var(--ink)]" style={{ fontFamily: "var(--font-dm-sans)" }}>Phone</span>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="04XX XXX XXX" className="form-input" />
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-[var(--ink)]" style={{ fontFamily: "var(--font-dm-sans)" }}>Event date *</span>
                      <input type="date" name="eventDate" value={form.eventDate} onChange={handleChange} required className="form-input" />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-[var(--ink)]" style={{ fontFamily: "var(--font-dm-sans)" }}>Postcode *</span>
                      <input type="text" name="postcode" value={form.postcode} onChange={handleChange} required maxLength={4} placeholder="2317" className="form-input" />
                    </label>
                  </div>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold text-[var(--ink)]" style={{ fontFamily: "var(--font-dm-sans)" }}>Event type *</span>
                    <select name="eventType" value={form.eventType} onChange={handleChange} required className="form-input">
                      <option value="">Select event type</option>
                      {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-[var(--ink)]" style={{ fontFamily: "var(--font-dm-sans)" }}>Package interest</span>
                      <select name="packageInterest" value={form.packageInterest} onChange={handleChange} className="form-input">
                        <option value="">Not sure yet</option>
                        {PACKAGE_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-[var(--ink)]" style={{ fontFamily: "var(--font-dm-sans)" }}>Number of players</span>
                      <input type="number" name="playerCount" value={form.playerCount} onChange={handleChange} min={1} placeholder="e.g. 14" className="form-input" />
                    </label>
                  </div>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold text-[var(--ink)]" style={{ fontFamily: "var(--font-dm-sans)" }}>Message</span>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Tell us about your event..." className="form-input resize-none" />
                  </label>
                  {status === "error" && (
                    <p className="text-sm text-red-600" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      Something went wrong. Please try again or call 1300 661 565.
                    </p>
                  )}
                  <button type="submit" disabled={status === "sending"} className="btn-orange py-3.5 disabled:opacity-60">
                    {status === "sending" ? "Sending..." : "Send message"}
                  </button>
                </form>
              )}
            </div>

            {/* Contact details sidebar */}
            <div className="flex flex-col gap-4">
              {[
                { icon: "📞", label: "Phone", value: "1300 661 565", href: "tel:1300661565" },
                { icon: "✉️", label: "Email", value: "info@lasertag4hire.com.au", href: "mailto:info@lasertag4hire.com.au" },
                { icon: "📮", label: "Postal address", value: "PO Box 417, Salamander Bay NSW 2317", href: null },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-5 rounded-2xl"
                  style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}
                >
                  <div className="text-xs font-semibold text-[var(--muted)] mb-1 uppercase tracking-wide" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    {item.label}
                  </div>
                  {item.href ? (
                    <a href={item.href} className="text-sm font-medium text-[var(--blue)] hover:underline" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-[var(--ink)]" style={{ fontFamily: "var(--font-dm-sans)" }}>{item.value}</p>
                  )}
                </div>
              ))}

              <div
                className="p-5 rounded-2xl"
                style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.15)" }}
              >
                <div className="text-xs font-semibold text-[var(--blue)] mb-1" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  Response time
                </div>
                <p className="text-sm text-[var(--ink)]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  We reply to all enquiries within 24 hours, usually much sooner on business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
