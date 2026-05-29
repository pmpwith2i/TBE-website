/**
 * Site-wide configuration — brand, navigation, footer, sponsors.
 * Change global elements here and they update on every page.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface NavCta {
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
  coordinates: "42°39'N 13°42'E",
  season: "Stagione 2026",
  edition: "N°09",
  description:
    "Una squadra di ciclismo nata a Teramo. Un gruppo di amici uniti dalla passione per la bici, tra le strade dell'Abruzzo.",
  email: "info@teramobike.it",
  phone: "+39 0861 123 456",
  phoneHref: "tel:+390861123456",
  whatsapp: "+39 333 123 4567",
  whatsappHref: "https://wa.me/393331234567",
  url: "https://teramobike.it",
  instagram: "https://www.instagram.com/teramobikeexperience/",
  facebook: "https://www.facebook.com/p/Teramo-Bike-Experience-61573736592702/",
  logos: {
    badge: "/assets/logo-badge.png",
    wordmark: "/assets/logo-wordmark.png",
  },
  copyright: "© 2026 Teramo Bike Experience · Tutti i diritti riservati",
  madeWith: "Made with ☕ in Abruzzo",
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

/** Default nav call-to-action (most pages). Pages may override. */
export const NAV_CTA_DEFAULT: NavCta = { label: "Unisciti", href: "/contatti" };

/** Brand lockup as three stacked words (the middle one gets the red bar). */
export const BRAND_LOCKUP = ["Teramo", "Bike", "Experience"] as const;

/** The only contact channels: our social profiles. */
export const SOCIALS: SocialLink[] = [
  {
    platform: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/teramobikeexperience/",
  },
  {
    platform: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/p/Teramo-Bike-Experience-61573736592702/",
  },
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
