import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-5 text-center">
      <p className="ui text-sm text-muted">404</p>
      <h1 className="mt-3 text-4xl text-ink">This page could not be found</h1>
      <p className="mt-4 text-muted">The page may have moved. Our services and contact details are on the home page.</p>
      <Link href="/" className="mt-8 ui rounded-md bg-ink px-7 py-3 font-semibold text-chalk transition-colors hover:bg-ink-deep">
        Back to Arckey
      </Link>
    </main>
  );
}
