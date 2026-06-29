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

export const SITE_UPDATED_AT = "2026-06-29";

export const DEFAULT_TITLE = `${SITE.name} — ASD ciclismo Teramo`;

/** Default OG/Twitter share image (a real team photo). */
export const OG_IMAGE = {
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
  "cicloturismo Teramo",
  "MTB Teramo",
  "gravel Teramo",
  "ciclismo Gran Sasso",
  "bici Gran Sasso",
  "salite Gran Sasso bici",
];

export const DEFAULT_DESCRIPTION = SITE.description;

type PageSeoImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

type PageSeoInput = {
  /** Page title; omit on the home page to use the site default. */
  title?: string;
  description: string;
  path: string;
  /** Extra keywords specific to the page. */
  keywords?: string[];
  /** Optional page-specific share image. */
  image?: PageSeoImage;
  /** Set false for thin/placeholder pages that shouldn't be indexed. */
  index?: boolean;
};

export function absoluteUrl(path: string) {
  return new URL(path, SITE.url).toString();
}

/**
 * Trim text to a meta-description-friendly length, cutting on a word
 * boundary so descriptions don't get awkwardly chopped by search engines
 * (Google renders roughly the first ~160 characters).
 */
export function truncate(text: string, max = 160) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) {
    return clean;
  }

  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const trimmed = (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(
    /[\s.,;:–—-]+$/u,
    ""
  );

  return `${trimmed}…`;
}

function normalizePath(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export function pageSeo({
  title,
  description,
  path,
  keywords = [],
  image = OG_IMAGE,
  index = true,
}: PageSeoInput): Metadata {
  const fullTitle = title ? `${title} — ${SITE.name}` : DEFAULT_TITLE;
  const canonicalPath = normalizePath(path);

  return {
    ...(title ? { title } : {}),
    description,
    keywords: Array.from(new Set([...BASE_KEYWORDS, ...keywords])),
    alternates: { canonical: canonicalPath },
    ...(index
      ? {}
      : {
          robots: {
            index: false,
            follow: false,
            googleBot: { index: false, follow: false },
          },
        }),
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalPath,
      siteName: SITE.name,
      locale: "it_IT",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
  };
}
