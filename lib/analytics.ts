import { sendGAEvent } from "@next/third-parties/google";
import posthog from "posthog-js";

export const POSTHOG_REGION = process.env.NEXT_PUBLIC_POSTHOG_REGION === "eu" ? "eu" : "us";
export const POSTHOG_PROXY_PATH = "/relay-lt4h";

/** Sends a named PostHog event. No-ops when PostHog isn't loaded (local dev, previews, no key). */
export function track(event: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined" || !posthog.__loaded) return;
  posthog.capture(event, properties);
}

export interface Lead {
  email: string;
  firstName: string;
  lastName: string;
  eventType: string;
  eventDate: string;
  postcode: string;
  packageInterest?: string;
  playerCount?: string;
  marketingOptIn: boolean;
}

/**
 * Records a successful enquiry. GA gets its recommended `generate_lead` event with no personal
 * details (GA forbids them). PostHog identifies the visitor by email, which attaches this
 * browser's earlier anonymous visits to their person profile.
 */
export function trackLead(form: "quote_modal" | "contact_page", lead: Lead) {
  if (typeof window === "undefined") return;
  const packageInterest = lead.packageInterest || "not_specified";

  if (window.dataLayer) {
    sendGAEvent("event", "generate_lead", { form, package_interest: packageInterest });
  }

  if (posthog.__loaded) {
    posthog.identify(
      lead.email.trim().toLowerCase(),
      {
        email: lead.email.trim(),
        name: `${lead.firstName} ${lead.lastName}`.trim(),
        last_event_type: lead.eventType,
        last_postcode: lead.postcode,
        marketing_opt_in: lead.marketingOptIn,
      },
      { first_enquiry_at: new Date().toISOString() },
    );
    posthog.capture("enquiry_submitted", {
      form,
      event_type: lead.eventType,
      event_date: lead.eventDate,
      postcode: lead.postcode,
      package_interest: packageInterest,
      player_count: lead.playerCount || undefined,
      marketing_opt_in: lead.marketingOptIn,
    });
  }
}

export interface FirstTouch {
  source: string;
  medium?: string;
  campaign?: string;
  landingPage: string;
}

const FIRST_TOUCH_KEY = "lt4h_first_touch";

/** Stores the visitor's first traffic source (UTM tags, else referrer domain, else direct) once. */
export function recordFirstTouch() {
  try {
    if (localStorage.getItem(FIRST_TOUCH_KEY)) return;
    const params = new URLSearchParams(window.location.search);
    let referrer = "";
    try {
      const host = new URL(document.referrer).hostname.replace(/^www\./, "");
      if (host && host !== window.location.hostname.replace(/^www\./, "")) referrer = host;
    } catch {
      // No referrer, or not a URL.
    }
    const touch: FirstTouch = {
      source: params.get("utm_source") || referrer || (params.get("gclid") ? "google" : "direct"),
      medium: params.get("utm_medium") || (params.get("gclid") ? "cpc" : referrer ? "referral" : undefined),
      campaign: params.get("utm_campaign") || undefined,
      landingPage: window.location.pathname,
    };
    localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(touch));
  } catch {
    // Storage blocked (private mode, disabled site data): attribution is optional.
  }
}

export function getFirstTouch(): FirstTouch | undefined {
  try {
    const raw = localStorage.getItem(FIRST_TOUCH_KEY);
    return raw ? (JSON.parse(raw) as FirstTouch) : undefined;
  } catch {
    return undefined;
  }
}
