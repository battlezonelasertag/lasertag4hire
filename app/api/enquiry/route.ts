import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "info@lasertag4hire.com.au";

// Basic abuse protection. The limit is per server instance, so it slows bursts rather than
// guaranteeing a global cap, but it stops a bot using the form to spam confirmation emails.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const recent = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > RATE_LIMIT;
}

const LIMITS: Record<string, number> = {
  firstName: 80, lastName: 80, email: 200, phone: 40, eventDate: 20, eventType: 80,
  postcode: 10, packageInterest: 80, playerCount: 20, message: 2000,
};

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot: a hidden field real visitors never see. Bots fill it; pretend success and drop it.
    if (typeof body?.company === "string" && body.company.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const f = Object.fromEntries(
      Object.entries(LIMITS).map(([key, max]) => [key, clean(body?.[key], max)]),
    ) as Record<keyof typeof LIMITS, string>;
    const { firstName, lastName, email, phone, eventDate, eventType, postcode, packageInterest, playerCount, message } = f;

    if (!firstName || !email || !eventDate || !eventType || !postcode) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
    }

    const resend = new Resend(apiKey);

    // Send to business. Resend reports failures in the result rather than throwing,
    // so check it: otherwise a failed send would tell the visitor it worked.
    const sent = await resend.emails.send({
      from: "LT4H Website <noreply@lasertag4hire.com.au>",
      to: [CONTACT_EMAIL],
      subject: `New quote request: ${firstName} ${lastName} (${eventType})`.replace(/[\r\n]+/g, " "),
      html: buildBusinessEmail(
        Object.fromEntries(Object.entries(f).map(([k, v]) => [k, escapeHtml(v)])) as Parameters<typeof buildBusinessEmail>[0],
      ),
      replyTo: email,
    });
    if (sent.error) {
      console.error("Enquiry email failed:", sent.error);
      return NextResponse.json({ error: "Failed to send" }, { status: 502 });
    }

    // Auto-confirm to customer. The enquiry has already reached us, so a failure here is logged, not surfaced.
    const confirmation = await resend.emails.send({
      from: "Laser Tag 4 Hire <noreply@lasertag4hire.com.au>",
      to: [email],
      subject: "We got your quote request | Laser Tag 4 Hire",
      html: buildConfirmEmail({ firstName: escapeHtml(firstName) }),
    });
    if (confirmation.error) console.error("Confirmation email failed:", confirmation.error);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Enquiry API error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}

function buildBusinessEmail(data: {
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
}) {
  return `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #09090B;">
      <div style="background: #E11D48; padding: 24px 32px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 20px;">New Quote Request</h1>
      </div>
      <div style="background: white; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          ${buildRow("Name", `${data.firstName} ${data.lastName}`)}
          ${buildRow("Email", `<a href="mailto:${data.email}">${data.email}</a>`)}
          ${buildRow("Phone", data.phone || "—")}
          ${buildRow("Event date", data.eventDate)}
          ${buildRow("Event type", data.eventType)}
          ${buildRow("Postcode", data.postcode)}
          ${buildRow("Package interest", data.packageInterest || "Not specified")}
          ${buildRow("Number of players", data.playerCount || "Not specified")}
          ${buildRow("Message", (data.message || "—").replace(/\n/g, "<br/>"))}
        </table>
      </div>
    </div>
  `;
}

function buildRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280; width: 140px; vertical-align: top;">${label}</td>
      <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #09090B; font-weight: 500;">${value}</td>
    </tr>
  `;
}

function buildConfirmEmail({ firstName }: { firstName: string }) {
  return `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #09090B;">
      <div style="background: #2563EB; padding: 24px 32px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 20px;">Got it, ${firstName}!</h1>
      </div>
      <div style="background: white; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
        <p style="font-size: 15px; line-height: 1.6; margin-bottom: 16px;">
          Thanks for your quote request. We'll get back to you within 24 hours (usually much sooner).
        </p>
        <p style="font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
          In the meantime, if you have any questions you can call us on <strong>1300 661 565</strong>.
        </p>
        <p style="font-size: 13px; color: #6b7280;">
          The LT4H team<br/>
          <a href="https://www.lasertag4hire.com.au" style="color: #2563EB;">lasertag4hire.com.au</a>
        </p>
      </div>
    </div>
  `;
}
