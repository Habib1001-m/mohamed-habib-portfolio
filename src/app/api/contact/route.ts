import { NextResponse } from "next/server";

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const sanitize = (value: unknown, maxLength = 3000): string => {
  if (typeof value !== "string") return "";
  return value.replace(/[<>]/g, "").trim().slice(0, maxLength);
};

const parseBody = async (req: Request): Promise<Record<string, unknown>> => {
  try {
    const body = await req.json();
    if (body && typeof body === "object") return body as Record<string, unknown>;
  } catch {
    // fall through
  }
  return {};
};

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "mohamedhabib49.mh@gmail.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
  const fromName = process.env.CONTACT_FROM_NAME || "Mohamed Habib Portfolio";

  if (!apiKey) {
    return NextResponse.json(
      { error: "Contact service is not configured" },
      { status: 500 },
    );
  }

  const body = await parseBody(req);
  const company = sanitize(body.company, 120);

  // Honeypot field — real users never fill this. Silently drop spam.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const name = sanitize(body.name, 120);
  const email = sanitize(body.email, 180);
  const subject = sanitize(body.subject, 180) || "Portfolio contact request";
  const message = sanitize(body.message, 4000);

  if (!name || !email || !message || !isEmail(email)) {
    return NextResponse.json(
      { error: "Invalid contact request" },
      { status: 400 },
    );
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

  try {
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
      return NextResponse.json(
        { error: "Unable to send contact email" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Unable to send contact email" },
      { status: 502 },
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: { Allow: "POST" } },
  );
}
