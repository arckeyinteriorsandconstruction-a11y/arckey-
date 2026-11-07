import Link from "next/link";
import ReviewList from "@/components/ReviewList";
import Stars from "@/components/Stars";
import { approvedStats, listApproved } from "@/lib/reviews";

export default async function ReviewsSection() {
  const [reviews, stats] = await Promise.all([listApproved(4), approvedStats()]);
  const btn = "ui rounded-md px-6 py-3 font-semibold transition-colors";

  return (
    <section id="reviews" className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl text-ink sm:text-5xl">What our clients say</h2>
          {stats.count > 0 && (
            <p className="ui mt-4 flex items-center gap-3 text-muted">
              <Stars value={stats.average} size={22} />
              <span>
                {stats.average.toFixed(1)} from {stats.count} {stats.count === 1 ? "review" : "reviews"}
              </span>
            </p>
          )}
        </div>
        <Link href="/review" className={`${btn} bg-ink text-chalk hover:bg-ink-deep`}>
          Write a review
        </Link>
      </div>

      {reviews.length > 0 ? (
        <div className="mt-12">
          <ReviewList reviews={reviews} columns={2} />
          {stats.count > reviews.length && (
            <Link
              href="/reviews"
              className="ui mt-10 inline-block font-medium text-ink underline decoration-marigold decoration-2 underline-offset-4 hover:decoration-ink"
            >
              Read all {stats.count} reviews
            </Link>
          )}
        </div>
      ) : (
        <div className="mt-12 border-t border-rule pt-8">
          <p className="max-w-xl text-muted">
            No reviews yet. If we have worked together, we would be glad to hear how it went.
          </p>
        </div>
      )}
    </section>
  );
}
