"use client";

import { useState, useSyncExternalStore } from "react";
import Stars from "@/components/Stars";
import type { Review } from "@/lib/reviews";

type Kind = "helpful" | "love";
const KEY = "arckey_reacted";

// "What this browser has already reacted to" lives in localStorage and is read with useSyncExternalStore.
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
};
const snapshot = () => {
  try {
    return localStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
};
const serverSnapshot = () => "";
const parse = (s: string): Record<string, Kind[]> => {
  try {
    return s ? JSON.parse(s) : {};
  } catch {
    return {};
  }
};
const store = (map: Record<string, Kind[]>) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(map));
  } catch {
    /* storage unavailable: reactions still work for this visit */
  }
  listeners.forEach((l) => l());
};

const fmt = new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric", timeZone: "Asia/Kolkata" });

const Icon = ({ kind }: { kind: Kind }) =>
  kind === "helpful" ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
      <path d="M7 11v9H4v-9h3zM7 11l4-7c1.2 0 2 .9 2 2v3h5.5a1.5 1.5 0 011.46 1.84l-1.5 7A1.5 1.5 0 0117 19H7" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />
    </svg>
  );

function ReviewCard({ review, reacted }: { review: Review; reacted: Kind[] }) {
  const [counts, setCounts] = useState({ helpful: review.helpful, love: review.love });
  const [busy, setBusy] = useState(false);

  async function toggle(kind: Kind) {
    if (busy) return;
    const adding = !reacted.includes(kind);
    const map = parse(snapshot());
    const before = counts;

    // Optimistic update, rolled back if the server says no.
    setBusy(true);
    setCounts({ ...counts, [kind]: Math.max(0, counts[kind] + (adding ? 1 : -1)) });
    store({ ...map, [review.id]: adding ? [...(map[review.id] ?? []), kind] : (map[review.id] ?? []).filter((k) => k !== kind) });

    try {
      const res = await fetch(`/api/reviews/${review.id}/react`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, action: adding ? "add" : "remove" }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error("failed");
      setCounts({ helpful: data.helpful, love: data.love });
    } catch {
      setCounts(before);
      store({ ...map });
    } finally {
      setBusy(false);
    }
  }

  // A reaction this browser already made always counts, even if the page it came from is a minute old.
  const shown = (kind: Kind) => Math.max(counts[kind], reacted.includes(kind) ? 1 : 0);

  const btn = (kind: Kind, label: string) => {
    const on = reacted.includes(kind);
    return (
      <button
        type="button"
        onClick={() => toggle(kind)}
        aria-pressed={on}
        className={`ui inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors ${
          on ? "border-ink bg-ink text-chalk" : "border-rule text-muted hover:border-ink hover:text-ink"
        }`}
      >
        <Icon kind={kind} />
        {label}
        <span className="tabular-nums" aria-label={`${shown(kind)} reactions`}>
          {shown(kind)}
        </span>
      </button>
    );
  };

  return (
    <article className="border-t border-rule pt-6">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <h3 className="text-xl text-ink">{review.name}</h3>
        <Stars value={review.rating} />
      </div>
      <p className="ui mt-1 text-sm text-muted">
        {review.projectType ? `${review.projectType}, ` : ""}
        {fmt.format(new Date(review.createdAt))}
      </p>
      <p className="mt-4 whitespace-pre-line">{review.body}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {btn("helpful", "Helpful")}
        {btn("love", "Love it")}
      </div>
    </article>
  );
}

export default function ReviewList({ reviews, columns = 1 }: { reviews: Review[]; columns?: 1 | 2 }) {
  const raw = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const map = parse(raw);
  return (
    <div className={columns === 2 ? "grid gap-x-12 gap-y-10 lg:grid-cols-2" : "space-y-10"}>
      {reviews.map((r) => (
        <ReviewCard key={r.id} review={r} reacted={map[r.id] ?? []} />
      ))}
    </div>
  );
}
