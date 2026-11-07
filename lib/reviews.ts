import { randomUUID } from "node:crypto";
import { dbConfigured, ensureSchema, getSql } from "@/lib/db";
import type { ReactionKind, ReviewInput } from "@/lib/validate";

export type ReviewStatus = "pending" | "approved" | "rejected";

export type Review = {
  id: string;
  name: string;
  rating: number;
  projectType: string | null;
  body: string;
  createdAt: string;
  helpful: number;
  love: number;
};

export type AdminReview = Review & { status: ReviewStatus; email: string | null };

const toReview = (r: Record<string, unknown>): Review => ({
  id: String(r.id),
  name: String(r.name),
  rating: Number(r.rating),
  projectType: (r.project_type as string | null) ?? null,
  body: String(r.body),
  createdAt: new Date(r.created_at as string).toISOString(),
  helpful: Number(r.helpful ?? 0),
  love: Number(r.love ?? 0),
});

/** Public reads never throw: if the database is missing or down, the page shows the empty state. */
export async function listApproved(limit = 50, offset = 0): Promise<Review[]> {
  if (!dbConfigured()) return [];
  try {
    await ensureSchema();
    const rows = await getSql()`
      select r.id, r.name, r.rating, r.project_type, r.body, r.created_at,
             count(x.*) filter (where x.kind = 'helpful')::int as helpful,
             count(x.*) filter (where x.kind = 'love')::int as love
      from reviews r
      left join review_reactions x on x.review_id = r.id
      where r.status = 'approved'
      group by r.id
      order by r.created_at desc
      limit ${limit} offset ${offset}`;
    return rows.map(toReview);
  } catch (e) {
    console.error("listApproved failed", e);
    return [];
  }
}

export async function approvedStats(): Promise<{ count: number; average: number }> {
  if (!dbConfigured()) return { count: 0, average: 0 };
  try {
    await ensureSchema();
    const rows = await getSql()`
      select count(*)::int as count, coalesce(avg(rating), 0)::float as average
      from reviews where status = 'approved'`;
    return { count: Number(rows[0]?.count ?? 0), average: Number(rows[0]?.average ?? 0) };
  } catch (e) {
    console.error("approvedStats failed", e);
    return { count: 0, average: 0 };
  }
}

export async function recentCountByIp(ipHash: string): Promise<number> {
  await ensureSchema();
  const rows = await getSql()`
    select count(*)::int as n from reviews
    where ip_hash = ${ipHash} and created_at > now() - interval '24 hours'`;
  return Number(rows[0]?.n ?? 0);
}

export async function createReview(input: ReviewInput, ipHash: string, status: ReviewStatus): Promise<string> {
  await ensureSchema();
  const id = randomUUID();
  await getSql()`
    insert into reviews (id, name, rating, project_type, body, email, status, ip_hash, reviewed_at)
    values (${id}, ${input.name}, ${input.rating}, ${input.projectType}, ${input.body}, ${input.email},
            ${status}, ${ipHash}, ${status === "approved" ? new Date().toISOString() : null})`;
  return id;
}

/** Adds or removes one voter's reaction. Idempotent. Returns fresh counts, or null for an unknown review. */
export async function setReaction(
  reviewId: string,
  kind: ReactionKind,
  voter: string,
  add: boolean,
): Promise<{ helpful: number; love: number } | null> {
  await ensureSchema();
  const sql = getSql();
  const ok = await sql`select 1 as ok from reviews where id = ${reviewId} and status = 'approved'`;
  if (ok.length === 0) return null;

  if (add) {
    await sql`insert into review_reactions (review_id, kind, voter) values (${reviewId}, ${kind}, ${voter})
              on conflict do nothing`;
  } else {
    await sql`delete from review_reactions where review_id = ${reviewId} and kind = ${kind} and voter = ${voter}`;
  }

  const c = await sql`
    select count(*) filter (where kind = 'helpful')::int as helpful,
           count(*) filter (where kind = 'love')::int as love
    from review_reactions where review_id = ${reviewId}`;
  return { helpful: Number(c[0]?.helpful ?? 0), love: Number(c[0]?.love ?? 0) };
}

// ---------- Moderation ----------

export async function listForAdmin(status: ReviewStatus): Promise<AdminReview[]> {
  await ensureSchema();
  const rows = await getSql()`
    select r.id, r.name, r.rating, r.project_type, r.body, r.created_at, r.status, r.email,
           count(x.*) filter (where x.kind = 'helpful')::int as helpful,
           count(x.*) filter (where x.kind = 'love')::int as love
    from reviews r
    left join review_reactions x on x.review_id = r.id
    where r.status = ${status}
    group by r.id
    order by r.created_at desc
    limit 200`;
  return rows.map((r) => ({ ...toReview(r), status: r.status as ReviewStatus, email: (r.email as string | null) ?? null }));
}

export async function adminCounts(): Promise<Record<ReviewStatus, number>> {
  await ensureSchema();
  const rows = await getSql()`select status, count(*)::int as n from reviews group by status`;
  const out: Record<ReviewStatus, number> = { pending: 0, approved: 0, rejected: 0 };
  for (const r of rows) out[r.status as ReviewStatus] = Number(r.n);
  return out;
}

export async function setStatus(id: string, status: ReviewStatus) {
  await ensureSchema();
  await getSql()`update reviews set status = ${status}, reviewed_at = now() where id = ${id}`;
}

export async function deleteReview(id: string) {
  await ensureSchema();
  await getSql()`delete from reviews where id = ${id}`;
}
