import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { dbConfigured } from "@/lib/db";
import { setReaction } from "@/lib/reviews";
import { REACTIONS, type ReactionKind } from "@/lib/validate";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const VOTER_COOKIE = "arckey_voter";

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!dbConfigured()) return NextResponse.json({ ok: false, error: "Unavailable." }, { status: 503 });

  const { id } = await ctx.params;
  if (!UUID.test(id)) return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });

  let body: { kind?: string; action?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  if (!REACTIONS.includes(body.kind as ReactionKind) || (body.action !== "add" && body.action !== "remove")) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Anonymous but stable: one random id per browser, so a person can react once per review.
  const jar = await cookies();
  let voter = jar.get(VOTER_COOKIE)?.value;
  if (!voter || !UUID.test(voter)) {
    voter = randomUUID();
    jar.set(VOTER_COOKIE, voter, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
  }

  try {
    const counts = await setReaction(id, body.kind as ReactionKind, voter, body.action === "add");
    if (!counts) return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
    revalidatePath("/");
    return NextResponse.json({ ok: true, ...counts });
  } catch (e) {
    console.error("reaction failed", e);
    return NextResponse.json({ ok: false, error: "Could not save your reaction." }, { status: 500 });
  }
}
