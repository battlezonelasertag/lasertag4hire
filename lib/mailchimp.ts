import { createHash } from "node:crypto";
import { suitablePackages } from "@/lib/data";

// Adds or updates an enquirer in the Mailchimp audience (shared with Battlezone Laser Tag, as the
// plan allows one audience). Server-only (reads the API key).
//
// Everyone who sends an enquiry becomes a contact so the CRM has the full history, but only
// people who tick the opt-in box are "subscribed" (Spam Act 2003: marketing needs consent).
// Everyone else is "transactional": stored and visible in Mailchimp, excluded from campaigns.
// Each enquiry adds to the same contact: fields update, tags accumulate, and a note plus a
// timeline event record the details. Custom merge fields come from scripts/mailchimp-setup.mjs.

export interface EnquiryContact {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  eventDate: string;
  eventType: string;
  suburb: string;
  postcode: string;
  playerAges: string;
  packageInterest: string;
  playerCount: string;
  message: string;
  form: string;
  marketingOptIn: boolean;
  source?: string;
  medium?: string;
  campaign?: string;
  landingPage?: string;
}

class MailchimpError extends Error {
  status: number;
  constructor(status: number, detail: string) {
    super(`Mailchimp ${status}: ${detail}`);
    this.status = status;
  }
}

function config() {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const dc = apiKey?.split("-")[1];
  if (!apiKey || !audienceId || !dc) return null;
  return { apiKey, audienceId, base: `https://${dc}.api.mailchimp.com/3.0` };
}

export function mailchimpConfigured() {
  return config() !== null;
}

async function call(method: string, path: string, body?: unknown) {
  const cfg = config()!;
  const res = await fetch(`${cfg.base}${path}`, {
    method,
    headers: {
      Authorization: `Basic ${Buffer.from(`lt4h:${cfg.apiKey}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new MailchimpError(res.status, [err.title, err.detail, JSON.stringify(err.errors ?? "")].filter(Boolean).join(" | "));
  }
  return res.status === 204 ? null : res.json();
}

/** Drops empty values so a second enquiry never blanks out details from the first. */
function compact(fields: Record<string, string | undefined>) {
  return Object.fromEntries(Object.entries(fields).filter(([, v]) => v));
}

export async function syncEnquiryToMailchimp(c: EnquiryContact) {
  const cfg = config();
  if (!cfg) return;
  const email = c.email.trim().toLowerCase();
  const member = `/lists/${cfg.audienceId}/members/${createHash("md5").update(email).digest("hex")}`;
  const source = [c.source, c.medium].filter(Boolean).join(" / ");

  const upsert = (withStatus: boolean) =>
    call("PUT", member, {
      email_address: email,
      status_if_new: c.marketingOptIn ? "subscribed" : "transactional",
      // Ticking the box upgrades an existing transactional contact. Not ticking it never
      // downgrades someone already subscribed.
      ...(withStatus && c.marketingOptIn ? { status: "subscribed" } : {}),
      merge_fields: compact({
        FNAME: c.firstName,
        LNAME: c.lastName,
        PHONE: c.phone,
        EVENTDATE: c.eventDate, // YYYY-MM-DD from the date input
        EVENTTYPE: c.eventType,
        SUBURB: c.suburb,
        POSTCODE: c.postcode,
        AGES: c.playerAges,
        PACKAGE: c.packageInterest,
        PLAYERS: c.playerCount,
      }),
    });

  try {
    await upsert(true);
  } catch (err) {
    // Mailchimp refuses to re-subscribe someone who previously unsubscribed via the API
    // ("Member In Compliance State"). Keep their details up to date without changing status.
    if (!(err instanceof MailchimpError && err.status === 400 && c.marketingOptIn)) throw err;
    await upsert(false);
  }

  // First-touch source is only written when the contact doesn't have one yet.
  if (source) {
    const existing = await call("GET", `${member}?fields=merge_fields.SOURCE`);
    if (!existing?.merge_fields?.SOURCE) {
      await call("PATCH", member, { merge_fields: { SOURCE: source.slice(0, 255) } });
    }
  }

  // The audience is shared with Battlezone Laser Tag, so these follow its existing tags: "lt4h" marks the
  // brand, "<brand>-contact-form" the form (as bz-contact-form and lt2u-contact-form do).
  const tags = [
    "lt4h",
    c.form === "contact_page" ? "lt4h-contact-form" : "lt4h-quote-form",
    "Website Enquiry",
    `Event: ${c.eventType}`,
    c.playerAges && `Ages: ${c.playerAges}`,
    c.packageInterest && `Package: ${c.packageInterest.replace(/\s*\(.*\)$/, "")}`,
    c.marketingOptIn && "Opted in: website form",
  ].filter(Boolean) as string[];

  await Promise.all([
    call("POST", `${member}/tags`, { tags: tags.map((name) => ({ name: name.slice(0, 100), status: "active" })) }),
    call("POST", `${member}/notes`, { note: buildNote(c, source) }),
    // Shows on the contact's activity timeline and can trigger a Customer Journey.
    call("POST", `${member}/events`, {
      name: "website_enquiry",
      properties: compact({
        form: c.form,
        event_type: c.eventType,
        event_date: c.eventDate,
        suburb: c.suburb,
        postcode: c.postcode,
        player_ages: c.playerAges,
        package: c.packageInterest,
        players: c.playerCount,
      }),
    }),
  ]);
}

function buildNote(c: EnquiryContact, source: string) {
  const projectId = process.env.POSTHOG_PROJECT_ID;
  const region = process.env.NEXT_PUBLIC_POSTHOG_REGION === "eu" ? "eu" : "us";
  const lines = [
    `Website enquiry (${c.form === "contact_page" ? "contact page" : "quote form"})`,
    `Event: ${c.eventType} on ${c.eventDate} in ${[c.suburb, c.postcode].filter(Boolean).join(" ")}`,
    (c.playerCount || c.playerAges) && `Players: ${[c.playerCount, c.playerAges && `aged ${c.playerAges.toLowerCase()}`].filter(Boolean).join(", ")}`,
    c.playerAges && `Suits (age guide): ${suitablePackages(c.playerAges)}`,
    c.packageInterest && `Package interest: ${c.packageInterest}`,
    c.phone && `Phone: ${c.phone}`,
    source && `First came from: ${source}${c.campaign ? ` (${c.campaign})` : ""}${c.landingPage ? `, landed on ${c.landingPage}` : ""}`,
    `Marketing opt-in: ${c.marketingOptIn ? "yes" : "no"}`,
    projectId && `Site activity: https://${region}.posthog.com/project/${projectId}/person/${encodeURIComponent(c.email.trim().toLowerCase())}`,
    c.message && `\nMessage:\n${c.message}`,
  ].filter(Boolean);
  return lines.join("\n").slice(0, 2000);
}
