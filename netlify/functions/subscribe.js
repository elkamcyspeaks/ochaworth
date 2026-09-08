// Newsletter signup — sends the subscriber a "you're now subscribed"
// confirmation email via Resend (https://resend.com).
//
// The React form (see Newsletter() in src/components/shared.tsx) posts here
// as JSON. This runs on Netlify's servers, not in the visitor's browser, so
// the Resend API key never has to be shipped in the site's JavaScript where
// anyone could read it — it only ever lives in Netlify's environment
// variables (Site configuration > Environment variables):
//
//   RESEND_API_KEY    from Resend: Dashboard > API Keys > Create API Key
//   NEWSLETTER_FROM   the "from" address to send as, e.g.
//                      "Ochaworth <newsletter@ochaworth.org>" — the domain
//                      part MUST be a domain verified in Resend
//                      (Dashboard > Domains > Add Domain, then add the DNS
//                      records Resend gives you at your domain registrar).
//                      Without a verified domain, Resend will only deliver
//                      to the email address on the Resend account itself,
//                      not to actual subscribers.
//   SITE_URL          (optional) the site's live URL, used for the logo
//                      image and the "Visit our website" button — defaults
//                      to https://ochaworth.netlify.app below. Once
//                      ochaworth.com is connected as the custom domain,
//                      add SITE_URL=https://ochaworth.com here and the
//                      email will pick it up automatically, no code change
//                      needed.
//
// This only sends the confirmation email. The subscriber's address is
// separately logged to Netlify Forms by the same form submit (see
// submitToNetlify in shared.tsx) — that's what makes every signup show up
// under Site configuration > Forms > newsletter in the Netlify dashboard.
//
// The visual design (logo, colors, button, social footer) lives in
// netlify/functions/lib/email.js and is shared with the confirmation emails
// sent by notify.js (contact / become-a-member / become-a-volunteer) — that's
// the one file to edit if the overall look ever needs to change. This file
// only supplies the newsletter-specific wording.
import { renderEmailShell } from "./lib/email.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildEmailHtml(siteUrl) {
  return renderEmailShell({
    siteUrl,
    heading: "Thanks for subscribing!",
    bodyHtml: `
      <p style="margin: 0 0 16px 0;">
        You're now signed up to receive news and updates from the
        Ochaworth Leadership and Community Development Initiative.
        We'll only email you when we have something worth sharing —
        new programs, stories from the field, and ways to get
        involved.
      </p>
      <p style="margin: 0;">
        Warmly,<br/>The Ochaworth Team
      </p>`,
  });
}

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let email = "";
  try {
    email = String(JSON.parse(event.body || "{}").email || "").trim();
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request body" }) };
  }

  if (!EMAIL_RE.test(email)) {
    return { statusCode: 400, body: JSON.stringify({ error: "A valid email is required" }) };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.NEWSLETTER_FROM;
  const siteUrl = (process.env.SITE_URL || "https://ochaworth.netlify.app").replace(/\/$/, "");

  if (!apiKey || !fromAddress) {
    console.error("Newsletter signup: missing RESEND_API_KEY or NEWSLETTER_FROM env var");
    return { statusCode: 500, body: JSON.stringify({ error: "Newsletter signup is not configured yet" }) };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [email],
        subject: "You're subscribed to the Ochaworth newsletter!",
        html: buildEmailHtml(siteUrl),
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error("Resend API error:", res.status, data);
      return { statusCode: 502, body: JSON.stringify({ error: "Could not send confirmation email" }) };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error("Error calling Resend:", err);
    return { statusCode: 502, body: JSON.stringify({ error: "Could not send confirmation email" }) };
  }
};
