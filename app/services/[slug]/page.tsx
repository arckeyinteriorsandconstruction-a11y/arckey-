import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { SERVICES, getService } from "@/lib/services";
import { SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  const path = `/services/${s.slug}`;
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: `${s.metaTitle} | ${SITE.shortName}`,
      description: s.metaDescription,
      url: path,
      images: ["/opengraph-image"],
    },
    twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
  };
}

const ld = (o: object) => JSON.stringify(o).replace(/</g, "\\u003c");

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const url = `${SITE.url}/services/${s.slug}`;
  const others = SERVICES.filter((x) => x.slug !== s.slug);

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.h1,
    serviceType: s.title,
    description: s.metaDescription,
    url,
    areaServed: { "@type": "AdministrativeArea", name: "Delhi NCR" },
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: SITE.name,
      url: SITE.url,
      telephone: SITE.phoneTel,
      address: {
        "@type": "PostalAddress",
        streetAddress: "105, Pearl Business Park, Netaji Subhash Place",
        addressLocality: "Delhi",
        addressCountry: "IN",
      },
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/#services` },
      { "@type": "ListItem", position: 3, name: s.title, item: url },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(faqLd) }} />
      <Header />

      <main>
        <section className="blueprint on-dark text-chalk">
          <div className="mx-auto max-w-4xl px-5 py-16 sm:py-24">
            <nav aria-label="Breadcrumb" className="ui mb-6 text-sm text-chalk/60">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-marigold">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/#services" className="hover:text-marigold">
                    Services
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-chalk">
                  {s.title}
                </li>
              </ol>
            </nav>
            <h1 className="text-4xl sm:text-6xl">{s.h1}</h1>
            <p className="mt-6 max-w-2xl text-lg text-chalk/80">{s.intro}</p>
            <div className="ui mt-8 flex flex-wrap gap-4">
              <Link
                href="/#contact"
                className="rounded-md bg-marigold px-7 py-3.5 font-semibold text-ink-deep transition-colors hover:bg-chalk"
              >
                Book a free consultation
              </Link>
              <a
                href={`tel:${SITE.phoneTel}`}
                className="rounded-md border border-chalk/30 px-7 py-3.5 font-semibold transition-colors hover:border-chalk"
              >
                Call {SITE.phoneDisplay}
              </a>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl space-y-16 px-5 py-16">
          <section aria-labelledby="included">
            <h2 id="included" className="text-3xl text-ink sm:text-4xl">
              What is included
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {s.included.map((i) => (
                <li key={i} className="border-t border-rule pt-4">
                  {i}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="suitable">
            <h2 id="suitable" className="text-3xl text-ink sm:text-4xl">
              Who this is for
            </h2>
            <ul className="mt-6 list-disc space-y-2 pl-5 text-body">
              {s.suitableFor.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="advice">
            <h2 id="advice" className="text-3xl text-ink sm:text-4xl">
              What to keep in mind
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {s.considerations.map((c) => (
                <div key={c.title}>
                  <h3 className="text-xl text-ink">{c.title}</h3>
                  <p className="mt-2 text-muted">{c.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="faq">
            <h2 id="faq" className="text-3xl text-ink sm:text-4xl">
              Questions about {s.title.toLowerCase()}
            </h2>
            <div className="mt-6 divide-y divide-y divide-rule border-y border-rule">
              {s.faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                    {f.q}
                    <span aria-hidden="true" className="text-ink transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="faq-body mt-3 text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section aria-labelledby="more">
            <h2 id="more" className="text-3xl text-ink sm:text-4xl">
              Other services
            </h2>
            <ul className="ui mt-6 flex flex-wrap gap-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/services/${o.slug}`}
                    className="inline-block rounded-md border border-rule px-5 py-2 text-sm transition-colors hover:border-ink"
                  >
                    {o.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <aside className="blueprint on-dark rounded-lg p-8 text-chalk">
            <h2 className="text-3xl">Talk to Arckey</h2>
            <p className="mt-3 text-chalk/80">
              {SITE.addressOneLine}. Call {SITE.owner} on{" "}
              <a href={`tel:${SITE.phoneTel}`} className="underline underline-offset-4">
                {SITE.phoneDisplay}
              </a>{" "}
              or{" "}
              <Link href="/#contact" className="underline underline-offset-4">
                request a callback
              </Link>
              .
            </p>
          </aside>
        </div>
      </main>

      <footer className="on-dark bg-ink-deep py-10 text-sm text-chalk/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {SITE.name}. A {SITE.parentCompany.name} company.
          </p>
          <p>{SITE.addressOneLine}</p>
        </div>
      </footer>
    </>
  );
}
