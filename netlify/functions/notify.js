// Confirmation emails for the Contact form, Become A Member form, and
// Become A Volunteer form — sent via Resend (https://resend.com), same as
// the newsletter signup confirmation in subscribe.js.
//
// The three React forms (see ContactPage.tsx, BecomeMemberPage.tsx,
// BecomeVolunteerPage.tsx) call this AFTER their existing Netlify Forms
// submission already succeeded — that submission is still what makes each
// entry show up under Site configuration > Forms on Netlify, and is still
// the one thing that has to succeed for the visitor to see "sent" on the
// page. This function only sends a courtesy email to the person who filled
// out the form, so they know it went through and roughly when to expect a
// reply. If this email fails for any reason, it fails silently from the
// visitor's point of view — see the fire-and-forget fetch call in each page
// component.
//
// Environment variables used (Site configuration > Environment variables):
//
//   RESEND_API_KEY       same key already used by subscribe.js.
//   NOTIFICATIONS_FROM   (optional) the "from" address for these three
//                         emails — falls back to NEWSLETTER_FROM if not set,
//                         so nothing new has to be added in Netlify for this
//                         to work. Set this separately only if you'd rather
//                         these come from a different address, e.g.
//                         "Ochaworth <hello@ochaworth.com>".
//   SITE_URL              same optional var as subscribe.js.
//
// Replies go to the org's real inbox (site's own Contact Info email),
// not the "from" sending address, via Resend's reply_to — so if someone
// hits "Reply" on their confirmation email, it lands somewhere a person
// actually reads it.
import { renderEmailShell, escapeHtml } from "./lib/email.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REPLY_TO = "ochaworthlacdi@gmail.com";

const TEMPLATES = {
  contact: {
    subject: "We've received your message",
    heading: "Thanks for reaching out!",
    bodyHtml: (name) => `
      <p style="margin: 0 0 16px 0;">
        Hi ${name},
      </p>
      <p style="margin: 0 0 16px 0;">
        Thanks for getting in touch with the Ochaworth Leadership and
        Community Development Initiative. We've received your message and
        someone from our team will get back to you within 1–2 business days.
      </p>
      <p style="margin: 0;">
        Warmly,<br/>The Ochaworth Team
      </p>`,
  },
  "become-a-member": {
    subject: "Your membership application has been received",
    heading: "Welcome to the Ochaworth family!",
    bodyHtml: (name) => `
      <p style="margin: 0 0 16px 0;">
        Hi ${name},
      </p>
      <p style="margin: 0 0 16px 0;">
        Thank you for applying to become a member of the Ochaworth
        Leadership and Community Development Initiative. We've received
        your application, and our team will review it and follow up with
        next steps soon.
      </p>
      <p style="margin: 0 0 16px 0;">
        We believe generosity is the cornerstone of prosperity, and we're
        glad you want to be part of building that with us.
      </p>
      <p style="margin: 0;">
        Warmly,<br/>The Ochaworth Team
      </p>`,
  },
  "become-a-volunteer": {
    subject: "Thanks for applying to volunteer",
    heading: "Thank you for stepping up!",
    bodyHtml: (name) => `
      <p style="margin: 0 0 16px 0;">
        Hi ${name},
      </p>
      <p style="margin: 0 0 16px 0;">
        Thank you for applying to volunteer with the Ochaworth Leadership
        and Community Development Initiative. Volunteers like you are the
        heart of everything we do. We've received your application, and
        our team will be in touch soon about next steps.
      </p>
      <p style="margin: 0;">
        Warmly,<br/>The Ochaworth Team
      </p>`,
  },
};

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let type = "";
  let email = "";
  let name = "";
  try {
    const parsed = JSON.parse(event.body || "{}");
    type = String(parsed.type || "").trim();
    email = String(parsed.email || "").trim();
    name = String(parsed.name || "").trim();
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request body" }) };
  }

  const template = TEMPLATES[type];
  if (!template) {
    return { statusCode: 400, body: JSON.stringify({ error: "Unknown notification type" }) };
  }
  if (!EMAIL_RE.test(email)) {
    return { statusCode: 400, body: JSON.stringify({ error: "A valid email is required" }) };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.NOTIFICATIONS_FROM || process.env.NEWSLETTER_FROM;
  const siteUrl = (process.env.SITE_URL || "https://ochaworth.netlify.app").replace(/\/$/, "");

  if (!apiKey || !fromAddress) {
    console.error("notify: missing RESEND_API_KEY or NEWSLETTER_FROM/NOTIFICATIONS_FROM env var");
    return { statusCode: 500, body: JSON.stringify({ error: "Notifications are not configured yet" }) };
  }

  const safeName = escapeHtml(name || "there");
  const html = renderEmailShell({
    siteUrl,
    heading: template.heading,
    bodyHtml: template.bodyHtml(safeName),
  });

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
        reply_to: REPLY_TO,
        subject: template.subject,
        html,
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
