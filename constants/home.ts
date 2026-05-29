/**
 * Home page content. All copy and figures live here.
 * The agenda strip & featured event reference data shaped like the events file.
 */

export const HOME_HERO = {
  eyebrowNum: "/01",
  eyebrowText: "Teramo · Abruzzo · Italia",
  metaTop: "Stagione 2026 · N°09",
  metaBig: "42°39'N 13°42'E",
  /** Three lines: plain, accent (red), outline (stroked). */
  title: [
    { text: "Una squadra", variant: "plain" as const },
    { text: "di amici,", variant: "accent" as const },
    { text: "a Teramo.", variant: "outline" as const },
  ],
  paragraph:
    "Una squadra di ciclismo nata a Teramo, ai piedi del Gran Sasso. Un gruppo di amici uniti dalla passione per la bici: usciamo insieme ogni settimana e ogni tanto partecipiamo a qualche gara. Dal mare alla montagna in un'ora di pedalata.",
  bgImage: "/assets/sunset-rider.jpg",
  bgAlt: "Rider TBE al tramonto sui monti d'Abruzzo",
  ctas: [
    { label: "Scopri la nostra Vision", href: "/vision", style: "primary" as const },
    { label: "Conosci il team", href: "/team", style: "glass" as const },
  ],
  scrollLabel: "Scroll",
};

export const HOME_MARQUEE = [
  "Teramo Bike Experience",
  "Stagione 2026",
  "Strade d'Abruzzo",
  "Gran Sasso Climbers",
  "Made in Teramo",
];

export const HOME_INTRO = {
  label: "/02 — Chi siamo",
  /** `em` segments render in the accent color. */
  titleHtml: [
    { text: "Siamo una squadra" },
    { text: "di amici nata" },
    { text: "a " },
    { text: "Teramo.", accent: true },
  ],
  // Rendered as three visual lines: line1 / line2 / line3(+accent word)
  titleLines: [
    [{ text: "Siamo una squadra" }],
    [{ text: "di amici nata" }],
    [{ text: "a " }, { text: "Teramo.", accent: true }],
  ],
  leadBefore:
    "Nasciamo a Teramo nel 2023 da un gruppo di amici cresciuti tra le curve della Val Vomano e le salite del Gran Sasso. Oggi siamo quindici, con il sostegno di alcune realtà del territorio, e una cosa che ci accomuna: ",
  leadStrong: "per noi la bici è soprattutto un modo per stare insieme",
  leadAfter: ".",
  link: { label: "Leggi la nostra Vision →", href: "/vision" },
  stats: [
    { num: "15", label: "Corridori in maglia" },
    { num: "42", label: "Gare nel 2025" },
    { num: "73K", label: "Km percorsi · stagione" },
    { num: "1", label: "Cronoscalata organizzata" },
  ],
};

export const HOME_FEATURED = {
  label: "/03 — Evento di stagione",
  date: "21 Giugno 2026 · Roiano di Campli (TE)",
  titleLines: [
    [{ text: "1ª" }],
    [{ text: "Crono" }, { text: "scalata", accent: true }],
    [{ text: "Di Mattia Fiore" }],
  ],
  lead: "6,10 km di salita da Roiano al Rifugio delle Aquile, con vista sul mare e sul Gran Sasso. Pendenza media 7,2%, dislivello 435m. Premiati i primi tre di ogni categoria. Iscrizioni aperte.",
  stats: [
    { label: "Lunghezza", value: "6.10 KM" },
    { label: "Dislivello", value: "435 M" },
    { label: "Pendenza Media", value: "7.2%" },
  ],
  cta: { label: "Iscriviti alla cronoscalata", href: "/eventi/cronoscalata" },
  image: "/assets/cronoscalata.jpg",
  imageAlt: "Locandina Prima Cronoscalata di Mattia Fiore Costruzioni",
  tag: "Featured",
};

export interface AgendaCard {
  tag: string;
  tagColor: "red" | "amber" | "italian";
  date: string;
  titleLines: string[];
  text: string;
  cta: string;
  href: string;
  image: string;
  imageAlt: string;
}

export const HOME_AGENDA = {
  label: "/04 — In agenda",
  titleLines: [
    [{ text: "Tra una gara" }],
    [{ text: "e l'altra,", accent: true }, { text: " la strada." }],
  ],
  cards: [
    {
      tag: "Uscita Social",
      tagColor: "amber",
      date: "12 Aprile 2026 · 08:00",
      titleLines: ["Colonnella", "— Civitella del Tronto"],
      text: "Uscita gravel aperta a tutti i livelli. Caffè al ritorno offerto da Brian's Bike Shop. 78 km, 1.100m D+.",
      cta: "Dettagli →",
      href: "/eventi",
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=80",
      imageAlt: "Gruppo cicloturistico in salita",
    },
    {
      tag: "Gara",
      tagColor: "red",
      date: "04 Maggio 2026 · L'Aquila",
      titleLines: ["Gran Fondo", "dei Quattro Borghi"],
      text: "Il team schiera dieci atleti sulla classica delle Marche orientali. 142 km, 2.300m D+, finale a Roseto.",
      cta: "Roster →",
      href: "/eventi",
      image:
        "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1200&q=80",
      imageAlt: "Gruppo in gara",
    },
    {
      tag: "Solidale",
      tagColor: "italian",
      date: "28 Settembre 2026 · Teramo",
      titleLines: ["Pedalata", "contro la Distrofia"],
      text: "Pedalata di beneficenza per Telethon. 35 km cittadini a velocità libera. Tutti in maglia TBE.",
      cta: "Partecipa →",
      href: "/eventi",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80",
      imageAlt: "Tramonto in salita",
    },
  ] satisfies AgendaCard[],
};

export const HOME_KIT = {
  label: "/05 — Lo shop",
  overlayTop: "KIT V.9 · 2026",
  overlayBig: "09",
  titleLines: [[{ text: "La maglia" }], [{ text: "della squadra.", accent: true }]],
  lead: "Il kit ufficiale della stagione 2026, prodotto in Italia da Alpic. Un disegno pensato da noi, ispirato ai colori del Gran Sasso al tramonto. Disponibile in versione estiva, gravel e invernale.",
  chips: ["Jersey · €95", "Bibshort · €120", "Completo · €195"],
  cta: { label: "Vai allo shop", href: "/shop" },
  image: "/assets/maglia-front.jpg",
  imageAlt: "Kit ufficiale TBE 2026 — vista frontale",
};

export const HOME_CTA = {
  titleLines: [
    [{ text: "Hai una bici?" }],
    [{ text: "Pedala con noi.", outline: true }],
  ],
  lead: "Siamo aperti a ciclisti di tutte le età e livelli. Quello che conta è la voglia di pedalare insieme, una domenica mattina.",
  cta: { label: "Candidati al team", href: "/contatti" },
};
