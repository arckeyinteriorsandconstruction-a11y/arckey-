"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";

const field =
  "w-full rounded-md border border-rule bg-white px-4 py-3 text-base text-body placeholder:text-muted/70 transition-colors focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/20";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!SITE.formspreeId) {
      setStatus("error");
      setMessage(
        `The form is not connected yet. Please call us on ${SITE.phoneDisplay} or message us on WhatsApp.`,
      );
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch(`https://formspree.io/f/${SITE.formspreeId}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (res.ok) {
        form.reset();
        setStatus("success");
        setMessage("Request received. We will call you back shortly.");
      } else {
        const data = await res.json().catch(() => null);
        setStatus("error");
        setMessage(
          data?.errors?.map((x: { message: string }) => x.message).join(", ") ||
            "We could not send your request. Please try again or call us directly.",
        );
      }
    } catch {
      setStatus("error");
      setMessage("We could not reach the server. Check your connection and try again, or call us directly.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Honeypot for bots; Formspree ignores submissions where this is filled. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />
      <input type="hidden" name="_subject" value="New enquiry from the Arckey website" />

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-ink">
          Full name
        </label>
        <input id="name" name="name" type="text" required autoComplete="name" className={field} placeholder="Your name" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-ink">
            Mobile number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            pattern="[0-9+\s\-]{10,15}"
            className={field}
            placeholder="98XXXXXXXX"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink">
            Email <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id="email" name="email" type="email" autoComplete="email" className={field} placeholder="you@example.com" />
        </div>
      </div>

      <div>
        <label htmlFor="budget" className="mb-1 block text-sm font-medium text-ink">
          Estimated budget
        </label>
        <select id="budget" name="budget" defaultValue="" className={field}>
          <option value="">Select a range</option>
          <option>Below ₹5 Lakh</option>
          <option>₹5 – 10 Lakh</option>
          <option>₹10 Lakh and above</option>
        </select>
      </div>

      <div>
        <label htmlFor="query" className="mb-1 block text-sm font-medium text-ink">
          Tell us about your project
        </label>
        <textarea
          id="query"
          name="message"
          rows={4}
          required
          className={field}
          placeholder="Type of space, location, what you have in mind"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-md bg-ink px-6 py-3.5 text-base font-semibold text-chalk transition-all duration-200 hover:bg-ink-deep active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request a callback"}
      </button>

      <p className="text-sm text-muted">The first consultation is free and carries no obligation.</p>

      <p
        role="status"
        aria-live="polite"
        className={
          status === "success"
            ? "rounded-md border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
            : status === "error"
              ? "rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900"
              : "sr-only"
        }
      >
        {message}
      </p>
    </form>
  );
}
