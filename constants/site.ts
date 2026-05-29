/**
 * Site-wide DATA / configuration only — brand, navigation, social profiles,
 * footer links, sponsor list. Page copy lives directly in the page TSX files,
 * not here. Keep this file for things you'd actually edit as data.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface Sponsor {
  name: string;
  detail: string;
}

export interface SocialLink {
  platform: "instagram" | "facebook";
  label: string;
  href: string;
}

export const SITE = {
  name: "Teramo Bike Experience",
  shortName: "TBE",
  legalName: "ASD Teramo Bike Experience",
  affiliation: "Affiliata CSI",
  address: "Via delle Aquile 14, 64100 Teramo (TE)",
  vat: "P.IVA 01987650670",
  url: "https://teramobike.it",
  instagram: "https://www.instagram.com/teramobikeexperience/",
  facebook: "https://www.facebook.com/p/Teramo-Bike-Experience-61573736592702/",
  logos: {
    badge: "/assets/logo-badge.png",
    wordmark: "/assets/logo-wordmark.png",
  },
  copyright: "© 2026 Teramo Bike Experience · Tutti i diritti riservati",
  madeWith: "Made with ☕ a Teramo",
} as const;

/** Primary navigation, in display order. */
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Vision", href: "/vision" },
  { label: "Team", href: "/team" },
  { label: "Eventi", href: "/eventi" },
  { label: "Shop", href: "/shop" },
  { label: "Contatti", href: "/contatti" },
];

/** Nav call-to-action (right side of the bar). */
export const NAV_CTA = { label: "Unisciti", href: "/contatti" };

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
      { label: "Vision", href: "/vision" },
      { label: "Team", href: "/team" },
      { label: "Eventi", href: "/eventi" },
      { label: "Shop", href: "/shop" },
    ],
  },
];

/** Sponsor wall shown on the home page. */
export const SPONSORS: Sponsor[] = [
  { name: "Di Mattia Fiore", detail: "Impresa di Costruzioni" },
  { name: "EcoVerde", detail: "Energia" },
  { name: "Brian's", detail: "Bike Shop" },
  { name: "Vischia", detail: "Autocarrozzeria" },
  { name: "Alpic", detail: "Sportswear" },
  { name: "Decar", detail: "Ford Partner" },
  { name: "Pallini", detail: "Gioielleria · dal 1966" },
  { name: "D'Onofrio", detail: "Farmacia" },
  { name: "GI.MA", detail: "Pulizie · Giardinaggio" },
  { name: "Fisioste", detail: "Fisioterapia" },
  { name: "CSI", detail: "Centro Sportivo Italiano" },
  { name: "+ Diventa partner", detail: "Scrivici sui social" },
];
