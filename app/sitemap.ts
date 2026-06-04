import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";

/**
 * Site map for crawlers. Lists the indexable routes only — the cronoscalata
 * stub is intentionally excluded (it's a no-index placeholder).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const lastModified = new Date();

  const routes: Array<{
    path: string;
    priority: number;
    changeFrequency: "weekly" | "monthly" | "yearly";
  }> = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/eventi", priority: 0.9, changeFrequency: "weekly" },
    { path: "/vision", priority: 0.8, changeFrequency: "monthly" },
    { path: "/team", priority: 0.8, changeFrequency: "monthly" },
    { path: "/shop", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contatti", priority: 0.6, changeFrequency: "yearly" },
  ];

  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
