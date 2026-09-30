import posthog from "posthog-js";
import { POSTHOG_PROXY_PATH, POSTHOG_REGION, recordFirstTouch, track } from "@/lib/analytics";

// Remember where this visitor first came from, so an enquiry can carry its lead source into Mailchimp.
// Stays in the visitor's browser and only leaves it with a form they choose to send.
recordFirstTouch();

// Production deployment only, like GA: keeps local dev and Vercel preview traffic out of PostHog.
// Vercel exposes NEXT_PUBLIC_VERCEL_ENV to the browser automatically.
const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
if (key && process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
  posthog.init(key, {
    // Sent through our own domain (see rewrites in next.config.ts) so ad blockers don't drop it.
    api_host: POSTHOG_PROXY_PATH,
    ui_host: `https://${POSTHOG_REGION}.posthog.com`,
    defaults: "2026-08-30",
    // Anonymous visitors are counted without a person profile; one is created when they send an
    // enquiry (identify), and their earlier visits are attached to it.
    person_profiles: "identified_only",
    session_recording: { maskAllInputs: true },
  });

  // Booking, phone and email links are spread across many components, so catch them in one place.
  // Capture phase, because FareHarbor's lightframe script intercepts its own links.
  document.addEventListener(
    "click",
    (e) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const location = window.location.pathname;
      if (href.includes("fareharbor.com")) track("booking_clicked", { location, href });
      else if (href.startsWith("tel:")) track("phone_clicked", { location });
      else if (href.startsWith("mailto:")) track("email_clicked", { location });
    },
    true,
  );
}
