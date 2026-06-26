import type { MetadataRoute } from "next";
import { EVENTS } from "@/constants/events";
import { KIT } from "@/constants/shop";
import { SITE } from "@/constants/site";
import { absoluteUrl, SITE_UPDATED_AT } from "@/lib/seo";

/**
 * Site map for crawlers. Lists the indexable routes only.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");

  const routes: Array<{
    path: string;
    priority: number;
    changeFrequency: "weekly" | "monthly" | "yearly";
    lastModified: string;
    images?: string[];
  }> = [
    {
      path: "/",
      priority: 1,
      changeFrequency: "weekly",
      lastModified: SITE_UPDATED_AT,
      images: ["/assets/sunset-rider.jpg"],
    },
    {
      path: "/eventi",
      priority: 0.9,
      changeFrequency: "weekly",
      lastModified: SITE_UPDATED_AT,
      images: EVENTS.map((event) => event.poster),
    },
    {
      path: "/shop",
      priority: 0.7,
      changeFrequency: "monthly",
      lastModified: SITE_UPDATED_AT,
      images: [KIT.image],
    },
    {
      path: "/contatti",
      priority: 0.6,
      changeFrequency: "yearly",
      lastModified: SITE_UPDATED_AT,
    },
  ];

  const eventRoutes = EVENTS.map((event) => ({
    path: `/eventi/${event.slug}`,
    priority: 0.8,
    changeFrequency: "weekly" as const,
    lastModified: event.date.iso ?? SITE_UPDATED_AT,
    images: [event.poster],
  }));

  return [...routes, ...eventRoutes].map((r) => ({
    url: `${base}${r.path}`,
    lastModified: r.lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
    images: r.images?.map((image) => absoluteUrl(image)),
  }));
}
