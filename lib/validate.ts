export const PROJECT_TYPES = [
  "Residential interiors",
  "Commercial interiors",
  "Modular kitchen",
  "Construction or renovation",
  "Design consultation",
  "Other",
] as const;

export const REACTIONS = ["helpful", "love"] as const;
export type ReactionKind = (typeof REACTIONS)[number];

export type ReviewInput = {
  name: string;
  rating: number;
  projectType: string | null;
  body: string;
  email: string | null;
};

// Strips control characters and collapses runs of spaces; keeps line breaks in the body.
const clean = (s: string) => s.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").replace(/[ \t]+/g, " ").trim();

export function parseReview(raw: unknown): { ok: true; value: ReviewInput } | { ok: false; error: string } {
  if (!raw || typeof raw !== "object") return { ok: false, error: "Invalid request." };
  const r = raw as Record<string, unknown>;

  const name = clean(String(r.name ?? ""));
  if (name.length < 2 || name.length > 60) return { ok: false, error: "Enter your name (2 to 60 characters)." };

  const rating = Number(r.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return { ok: false, error: "Choose a star rating." };

  const body = clean(String(r.body ?? "")).replace(/\n{3,}/g, "\n\n");
  if (body.length < 20) return { ok: false, error: "Write at least 20 characters about your experience." };
  if (body.length > 1000) return { ok: false, error: "Keep your review under 1,000 characters." };

  const pt = String(r.projectType ?? "");
  const projectType = (PROJECT_TYPES as readonly string[]).includes(pt) ? pt : null;

  const emailRaw = clean(String(r.email ?? ""));
  if (emailRaw && (emailRaw.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRaw))) {
    return { ok: false, error: "Enter a valid email address, or leave it blank." };
  }

  if (r.consent !== true) return { ok: false, error: "Please confirm that we may show your review." };

  return { ok: true, value: { name, rating, projectType, body, email: emailRaw || null } };
}
