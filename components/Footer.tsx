import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="on-dark bg-ink-deep py-10 text-sm text-chalk/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © 2026 {SITE.name}. A {SITE.parentCompany.name} company.
        </p>
        <p>{SITE.addressOneLine}</p>
      </div>
    </footer>
  );
}
