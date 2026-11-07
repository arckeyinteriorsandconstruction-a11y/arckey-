import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ReviewForm from "@/components/ReviewForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Write a review",
  description: "Share your experience of working with Arckey Interiors and Construction.",
  alternates: { canonical: "/review" },
  robots: { index: false, follow: true },
};

export default function WriteReviewPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-5 py-14 sm:py-20">
        <h1 className="text-4xl text-ink sm:text-5xl">Share your experience with Arckey</h1>
        <p className="mt-5 text-muted">
          Your review helps other families and businesses decide who to work with. It takes about a minute.
        </p>
        <div className="mt-10 rounded-lg border border-rule bg-white p-6 sm:p-8">
          <ReviewForm shareUrl={`${SITE.url}/review`} />
        </div>
        <p className="mt-8 text-sm text-muted">
          Want to read reviews first?{" "}
          <Link href="/reviews" className="font-medium text-ink underline decoration-marigold decoration-2 underline-offset-4">
            See client reviews
          </Link>
          .
        </p>
      </main>
      <Footer />
    </>
  );
}
