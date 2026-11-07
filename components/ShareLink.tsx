"use client";

import { useState } from "react";

export default function ShareLink({ url, message }: { url: string; message?: string }) {
  const [copied, setCopied] = useState(false);
  const text = message ?? "I would love your feedback on our project with Arckey Interiors and Construction. You can leave a review here:";
  const wa = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link", url);
    }
  }

  const btn =
    "ui rounded-md border border-rule px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" onClick={copy} className={btn}>
        {copied ? "Link copied" : "Copy review link"}
      </button>
      <a href={wa} target="_blank" rel="noopener noreferrer" className={btn}>
        Share on WhatsApp
      </a>
      <span className="sr-only" aria-live="polite">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
