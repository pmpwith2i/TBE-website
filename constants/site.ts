/**
 * Site-wide DATA / configuration only — brand, navigation, social profiles,
 * footer links. Page copy lives directly in the page TSX files, not here.
 * Sponsors live in `constants/sponsors.ts`. Keep this file for things you'd
 * actually edit as data.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface SocialLink {
  platform: "instagram" | "facebook";
  label: string;
  href: string;
}

export interface SiteInstructor {
  name: string;
  role: string;
}

export const SITE = {
  name: "Teramo Bike Experience",
  shortName: "TBE",
  legalName: "ASD TERAMO BIKE EXPERIENCE",
  description:
    "ASD di ciclismo a Teramo, affiliata FCI e CSI. Uscite di gruppo, eventi e squadra per pedalare insieme nel teramano.",
  affiliation: "Affiliata FCI e CSI",
  affiliationDetail:
    "Affiliata FCI e CSI, con due tecnici istruttori di secondo livello FCI (Daniele Di Odoardo e Davide Danesi) e due istruttori/tecnici sportivi di Cicloturismo di primo livello CSI (Renzo Miracoli e Davide Danesi).",
  address: "VIA F BRANDIMARTE 2 - 64100 - TERAMO (TE)",
  addressParts: {
    streetAddress: "Via F Brandimarte 2",
    postalCode: "64100",
    addressLocality: "Teramo",
    addressRegion: "TE",
    addressCountry: "IT",
  },
  vat: "P.IVA 02190880670",
  vatNumber: "02190880670",
  url: "https://teramobikeexperience.it",
  instagram: "https://www.instagram.com/teramobikeexperience/",
  facebook: "https://www.facebook.com/p/Teramo-Bike-Experience-61573736592702/",
  instructors: [
    {
      name: "Daniele Di Odoardo",
      role: "Tecnico istruttore di secondo livello FCI",
    },
    {
      name: "Davide Danesi",
      role: "Tecnico istruttore di secondo livello FCI e istruttore/tecnico sportivo Cicloturismo di primo livello CSI",
    },
    {
      name: "Renzo Miracoli",
      role: "Istruttore/tecnico sportivo Cicloturismo di primo livello CSI",
    },
  ] satisfies SiteInstructor[],
  logos: {
    appIcon: "/web-app-manifest-512x512.png",
    badge: "/assets/logo-badge.png",
    wordmark: "/assets/logo-wordmark.png",
  },
  copyright: "© 2026 Teramo Bike Experience · Tutti i diritti riservati",
} as const;

/** Primary navigation, in display order. */
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Eventi", href: "/eventi" },
  { label: "Shop", href: "/shop" },
  { label: "Contatti", href: "/contatti" },
];

/** Nav call-to-action (right side of the bar). */
export const NAV_CTA = { label: "Contattaci", href: "/contatti" };

/** Brand lockup as three stacked words (the middle one gets the red bar). */
export const BRAND_LOCKUP = ["Teramo", "Bike", "Experience"] as const;

/** The only contact channels: our social profiles. */
export const SOCIALS: SocialLink[] = [
  { platform: "instagram", label: "Instagram", href: SITE.instagram },
  { platform: "facebook", label: "Facebook", href: SITE.facebook },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Esplora",
    links: [
      { label: "Eventi", href: "/eventi" },
      { label: "Shop", href: "/shop" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
];
