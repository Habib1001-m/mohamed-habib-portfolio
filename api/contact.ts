const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const sanitize = (value: unknown, maxLength = 3000) => {
  if (typeof value !== "string") return "";
  return value.replace(/[<>]/g, "").trim().slice(0, maxLength);
};

const parseBody = (body: unknown) => {
  if (!body) return {};
  if (typeof body === "string") {
    try {
      return JSON.parse(body) as Record<string, unknown>;
    } catch {
      return {};
    }
  }
  if (typeof body === "object") return body as Record<string, unknown>;
  return {};
};

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "mohamedhabib49.mh@gmail.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
  const fromName = process.env.CONTACT_FROM_NAME || "Mohamed Habib Portfolio";

  if (!apiKey) {
    return res.status(500).json({ error: "Contact service is not configured" });
  }

  const body = parseBody(req.body);
  const company = sanitize(body.company, 120);

  // Honeypot field: real users should never fill this.
  if (company) {
    return res.status(200).json({ ok: true });
  }

  const name = sanitize(body.name, 120);
  const email = sanitize(body.email, 180);
  const subject = sanitize(body.subject, 180) || "Portfolio contact request";
  const message = sanitize(body.message, 4000);

  if (!name || !email || !message || !isEmail(email)) {
    return res.status(400).json({ error: "Invalid contact request" });
  }

  const safeSubject = `Portfolio contact — ${subject}`;
  const text = [
    "New portfolio contact request",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#111827">
      <h2 style="margin:0 0 16px">New portfolio contact request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0" />
      <p style="white-space:pre-wrap">${message}</p>
    </div>
  `;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${fromName} <${fromEmail}>`,
      to: [toEmail],
      reply_to: email,
      subject: safeSubject,
      text,
      html,
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    console.error("Resend contact error:", errorText);
    return res.status(502).json({ error: "Unable to send contact email" });
  }

  return res.status(200).json({ ok: true });
}
