import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ReviewList from "@/components/ReviewList";
import ShareLink from "@/components/ShareLink";
import Stars from "@/components/Stars";
import { approvedStats, listApproved } from "@/lib/reviews";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Client Reviews",
  description: "Read what clients say about working with Arckey Interiors and Construction in Delhi NCR, and share your own experience.",
  alternates: { canonical: "/reviews" },
};

export default async function ReviewsPage() {
  const [reviews, stats] = await Promise.all([listApproved(100), approvedStats()]);

  return (
    <>
      <Header />
      <main>
        <section className="blueprint on-dark text-chalk">
          <div className="mx-auto max-w-4xl px-5 py-16 sm:py-24">
            <h1 className="text-4xl sm:text-6xl">Client reviews</h1>
            {stats.count > 0 ? (
              <p className="ui mt-6 flex flex-wrap items-center gap-3 text-lg text-chalk/80">
                <Stars value={stats.average} size={24} className="text-marigold" />
                {stats.average.toFixed(1)} from {stats.count} {stats.count === 1 ? "review" : "reviews"}
              </p>
            ) : (
              <p className="mt-6 max-w-xl text-lg text-chalk/80">Reviews from our clients will appear here.</p>
            )}
            <div className="ui mt-8">
              <Link
                href="/review"
                className="inline-block rounded-md bg-marigold px-7 py-3.5 font-semibold text-ink-deep transition-colors hover:bg-chalk"
              >
                Write a review
              </Link>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-5 py-16">
          {reviews.length > 0 ? (
            <ReviewList reviews={reviews} />
          ) : (
            <p className="max-w-xl text-muted">
              No reviews yet. If we have worked together, you can be the first to share your experience.
            </p>
          )}

          <div className="mt-16 border-t border-rule pt-8">
            <h2 className="text-2xl text-ink">Worked with Arckey?</h2>
            <p className="mb-4 mt-2 max-w-xl text-muted">
              Share this page with friends, family or colleagues we have worked with so they can leave a review too.
            </p>
            <ShareLink url={`${SITE.url}/review`} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
