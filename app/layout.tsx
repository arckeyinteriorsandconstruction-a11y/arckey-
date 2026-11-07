import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE } from "@/lib/site";

const display = localFont({
  src: "./fonts/bricolage.woff2",
  variable: "--font-display",
  weight: "200 800",
  display: "swap",
});

const text = localFont({
  src: "./fonts/newsreader.woff2",
  variable: "--font-text",
  weight: "200 800",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Interior Designers & Builders in Delhi NCR`,
    template: `%s | ${SITE.shortName}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "interior designers in Delhi",
    "interior design Delhi NCR",
    "modular kitchen Delhi",
    "office interior design Delhi",
    "turnkey interior projects",
    "construction and renovation Delhi",
    "Arckey Interiors and Construction",
  ],
  formatDetection: { telephone: true, address: true },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE.name,
    title: `${SITE.name} | Interior Designers & Builders in Delhi NCR`,
    description: SITE.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#18264a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${text.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
