import { sendGAEvent } from "@next/third-parties/google";

/**
 * Records a successful enquiry as GA4's recommended `generate_lead` event.
 * No-ops when GA isn't loaded (local dev, Vercel previews). Never pass the
 * enquirer's name, email or phone: GA forbids personal information.
 */
export function trackLead(form: "quote_modal" | "contact_page", packageInterest?: string) {
  if (typeof window === "undefined" || !window.dataLayer) return;
  sendGAEvent("event", "generate_lead", {
    form,
    package_interest: packageInterest || "not_specified",
  });
}
