// Shared email "design system" for every confirmation email Ochaworth sends
// (newsletter signup, contact form, become-a-member, become-a-volunteer).
//
// This is the one place that defines what these emails look like: the logo
// header on a dark green band, a serif heading, a body paragraph, a yellow
// "Visit Our Website" button, and pill-shaped social buttons in the footer —
// matching the live site's own --green-dark/--green-mid/--yellow colors.
//
// Written as an HTML table layout with inline styles on purpose — that's not
// old-fashioned taste, it's what email clients (Outlook especially) actually
// render reliably. Modern CSS like flexbox/grid or external stylesheets get
// silently dropped by many inboxes.
//
// Each function file (subscribe.js, notify.js) imports renderEmailShell(...)
// from here and only supplies the heading/body/subject text that's specific
// to that email. If the colors, logo, social links, or overall layout ever
// need to change, this is the one file to edit — every email picks it up.

export const COLORS = {
  greenDark: "#0D2B1D",
  greenMid: "#1B3A2B",
  yellow: "#F5C842",
  yellowDark: "#D4A820",
  cream: "#F5F0E8",
  textMuted: "#6B7280",
};

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://web.facebook.com/owlacdi" },
  { label: "Instagram", href: "https://www.instagram.com/ocha.worthlacdi?stkn=MXdubGFwejlkNGlkYg==" },
  { label: "X (Twitter)", href: "https://x.com/ochaworthlacdi?s=11" },
  // No YouTube link here on purpose — Ochaworth doesn't have a real one set
  // up yet (it's a placeholder "#" in the site's content). Add it here the
  // same way as the others above once there's a real link to use.
];

// Minimal HTML-escaping for values that come from a visitor (e.g. their name)
// before they're dropped into the email HTML.
export function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[ch]);
}

// heading: plain text, rendered as the big serif <h1>
// bodyHtml: pre-built inner HTML for the body paragraphs (already escaped by
//           the caller where needed) — lets each email have more than one
//           paragraph without this function needing to know about that.
// ctaText / ctaHref: the yellow button's label and link.
// siteUrl: already-normalized (no trailing slash) base URL, used for the logo.
export function renderEmailShell({ heading, bodyHtml, ctaText = "Visit Our Website", ctaHref, siteUrl }) {
  const logoUrl = `${siteUrl}/images/uploads/logo-full-original.png`;
  const href = ctaHref || siteUrl;

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
                  ${heading}
                </h1>
                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.6; color: #333333;">
                  ${bodyHtml}
                </div>
              </td>
            </tr>

            <!-- CTA button -->
            <tr>
              <td align="center" style="padding: 8px 40px 40px 40px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" style="background-color: ${COLORS.yellow}; border-radius: 999px;">
                      <a href="${href}" style="display: inline-block; padding: 14px 32px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; font-weight: bold; color: ${COLORS.greenDark}; text-decoration: none;">
                        ${ctaText}
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
