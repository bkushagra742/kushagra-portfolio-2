// Serverless function (Vercel-style). This is a placeholder — it currently
// just logs the submission. Wire it up to a real email service before going
// live, e.g.:
//   - Resend (resend.com) — simple, generous free tier
//   - SendGrid
//   - Nodemailer + your own SMTP
// Add whichever API key you choose to your Environment Variables, then
// replace the TODO block below with the actual send call.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "name, email, and message are required" });
    }

    // TODO: replace with a real email send, e.g. via Resend:
    //
    // await fetch("https://api.resend.com/emails", {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     from: "portfolio@yourdomain.com",
    //     to: "bmamta742@gmail.com",
    //     subject: `Portfolio contact: ${subject || "New message"}`,
    //     text: `From: ${name} <${email}>\n\n${message}`,
    //   }),
    // });

    console.log("New contact form submission:", { name, email, subject, message });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("contact error:", err);
    return res.status(500).json({ error: "Unexpected server error" });
  }
}
