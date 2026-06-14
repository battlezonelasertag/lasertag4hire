import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "info@lasertag4hire.com.au";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      eventDate,
      eventType,
      postcode,
      packageInterest,
      playerCount,
      message,
    } = body;

    if (!firstName || !email || !eventDate || !eventType || !postcode) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
    }

    const resend = new Resend(apiKey);

    // Send to business
    await resend.emails.send({
      from: "LT4H Website <noreply@lasertag4hire.com.au>",
      to: [CONTACT_EMAIL],
      subject: `New quote request — ${firstName} ${lastName} (${eventType})`,
      html: buildBusinessEmail({ firstName, lastName, email, phone, eventDate, eventType, postcode, packageInterest, playerCount, message }),
    });

    // Auto-confirm to customer
    await resend.emails.send({
      from: "Laser Tag 4 Hire <noreply@lasertag4hire.com.au>",
      to: [email],
      subject: "We got your quote request — Laser Tag 4 Hire",
      html: buildConfirmEmail({ firstName }),
    });

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
          ${buildRow("Message", data.message || "—")}
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
          Thanks for your quote request — we'll get back to you within 24 hours (usually much sooner).
        </p>
        <p style="font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
          In the meantime, if you have any questions you can call us on <strong>1300 661 565</strong>.
        </p>
        <p style="font-size: 13px; color: #6b7280;">
          — The LT4H team<br/>
          <a href="https://www.lasertag4hire.com.au" style="color: #2563EB;">lasertag4hire.com.au</a>
        </p>
      </div>
    </div>
  `;
}
