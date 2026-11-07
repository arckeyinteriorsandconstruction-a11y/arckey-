import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import Stars from "@/components/Stars";
import { adminCounts, listForAdmin, type ReviewStatus } from "@/lib/reviews";
import { dbConfigured } from "@/lib/db";
import { ADMIN_COOKIE, adminConfigured, verifyAdminToken } from "@/lib/security";
import { login, logout, moderate, remove } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Review manager",
  robots: { index: false, follow: false },
};

const TABS: { key: ReviewStatus; label: string }[] = [
  { key: "pending", label: "Awaiting approval" },
  { key: "approved", label: "Published" },
  { key: "rejected", label: "Hidden" },
];

const shell = "mx-auto max-w-3xl px-5 py-14";
const btn = "ui rounded-md px-4 py-2 text-sm font-semibold transition-colors";

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ tab?: string; e?: string }> }) {
  const sp = await searchParams;

  if (!adminConfigured()) {
    return (
      <main className={shell}>
        <h1 className="text-3xl text-ink">Review manager</h1>
        <p className="mt-4 text-muted">
          Set the <code>ADMIN_PASSWORD</code> environment variable to turn this page on.
        </p>
      </main>
    );
  }

  const jar = await cookies();
  if (!verifyAdminToken(jar.get(ADMIN_COOKIE)?.value)) {
    return (
      <main className={shell}>
        <h1 className="text-3xl text-ink">Review manager</h1>
        <form action={login} className="mt-8 max-w-sm space-y-4">
          <div>
            <label htmlFor="pw" className="mb-1 block text-sm font-medium text-ink">
              Password
            </label>
            <input
              id="pw"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-md border border-rule bg-white px-4 py-3 focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/20"
            />
          </div>
          {sp.e && (
            <p role="alert" className="text-sm text-red-800">
              That password is not correct.
            </p>
          )}
          <button type="submit" className={`${btn} w-full bg-ink py-3 text-chalk hover:bg-ink-deep`}>
            Sign in
          </button>
        </form>
      </main>
    );
  }

  if (!dbConfigured()) {
    return (
      <main className={shell}>
        <h1 className="text-3xl text-ink">Review manager</h1>
        <p className="mt-4 text-muted">
          Set <code>DATABASE_URL</code> to your Neon connection string to start collecting reviews.
        </p>
      </main>
    );
  }

  const tab = (TABS.find((t) => t.key === sp.tab)?.key ?? "pending") as ReviewStatus;
  const [counts, reviews] = await Promise.all([adminCounts(), listForAdmin(tab)]);

  return (
    <main className={shell}>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl text-ink">Review manager</h1>
        <form action={logout}>
          <button className={`${btn} border border-rule text-ink hover:border-ink`}>Sign out</button>
        </form>
      </div>

      <nav className="ui mt-8 flex flex-wrap gap-2" aria-label="Review status">
        {TABS.map((t) => (
          <Link
            key={t.key}
            href={`/admin?tab=${t.key}`}
            aria-current={t.key === tab ? "page" : undefined}
            className={`rounded-md border px-4 py-2 text-sm font-medium ${
              t.key === tab ? "border-ink bg-ink text-chalk" : "border-rule text-ink hover:border-ink"
            }`}
          >
            {t.label} ({counts[t.key]})
          </Link>
        ))}
      </nav>

      <div className="mt-10 space-y-8">
        {reviews.length === 0 && <p className="text-muted">Nothing here.</p>}
        {reviews.map((r) => (
          <article key={r.id} className="border-t border-rule pt-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl text-ink">{r.name}</h2>
              <Stars value={r.rating} />
            </div>
            <p className="ui mt-1 text-sm text-muted">
              {r.projectType ?? "No project type"} · {new Date(r.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
              {r.email ? ` · ${r.email}` : ""}
            </p>
            <p className="mt-4 whitespace-pre-line">{r.body}</p>
            {r.status === "approved" && (
              <p className="ui mt-3 text-sm text-muted">
                {r.helpful} helpful · {r.love} love it
              </p>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-3">
              {r.status !== "approved" && (
                <form action={moderate}>
                  <input type="hidden" name="id" value={r.id} />
                  <input type="hidden" name="status" value="approved" />
                  <button className={`${btn} bg-ink text-chalk hover:bg-ink-deep`}>Publish</button>
                </form>
              )}
              {r.status !== "rejected" && (
                <form action={moderate}>
                  <input type="hidden" name="id" value={r.id} />
                  <input type="hidden" name="status" value="rejected" />
                  <button className={`${btn} border border-rule text-ink hover:border-ink`}>
                    {r.status === "approved" ? "Unpublish" : "Hide"}
                  </button>
                </form>
              )}
              <details className="relative">
                <summary className={`${btn} cursor-pointer border border-rule text-red-800 hover:border-red-800`}>Delete</summary>
                <form action={remove} className="absolute left-0 top-full z-10 mt-2 w-60 rounded-md border border-rule bg-white p-4 shadow-lg">
                  <input type="hidden" name="id" value={r.id} />
                  <p className="mb-3 text-sm">Delete this review for good?</p>
                  <button className={`${btn} bg-red-800 text-white hover:bg-red-900`}>Yes, delete</button>
                </form>
              </details>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
