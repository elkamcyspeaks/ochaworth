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
//
// This only sends the confirmation email. The subscriber's address is
// separately logged to Netlify Forms by the same form submit (see
// submitToNetlify in shared.tsx) — that's what makes every signup show up
// under Site configuration > Forms > newsletter in the Netlify dashboard.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
        html: `
          <div style="font-family: Arial, Helvetica, sans-serif; max-width: 480px; margin: 0 auto; color: #222;">
            <h2 style="color: #1b5e20;">Thanks for subscribing!</h2>
            <p>
              You're now signed up to receive news and updates from the
              Ochaworth Leadership and Community Development Initiative.
              We'll only email you when we have something worth sharing —
              new programs, stories from the field, and ways to get
              involved.
            </p>
            <p>Warmly,<br/>The Ochaworth Team</p>
          </div>
        `,
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
