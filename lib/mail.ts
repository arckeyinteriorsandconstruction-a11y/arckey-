import { SITE } from "@/lib/site";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br>");

type Alert = {
  name: string;
  rating: number;
  projectType: string | null;
  body: string;
  email: string | null;
  published: boolean;
};

/**
 * Emails the owner through Resend when a review arrives.
 * Returns false (and never throws) if email is not configured or sending fails,
 * so a mail problem can never lose a review.
 */
export async function sendReviewAlert(r: Alert): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.OWNER_EMAIL;
  const from = process.env.MAIL_FROM;
  if (!key || !to || !from) return false;

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

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], subject, html, text, reply_to: r.email ?? undefined }),
    });
    if (!res.ok) console.error("Resend error", res.status, await res.text().catch(() => ""));
    return res.ok;
  } catch (e) {
    console.error("Resend request failed", e);
    return false;
  }
}
