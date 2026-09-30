// One-off: prepares the Mailchimp audience for website enquiries (lib/mailchimp.ts).
// Safe to re-run; it only adds what's missing.
//
//   node --env-file=.env.local scripts/mailchimp-setup.mjs

const apiKey = process.env.MAILCHIMP_API_KEY;
const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
const dc = apiKey?.split("-")[1];
if (!apiKey || !audienceId || !dc) {
  console.error("Set MAILCHIMP_API_KEY (ending in -usXX) and MAILCHIMP_AUDIENCE_ID in .env.local first.");
  process.exit(1);
}

const base = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}`;
const auth = `Basic ${Buffer.from(`lt4h:${apiKey}`).toString("base64")}`;

async function call(method, path, body) {
  const res = await fetch(`${base}${path}`, {
    method,
    headers: { Authorization: auth, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status} ${json.title ?? ""}: ${json.detail ?? ""}`);
  return json;
}

const FIELDS = [
  { tag: "EVENTDATE", name: "Event date", type: "date", options: { date_format: "DD/MM/YYYY" } },
  { tag: "EVENTTYPE", name: "Event type", type: "text" },
  { tag: "POSTCODE", name: "Event postcode", type: "text" },
  { tag: "PACKAGE", name: "Package interest", type: "text" },
  { tag: "PLAYERS", name: "Number of players", type: "text" },
  { tag: "SOURCE", name: "Lead source", type: "text" },
  { tag: "PHONE", name: "Phone number", type: "phone", options: { phone_format: "none" } },
];

const list = await call("GET", "?fields=name,stats.member_count");
console.log(`Audience: ${list.name} (${list.stats.member_count} subscribed)\n`);

const { merge_fields: existing } = await call("GET", "/merge-fields?count=100");

for (const field of FIELDS) {
  const found = existing.find((f) => f.tag === field.tag);
  if (!found) {
    await call("POST", "/merge-fields", { ...field, public: false, required: false });
    console.log(`+ created ${field.tag}`);
  } else if (field.tag === "PHONE" && found.options?.phone_format !== "none") {
    // Mailchimp's default is US format, which rejects Australian numbers and fails the whole update.
    await call("PATCH", `/merge-fields/${found.merge_id}`, { options: { phone_format: "none" } });
    console.log("~ switched PHONE to international format");
  } else if (found.type !== field.type) {
    console.warn(`! ${field.tag} exists as "${found.type}", expected "${field.type}". Check it in Mailchimp.`);
  } else {
    console.log(`✓ ${field.tag}`);
  }
}

console.log("\nDone. Website enquiries will now sync to this audience.");
