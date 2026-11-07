"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`on-dark sticky top-0 z-50 bg-ink-deep/95 text-chalk backdrop-blur transition-shadow duration-300 ${
        scrolled ? "shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="ui flex items-baseline gap-3" aria-label="Arckey Interiors and Construction, home">
          <span className="text-2xl font-semibold tracking-tight">Arckey</span>
          <span className="hidden text-sm text-chalk/60 sm:inline">Interiors and Construction</span>
        </Link>

        <nav className="ui hidden items-center gap-7 text-[0.95rem] lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={`/${n.href}`}
              className="relative py-1 text-chalk/80 transition-colors hover:text-chalk after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-marigold after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {n.label}
            </Link>
          ))}
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-marigold px-4 py-2 font-semibold text-ink-deep transition-colors hover:bg-chalk"
          >
            Get a free estimate
          </a>
        </nav>

        <button
          type="button"
          className="rounded-md p-2 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="ui border-t border-chalk/10 px-5 pb-5 lg:hidden" aria-label="Mobile">
          <ul className="flex flex-col py-2">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={`/${n.href}`} onClick={() => setOpen(false)} className="block py-3 text-lg">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-md bg-marigold px-5 py-3 text-center font-semibold text-ink-deep"
          >
            Get a free estimate
          </a>
        </nav>
      )}
    </header>
  );
}
