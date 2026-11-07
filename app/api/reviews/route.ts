import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { dbConfigured } from "@/lib/db";
import { sendReviewAlert } from "@/lib/mail";
import { createReview, recentCountByIp } from "@/lib/reviews";
import { ipHash } from "@/lib/security";
import { parseReview } from "@/lib/validate";

const MAX_PER_DAY = 3;
const MIN_FILL_MS = 3000;

const fail = (error: string, status = 400) => NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
  if (!dbConfigured()) return fail("Reviews are not available yet. Please try again later.", 503);

  if (Number(req.headers.get("content-length") ?? 0) > 20_000) return fail("Request too large.", 413);

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return fail("Invalid request.");
  }

  // Bots fill the hidden field. Pretend it worked so they do not retry.
  if (typeof data.website === "string" && data.website.trim() !== "") return NextResponse.json({ ok: true, status: "pending" });

  if (!(Number(data.elapsed) >= MIN_FILL_MS)) return fail("Please take a moment to write your review, then send it again.");

  const parsed = parseReview(data);
  if (!parsed.ok) return fail(parsed.error);

  try {
    const hash = ipHash(req.headers);
    if ((await recentCountByIp(hash)) >= MAX_PER_DAY) {
      return fail("You have sent several reviews today. Please try again tomorrow.", 429);
    }

    const autoApprove = process.env.REVIEWS_AUTO_APPROVE === "true";
    const status = autoApprove ? "approved" : "pending";
    await createReview(parsed.value, hash, status);

    await sendReviewAlert({ ...parsed.value, published: autoApprove });

    if (autoApprove) {
      revalidatePath("/");
      revalidatePath("/reviews");
    }
    return NextResponse.json({ ok: true, status });
  } catch (e) {
    console.error("POST /api/reviews failed", e);
    return fail("We could not save your review. Please try again in a moment.", 500);
  }
}
