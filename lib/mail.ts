import { SITE } from "@/lib/site";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br>");

type Mail = { to: string; subject: string; html: string; text: string; replyTo?: string };

async function sendViaResend(m: Mail): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  if (!key || !from) return false;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [m.to], subject: m.subject, html: m.html, text: m.text, reply_to: m.replyTo }),
    });
    if (!res.ok) console.error("[mail] Resend rejected the email:", res.status, await res.text().catch(() => ""));
    return res.ok;
  } catch (e) {
    console.error("[mail] could not reach Resend:", e instanceof Error ? e.message : e);
    return false;
  }
}

type Alert = {
  name: string;
  rating: number;
  projectType: string | null;
  body: string;
  email: string | null;
  published: boolean;
};

/** Tells the owner a review has arrived. */
export async function sendReviewAlert(r: Alert): Promise<boolean> {
  const to = process.env.OWNER_EMAIL;
  if (!to) return false;

  const stars = "★".repeat(r.rating) + "☆".repeat(5 - r.rating);
  const adminUrl = `${SITE.url}/admin`;
  const subject = `${r.published ? "New review" : "Review awaiting approval"}: ${r.rating}/5 from ${r.name}`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;line-height:1.5;color:#2a2f3a">
      <h2 style="margin:0 0 4px;color:#18264a">${r.published ? "New review published" : "New review awaiting approval"}</h2>
      <p style="margin:0 0 16px;font-size:20px;color:#b9811a;letter-spacing:2px">${stars}</p>
      <p style="margin:0 0 4px"><strong>${esc(r.name)}</strong>${r.projectType ? ` · ${esc(r.projectType)}` : ""}</p>
      ${r.email ? `<p style="margin:0 0 12px;color:#566070">Contact: ${esc(r.email)}</p>` : ""}
      <blockquote style="margin:12px 0;padding:12px 16px;background:#eceee8;border-left:3px solid #e3a72f">${esc(r.body)}</blockquote>
      <p><a href="${adminUrl}" style="background:#18264a;color:#fafaf7;padding:10px 18px;border-radius:6px;text-decoration:none;display:inline-block">${r.published ? "Open review manager" : "Review and approve"}</a></p>
    </div>`;

  const text = `${subject}\n\n${stars}\n${r.name}${r.projectType ? ` (${r.projectType})` : ""}\n${r.email ? `Contact: ${r.email}\n` : ""}\n${r.body}\n\nManage: ${adminUrl}`;

  return sendViaResend({ to, subject, html, text, replyTo: r.email ?? undefined });
}

/** Automatic thank-you to the person who wrote the review. Sent from the no-reply address. */
export async function sendReviewerThanks(r: { name: string; email: string; published: boolean }): Promise<boolean> {
  const first = r.name.trim().split(/\s+/)[0] || "there";
  const reviewsUrl = `${SITE.url}/reviews`;
  const subject = "Thank you for your review";

  const status = r.published
    ? "Your review is now live on our website."
    : "We check each review before it goes live, so yours will appear on our website shortly.";

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;line-height:1.6;color:#2a2f3a">
      <h2 style="margin:0 0 12px;color:#18264a">Thank you, ${esc(first)}</h2>
      <p>Thank you for taking the time to share your experience with ${esc(SITE.name)}. It means a lot to us and helps other families and businesses decide who to work with.</p>
      <p>${status}</p>
      <p><a href="${reviewsUrl}" style="background:#18264a;color:#fafaf7;padding:10px 18px;border-radius:6px;text-decoration:none;display:inline-block">See client reviews</a></p>
      <hr style="border:none;border-top:1px solid #c8ccc2;margin:24px 0">
      <p style="font-size:13px;color:#566070">This is an automatic message. To reach us, call ${esc(SITE.phoneDisplay)} or reply to this email.<br>${esc(SITE.name)}, ${esc(SITE.addressOneLine)}</p>
    </div>`;

  const text = `Thank you, ${first}\n\nThank you for taking the time to share your experience with ${SITE.name}. It helps other families and businesses decide who to work with.\n\n${status}\n\nSee client reviews: ${reviewsUrl}\n\nThis is an automatic message. To reach us, call ${SITE.phoneDisplay} or reply to this email.\n${SITE.name}, ${SITE.addressOneLine}`;

  return sendViaResend({ to: r.email, subject, html, text, replyTo: process.env.OWNER_EMAIL });
}