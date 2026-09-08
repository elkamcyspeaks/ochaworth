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
// The email itself is a small design system of its own (colors match the
// live site's --green-dark/--green-mid/--yellow), written as an HTML table
// layout with inline styles — that's not old-fashioned taste, it's what
// email clients (Outlook especially) actually render reliably; modern CSS
// like flexbox/grid or external stylesheets get silently dropped by many
// inboxes. If the wording, colors, or links ever need to change, this file
// is the one place to edit — there's no separate dashboard for it.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const COLORS = {
  greenDark: "#0D2B1D",
  greenMid: "#1B3A2B",
  yellow: "#F5C842",
  yellowDark: "#D4A820",
  cream: "#F5F0E8",
  textMuted: "#6B7280",
};

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://web.facebook.com/owlacdi" },
  { label: "Instagram", href: "https://www.instagram.com/ocha.worthlacdi?stkn=MXdubGFwejlkNGlkYg==" },
  { label: "X (Twitter)", href: "https://x.com/ochaworthlacdi?s=11" },
  // No YouTube link here on purpose — Ochaworth doesn't have a real one set
  // up yet (it's a placeholder "#" in the site's content). Add it here the
  // same way as the others above once there's a real link to use.
];

function buildEmailHtml(siteUrl) {
  const logoUrl = `${siteUrl}/images/uploads/logo-full-original.png`;

  const socialButtons = SOCIAL_LINKS.map(
    (s) => `
      <td style="padding: 0 6px;">
        <a href="${s.href}" style="display: inline-block; padding: 10px 18px; background-color: ${COLORS.greenMid}; color: #ffffff; font-family: Arial, Helvetica, sans-serif; font-size: 13px; font-weight: bold; text-decoration: none; border-radius: 999px;">
          ${s.label}
        </a>
      </td>`,
  ).join("");

  return `
<!doctype html>
<html>
  <body style="margin: 0; padding: 0; background-color: ${COLORS.cream};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: ${COLORS.cream};">
      <tr>
        <td align="center" style="padding: 32px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden;">

            <!-- Header -->
            <tr>
              <td align="center" style="background-color: ${COLORS.greenDark}; padding: 32px 24px;">
                <img src="${logoUrl}" alt="Ochaworth" width="160" style="display: block; max-width: 160px; height: auto; border: 0;"/>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 40px 40px 24px 40px; font-family: Georgia, 'Times New Roman', serif; color: ${COLORS.greenDark};">
                <h1 style="margin: 0 0 16px 0; font-size: 26px; line-height: 1.3; color: ${COLORS.greenDark};">
                  Thanks for subscribing!
                </h1>
                <p style="margin: 0 0 16px 0; font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.6; color: #333333;">
                  You're now signed up to receive news and updates from the
                  Ochaworth Leadership and Community Development Initiative.
                  We'll only email you when we have something worth sharing —
                  new programs, stories from the field, and ways to get
                  involved.
                </p>
                <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.6; color: #333333;">
                  Warmly,<br/>The Ochaworth Team
                </p>
              </td>
            </tr>

            <!-- CTA button -->
            <tr>
              <td align="center" style="padding: 8px 40px 40px 40px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" style="background-color: ${COLORS.yellow}; border-radius: 999px;">
                      <a href="${siteUrl}" style="display: inline-block; padding: 14px 32px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; font-weight: bold; color: ${COLORS.greenDark}; text-decoration: none;">
                        Visit Our Website
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td style="padding: 0 40px;">
                <div style="border-top: 1px solid #e8e4da;"></div>
              </td>
            </tr>

            <!-- Social + footer -->
            <tr>
              <td align="center" style="padding: 32px 24px; background-color: ${COLORS.cream};">
                <p style="margin: 0 0 16px 0; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; color: ${COLORS.greenMid};">
                  Follow Us
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto 24px auto;">
                  <tr>${socialButtons}</tr>
                </table>
                <p style="margin: 0 0 6px 0; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 1.5; color: ${COLORS.textMuted};">
                  Ochaworth Leadership and Community Development Initiative
                </p>
                <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 1.5; color: ${COLORS.textMuted};">
                  No. B5 Emerald Royal Plaza, Zaramaganda-Rayfield Road, Jos, Plateau State, Nigeria
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
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
