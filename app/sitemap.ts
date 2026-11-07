import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/reviews`, changeFrequency: "weekly" as const, priority: 0.6 },
    ...SERVICES.map((s) => ({
      url: `${SITE.url}/services/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
