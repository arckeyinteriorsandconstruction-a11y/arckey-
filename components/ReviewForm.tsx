"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ShareLink from "@/components/ShareLink";
import { PROJECT_TYPES } from "@/lib/validate";

const PATH = "M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9 6.8 19.7l1-5.9L3.5 9.7l5.9-.8L12 3.5z";
const WORDS = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];

const field =
  "w-full rounded-md border border-rule bg-white px-4 py-3 text-base text-body placeholder:text-muted/70 transition-colors focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/20";

export default function ReviewForm({ shareUrl }: { shareUrl: string }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [body, setBody] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<"pending" | "approved">("pending");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (rating === 0) {
      setError("Choose a star rating.");
      return;
    }
    const f = new FormData(e.currentTarget);
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.get("name"),
          rating,
          projectType: f.get("projectType"),
          body,
          email: f.get("email"),
          consent: f.get("consent") === "on",
          website: f.get("website"),
          elapsed: Date.now() - startedAt.current,
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setResult(data.status === "approved" ? "approved" : "pending");
        setState("done");
      } else {
        setError(data?.error || "We could not send your review. Please try again.");
        setState("idle");
      }
    } catch {
      setError("We could not reach the server. Check your connection and try again.");
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl text-ink">Thank you for your review</h2>
          <p className="mt-3 text-muted">
            {result === "approved"
              ? "Your review is now live on our reviews page."
              : "We check each review before it goes live, so it will appear on our reviews page shortly."}
          </p>
        </div>
        <div className="border-t border-rule pt-6">
          <h3 className="text-xl text-ink">Know someone we have worked with?</h3>
          <p className="mb-4 mt-2 text-muted">Send them this page so they can share their experience too.</p>
          <ShareLink url={shareUrl} />
        </div>
        <Link href="/reviews" className="ui inline-block font-medium text-ink underline decoration-marigold decoration-2 underline-offset-4">
          Read what others have said
        </Link>
      </div>
    );
  }

  const shown = hover || rating;

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Honeypot: real visitors never see or fill this. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset>
        <legend className="mb-2 block text-sm font-medium text-ink">Your rating</legend>
        <div className="flex items-center gap-3">
          <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map((n) => (
              <label key={n} className="cursor-pointer" onMouseEnter={() => setHover(n)}>
                <input
                  type="radio"
                  name="rating"
                  value={n}
                  checked={rating === n}
                  onChange={() => setRating(n)}
                  className="peer sr-only"
                />
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill={n <= shown ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                  className="rounded text-marigold-dark transition-transform duration-150 hover:scale-110 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink"
                  aria-hidden="true"
                >
                  <path d={PATH} />
                </svg>
                <span className="sr-only">
                  {n} star{n > 1 ? "s" : ""}, {WORDS[n]}
                </span>
              </label>
            ))}
          </div>
          <span className="ui text-sm text-muted" aria-live="polite">
            {WORDS[shown]}
          </span>
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="r-name" className="mb-1 block text-sm font-medium text-ink">
            Your name
          </label>
          <input id="r-name" name="name" required minLength={2} maxLength={60} autoComplete="name" className={field} placeholder="As you want it shown" />
        </div>
        <div>
          <label htmlFor="r-type" className="mb-1 block text-sm font-medium text-ink">
            What did we do for you? <span className="font-normal text-muted">(optional)</span>
          </label>
          <select id="r-type" name="projectType" defaultValue="" className={field}>
            <option value="">Select one</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="r-body" className="mb-1 block text-sm font-medium text-ink">
          Your review
        </label>
        <textarea
          id="r-body"
          name="body"
          required
          minLength={20}
          maxLength={1000}
          rows={6}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className={field}
          placeholder="What was the project, and how was working with us?"
        />
        <p className="mt-1 text-right text-xs text-muted tabular-nums">{body.length} / 1000</p>
      </div>

      <div>
        <label htmlFor="r-email" className="mb-1 block text-sm font-medium text-ink">
          Email <span className="font-normal text-muted">(optional, we will email you a confirmation)</span>
        </label>
        <input id="r-email" name="email" type="email" maxLength={120} autoComplete="email" className={field} placeholder="you@example.com" />
      </div>

      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[#18264a]" />
        <span>I am happy for Arckey to show my name and review on this website.</span>
      </label>

      <button
        type="submit"
        disabled={state === "sending"}
        className="ui w-full rounded-md bg-ink px-6 py-3.5 text-base font-semibold text-chalk transition-all duration-200 hover:bg-ink-deep active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Post my review"}
      </button>

      {error && (
        <p role="alert" className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900">
          {error}
        </p>
      )}
    </form>
  );
}
