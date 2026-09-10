"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  eventDate: "",
  eventType: "",
  postcode: "",
  packageInterest: "",
  playerCount: "",
  message: "",
};

const EVENT_TYPES = [
  "Birthday party",
  "School / vacation care",
  "Corporate team day",
  "Community / council event",
  "Sports team",
  "Other",
];

const PACKAGE_OPTIONS = [
  "Bolter · no scope ($549)",
  "Bolter · with scope ($599)",
  "Predator ($649)",
  "Not sure yet",
];

export default function EnquiryModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
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
      if (res.ok) {
        setStatus("success");
        setForm(EMPTY_FORM);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{ background: "rgba(9,9,11,0.6)", backdropFilter: "blur(4px)" }}
          />

          {/* Centering wrapper — pointer-events-none lets clicks pass to backdrop */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-y-auto pointer-events-auto"
            style={{
              maxWidth: "560px",
              width: "100%",
              maxHeight: "90dvh",
              willChange: "transform",
            }}
          >
            <div
              className="relative rounded-[1.5rem] overflow-hidden"
              style={{
                background: "white",
                boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
              }}
            >
              {/* Header */}
              <div
                className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 border-b"
                style={{ borderColor: "rgba(0,0,0,0.06)", background: "white" }}
              >
                <div>
                  <h2
                    className="card-heading text-[var(--ink)] text-lg"
                  >
                    Get a free quote
                  </h2>
                  <p
                    className="text-[13px] text-[var(--muted)]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    We&apos;ll reply within 24 hours
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/6 transition-colors duration-200"
                  aria-label="Close"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Form body */}
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ background: "rgba(37,99,235,0.1)" }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3
                    className="card-heading text-[var(--ink)] text-xl mb-2"
                  >
                    Quote sent!
                  </h3>
                  <p
                    className="text-[var(--muted)] text-base leading-relaxed mb-6"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    Thanks. We&apos;ll get back to you within 24 hours, and you&apos;ll also get a confirmation email.
                  </p>
                  <button onClick={onClose} className="btn-blue">
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-4">
                  {/* Name row */}
                  <div className="grid grid-cols-2 gap-3">
                    <FormField label="First name" required>
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        placeholder="Jane"
                        className="form-input"
                      />
                    </FormField>
                    <FormField label="Last name" required>
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Smith"
                        className="form-input"
                      />
                    </FormField>
                  </div>

                  {/* Contact row */}
                  <div className="grid grid-cols-2 gap-3">
                    <FormField label="Email" required>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="jane@example.com"
                        className="form-input"
                      />
                    </FormField>
                    <FormField label="Phone">
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="04XX XXX XXX"
                        className="form-input"
                      />
                    </FormField>
                  </div>

                  {/* Event details */}
                  <div className="grid grid-cols-2 gap-3">
                    <FormField label="Event date" required>
                      <input
                        type="date"
                        name="eventDate"
                        value={form.eventDate}
                        onChange={handleChange}
                        required
                        className="form-input"
                      />
                    </FormField>
                    <FormField label="Event postcode" required>
                      <input
                        type="text"
                        name="postcode"
                        value={form.postcode}
                        onChange={handleChange}
                        required
                        maxLength={4}
                        placeholder="2317"
                        className="form-input"
                      />
                    </FormField>
                  </div>

                  <FormField label="Event type" required>
                    <select
                      name="eventType"
                      value={form.eventType}
                      onChange={handleChange}
                      required
                      className="form-input"
                    >
                      <option value="">Select event type</option>
                      {EVENT_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </FormField>

                  <div className="grid grid-cols-2 gap-3">
                    <FormField label="Package interest">
                      <select
                        name="packageInterest"
                        value={form.packageInterest}
                        onChange={handleChange}
                        className="form-input"
                      >
                        <option value="">Not sure yet</option>
                        {PACKAGE_OPTIONS.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </FormField>
                    <FormField label="Number of players">
                      <input
                        type="number"
                        name="playerCount"
                        value={form.playerCount}
                        onChange={handleChange}
                        min={1}
                        placeholder="e.g. 14"
                        className="form-input"
                      />
                    </FormField>
                  </div>

                  <FormField label="Message / special requests">
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Anything we should know about your event..."
                      className="form-input resize-none"
                    />
                  </FormField>

                  {status === "error" && (
                    <p
                      className="text-[15px] text-red-600"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      Something went wrong. Please try again or call 1300 661 565.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-crimson w-full py-3.5 mt-2 disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending..." : "Send my quote request"}
                  </button>

                  <p
                    className="text-center text-[13px] text-[var(--muted)]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    No commitment required. We&apos;ll reply within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span
        className="text-[13px] font-semibold text-[var(--ink)]"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {label}
        {required && <span className="text-[var(--crimson)] ml-0.5">*</span>}
      </span>
      {children}
    </label>
  );
}
