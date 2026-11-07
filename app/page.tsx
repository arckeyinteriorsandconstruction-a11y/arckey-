import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import HeroPlan from "@/components/HeroPlan";
import ProcessTimeline from "@/components/ProcessTimeline";
import ReviewsSection from "@/components/ReviewsSection";
import { FAQS, PROCESS, SITE, WHY, WORK } from "@/lib/site";
import { SERVICES } from "@/lib/services";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  telephone: SITE.phoneTel,
  founder: { "@type": "Person", name: "Arti Gupta" },
  parentOrganization: { "@type": "Organization", name: SITE.parentCompany.name, url: SITE.parentCompany.url },
  address: {
    "@type": "PostalAddress",
    streetAddress: "105, Pearl Business Park, Netaji Subhash Place",
    addressLocality: "Delhi",
    addressCountry: "IN",
  },
  areaServed: "Delhi NCR",
  sameAs: [SITE.instagram, SITE.googleProfile],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  inLanguage: "en-IN",
};

// Reviews on the home page refresh at most once a minute, and instantly when you approve one.
export const revalidate = 60;

const ld = (o: object) => JSON.stringify(o).replace(/</g, "\\u003c");

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(websiteLd) }} />
      <Header />

      <main id="top">
        {/* Hero */}
        <section className="blueprint on-dark overflow-hidden text-chalk">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <h1 className="text-[2.6rem] sm:text-6xl lg:text-[4.25rem]">
                Interior design and construction in Delhi NCR
              </h1>
              <p className="mt-6 max-w-lg text-xl text-chalk/80">
                Planned on paper, built on site by one team. Homes, offices and kitchens, from first sketch to handover.
              </p>
              <div className="ui mt-9 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="rounded-md bg-marigold px-7 py-3.5 font-semibold text-ink-deep transition-colors hover:bg-chalk"
                >
                  Book a free consultation
                </a>
                <a
                  href="#work"
                  className="rounded-md border border-chalk/30 px-7 py-3.5 font-semibold transition-colors hover:border-chalk"
                >
                  See what we build
                </a>
              </div>
            </div>
            <div className="mx-auto w-full max-w-lg lg:max-w-none">
              <HeroPlan />
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-4xl text-ink sm:text-5xl">What we design and build</h2>
              <p className="mt-5 text-muted">
                From a single modular kitchen to a complete turnkey build. Open any service for what is included.
              </p>
            </div>
            <ul className="border-t border-rule lg:col-span-8">
              {SERVICES.map((s) => (
                <li key={s.slug} className="group relative border-b border-rule">
                  <span
                    aria-hidden="true"
                    className="row-bar absolute -left-px top-0 h-full w-[3px] bg-marigold"
                  />
                  <Link
                    href={`/services/${s.slug}`}
                    className="grid gap-2 py-6 pl-5 pr-2 transition-[padding] duration-300 group-hover:pl-7 sm:grid-cols-[1fr_1.2fr] sm:gap-8"
                  >
                    <h3 className="text-xl text-ink sm:text-2xl">{s.title}</h3>
                    <p className="text-muted">{s.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="bg-plaster py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="max-w-xl text-4xl text-ink sm:text-5xl">From site visit to handover</h2>
            <div className="mt-14">
              <ProcessTimeline steps={PROCESS} />
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-4xl text-ink sm:text-5xl">A Delhi studio that also builds</h2>
            <p className="mt-6">
              Arckey Interiors and Construction is led by owner and lead designer {SITE.owner}. We design and build
              homes and workplaces across Delhi NCR, combining modern design with Vastu-aware planning and careful
              site execution.
            </p>
            <p className="mt-4">
              Arckey is part of the{" "}
              <a
                href={SITE.parentCompany.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink underline decoration-marigold decoration-2 underline-offset-4 hover:decoration-ink"
              >
                {SITE.parentCompany.name}
              </a>{" "}
              group.
            </p>
            <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-md">
              <Image
                src="/work/design-consultation.webp"
                alt="Floor plans, colour swatches and interior photos laid out on a designer's desk"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <ul className="grid content-start gap-x-10 gap-y-9 sm:grid-cols-2 lg:col-span-7 lg:pt-3">
            {WHY.map((w) => (
              <li key={w.title} className="border-t border-rule pt-5">
                <h3 className="text-xl text-ink">{w.title}</h3>
                <p className="mt-2 text-muted">{w.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Work */}
        <section id="work" className="bg-plaster py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="max-w-xl text-4xl text-ink sm:text-5xl">Spaces we design</h2>
            <div className="mt-12 grid auto-rows-fr gap-4 sm:grid-cols-4">
              {WORK.map((w) => (
                <figure
                  key={w.title}
                  className={`relative flex flex-col justify-end overflow-hidden rounded-md p-6 ${w.layout} ${
                    w.image ? "bg-ink-deep text-chalk" : w.swatch
                  }`}
                >
                  {w.image ? (
                    <>
                      <Image
                        src={w.image}
                        alt={w.alt ?? w.title}
                        fill
                        sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                        style={{ objectPosition: w.position }}
                       
                      />
                      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-deep/90 via-ink-deep/40 to-transparent" />
                    </>
                  ) : (
                    w.hatch && <div aria-hidden="true" className="hatch absolute inset-0" />
                  )}
                  <figcaption className="relative">
                    <span className="ui block text-sm opacity-80">{w.tag}</span>
                    <span className="ui block text-2xl font-semibold tracking-tight">{w.title}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-8 text-muted">
              Recent work is on our{" "}
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink underline decoration-marigold decoration-2 underline-offset-4 hover:decoration-ink"
              >
                Instagram page
              </a>
              .
            </p>
          </div>
        </section>

        {/* Reviews */}
        <ReviewsSection />

        {/* FAQ */}
        <section id="faq" className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16">
          <h2 className="text-4xl text-ink sm:text-5xl lg:col-span-4">Questions we hear often</h2>
          <div className="border-t border-rule lg:col-span-8">
            {FAQS.map((f) => (
              <details key={f.q} className="group border-b border-rule py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-6 text-lg font-medium text-ink">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="relative h-4 w-4 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-0.5 before:w-full before:-translate-y-1/2 before:bg-ink after:absolute after:left-1/2 after:top-0 after:h-full after:w-0.5 after:-translate-x-1/2 after:bg-ink after:transition-transform after:duration-300 group-open:after:scale-y-0"
                  />
                </summary>
                <p className="faq-body mt-3 max-w-2xl text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="blueprint on-dark py-20 text-chalk sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-4xl sm:text-5xl">Plan your space with us</h2>
              <p className="mt-5 max-w-md text-chalk/80">
                Share a few details and we will call you back to arrange a free consultation.
              </p>
              <dl className="mt-10 space-y-7">
                <div>
                  <dt className="ui text-sm text-marigold">Call</dt>
                  <dd className="mt-1">
                    <a href={`tel:${SITE.phoneTel}`} className="ui text-2xl font-medium hover:text-marigold">
                      {SITE.phoneDisplay}
                    </a>
                    <span className="block text-chalk/70">{SITE.owner}</span>
                  </dd>
                </div>
                <div>
                  <dt className="ui text-sm text-marigold">Visit</dt>
                  <dd className="mt-1 text-chalk/90">
                    <address className="not-italic">
                      {SITE.addressLines.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </address>
                  </dd>
                </div>
                <div className="ui flex flex-wrap gap-3 text-sm">
                  {[
                    { label: "WhatsApp", href: SITE.whatsapp },
                    { label: "Instagram", href: SITE.instagram },
                    { label: "Google Business Profile", href: SITE.googleProfile },
                  ].map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md border border-chalk/25 px-4 py-2 transition-colors hover:border-marigold hover:text-marigold"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </dl>
            </div>

            <div className="rounded-lg bg-chalk p-6 text-body sm:p-8">
              <ContactForm />
            </div>
          </div>
        </section>
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
