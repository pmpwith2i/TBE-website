import type { Metadata } from "next";
import { SITE } from "@/constants/site";

/**
 * SEO config + a small helper that assembles per-page `Metadata`.
 *
 * Italian local-SEO keyword pools (no "Abruzzo" — Teramo / Gran Sasso /
 * teramano landmarks instead, per brand preference). Page titles and
 * descriptions are passed in from each page so the copy stays at the page;
 * this file only handles the boilerplate (canonical, Open Graph, Twitter,
 * keyword merging).
 */

/** Default OG/Twitter share image (a real team photo). */
const OG_IMAGE = {
  url: "/assets/sunset-rider.jpg",
  alt: "Teramo Bike Experience — un'uscita in bici al tramonto",
};

/** Site-wide keywords, prepended to every page's keyword list. */
export const BASE_KEYWORDS = [
  "Teramo Bike Experience",
  "squadra ciclismo Teramo",
  "ciclismo Teramo",
  "gruppo ciclistico Teramo",
  "uscite in bici Teramo",
  "ASD ciclismo Teramo",
  "team ciclismo teramano",
  "pedalare a Teramo",
  "ciclismo Gran Sasso",
  "bici Gran Sasso",
];

export const DEFAULT_DESCRIPTION =
  "Squadra di ciclismo a Teramo: usciamo in bici insieme ogni settimana, aperti a tutti i livelli. Chi vuole gareggiare può farlo, senza rinunciare al piacere di pedalare in compagnia.";

type PageSeoInput = {
  /** Page title; omit on the home page to use the site default. */
  title?: string;
  description: string;
  /** Absolute path from the site root, e.g. "/vision". */
  path: string;
  /** Extra keywords specific to the page. */
  keywords?: string[];
  /** Set false for thin/placeholder pages that shouldn't be indexed. */
  index?: boolean;
};

export function pageSeo({
  title,
  description,
  path,
  keywords = [],
  index = true,
}: PageSeoInput): Metadata {
  const fullTitle = title
    ? `${title} — ${SITE.name}`
    : `${SITE.name} — Una squadra di amici`;

  return {
    ...(title ? { title } : {}),
    description,
    keywords: [...BASE_KEYWORDS, ...keywords],
    alternates: { canonical: path },
    ...(index ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE.name,
      locale: "it_IT",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
