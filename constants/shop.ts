/**
 * Shop: featured kit banner, product catalogue, info strip.
 * Products can use a real photo ("image") or a typographic placeholder tile
 * ("art") — exactly as the original design did.
 */

export type ShopCategory = "kit" | "accessori" | "merch";

export type ColorToken = "black" | "white" | "accent" | "smoke" | "amber";

export interface ArtLine {
  text: string;
  color: ColorToken;
  size: number;
  /** Outlined (stroked) text — fill becomes transparent. */
  strokeColor?: "white" | "black";
}

export type ProductMedia =
  | {
      kind: "image";
      src: string;
      alt: string;
      contain?: boolean;
      padding?: number;
      bg?: string;
    }
  | {
      kind: "art";
      background: string;
      padding?: number;
      frame?: "circle-dark" | "circle-white";
      lines: ArtLine[];
      bar?: boolean;
      caption?: string;
    };

export interface Product {
  id: string;
  category: ShopCategory;
  cat: string;
  name: string;
  desc: string;
  price: number;
  badge?: { text: string; kind?: "new" | "limit" };
  colors?: string[];
  media: ProductMedia;
}

export const SHOP_HERO = {
  watermark: "SHOP",
  eyebrowNum: "/05",
  eyebrowText: "Merchandising Ufficiale",
  titleLines: [
    [{ text: "Acquista il nostro" }],
    [{ text: "merchandising", accent: true }],
    [{ text: "ufficiale." }],
  ],
  leadBefore:
    "Il kit ufficiale della stagione 2026, prodotto in Italia da Alpic. ",
  leadStrong: "Spedizione gratuita sopra €80.",
};

export const FEATURED_KIT = {
  image: "/assets/maglia-front.jpg",
  imageAlt: "Maglia TBE 2026 fronte",
  badges: ["Nuovo 2026", "Made in Italy"],
  titleLines: [[{ text: "Il Kit" }], [{ text: "Ufficiale '26", accent: true }]],
  lead: "Maglia + salopette. Tessuto leggero e traspirante, perfetto per le salite estive. Un disegno pensato dalla squadra, ispirato ai colori del Gran Sasso al tramonto.",
  stats: [
    { label: "Maglia", value: "€95", accent: true },
    { label: "Bibshort", value: "€120", accent: true },
    { label: "Completo (sconto −10%)", value: "€195" },
    { label: "Disponibilità", value: "XS — XXXL · 47 pz.", small: true },
  ],
  cta: "Aggiungi al carrello",
  /** Cart line added by the banner button. */
  cartItem: { id: "kit-race-magma-26", name: "Kit Ufficiale '26", price: 195 },
};

export const CATALOG_HEADER = {
  label: "Tutti i prodotti",
  title: "Catalogo completo.",
};

export const CATEGORY_TABS: { label: string; value: ShopCategory | "all" }[] = [
  { label: "Tutto", value: "all" },
  { label: "Kit ciclismo", value: "kit" },
  { label: "Accessori", value: "accessori" },
  { label: "Merchandise", value: "merch" },
];

export const PRODUCTS: Product[] = [
  // ---- KIT ----
  {
    id: "race-jersey-magma",
    category: "kit",
    cat: "Kit · Maglia",
    name: "Maglia Ufficiale 2026",
    desc: "Maglia race fit in tessuto Carvico traforato, leggera e traspirante. Disegno ispirato al tramonto sul Gran Sasso.",
    price: 95,
    badge: { text: "New '26", kind: "new" },
    colors: [
      "linear-gradient(135deg, #C8102E, #4A0410)",
      "linear-gradient(135deg, #2A2A2C, #0A0A0A)",
    ],
    media: { kind: "image", src: "/assets/maglia-front.jpg", alt: "Maglia Ufficiale 2026" },
  },
  {
    id: "race-bibshort-endurance",
    category: "kit",
    cat: "Kit · Salopette",
    name: 'Race Bibshort "Endurance"',
    desc: "Fondello Elastic Interface italiano. Bretelle in mesh, leg gripper laser.",
    price: 120,
    media: { kind: "image", src: "/assets/maglia-back.jpg", alt: "Bibshort" },
  },
  {
    id: "completo-race-26",
    category: "kit",
    cat: "Kit · Bundle",
    name: "Completo Ufficiale '26",
    desc: "Maglia + Salopette. Risparmia €20 sul bundle. Stessa stagione, stesso disegno.",
    price: 195,
    badge: { text: "−10%" },
    media: {
      kind: "image",
      src: "/assets/maglia-detail.jpg",
      alt: "Completo Kit Race",
      bg: "var(--tbe-bone)",
    },
  },
  {
    id: "gilet-antivento-tramontana",
    category: "kit",
    cat: "Kit · Antivento",
    name: 'Gilet Antivento "Tramontana"',
    desc: "Front packable in tasca posteriore. Per le discese veloci di Campo Imperatore.",
    price: 75,
    badge: { text: "New", kind: "new" },
    media: {
      kind: "art",
      background: "linear-gradient(135deg, #1a1a1a, #2A2A2C)",
      padding: 40,
      lines: [
        { text: "Windproof", color: "accent", size: 80 },
        { text: "Gilet", color: "white", size: 80 },
      ],
    },
  },
  {
    id: "maglia-termica-long",
    category: "kit",
    cat: "Kit · Inverno",
    name: "Maglia Termica Long",
    desc: "Maniche lunghe in Thermoroubaix. Per le uscite di gennaio sopra ai 5°C.",
    price: 135,
    badge: { text: "Inverno", kind: "limit" },
    media: {
      kind: "art",
      background: "linear-gradient(135deg, #4A0410, #C8102E)",
      padding: 40,
      lines: [
        { text: "Maglia", color: "white", size: 64 },
        { text: "Termica", color: "white", size: 64 },
      ],
    },
  },
  // ---- ACCESSORI ----
  {
    id: "calze-race-cima",
    category: "accessori",
    cat: "Accessorio",
    name: 'Calze Race "Cima"',
    desc: "15 cm di altezza, traforate, made in Italy. Logo TBE laterale.",
    price: 18,
    media: {
      kind: "art",
      background: "var(--tbe-bone)",
      frame: "circle-dark",
      lines: [{ text: "TBE", color: "accent", size: 48 }],
    },
  },
  {
    id: "borraccia-elite-500",
    category: "accessori",
    cat: "Accessorio",
    name: "Borraccia Elite 500ml",
    desc: "Elite Fly Tex. Con i colori della squadra. Set da 2 disponibile.",
    price: 10,
    media: {
      kind: "art",
      background: "var(--tbe-amber)",
      lines: [
        { text: "Borraccia", color: "black", size: 80 },
        { text: "500ml", color: "black", size: 80 },
      ],
    },
  },
  {
    id: "manicotti-uv-sole",
    category: "accessori",
    cat: "Accessorio",
    name: 'Manicotti UV "Sole"',
    desc: "Protezione UV 50+. Compressione media. Tinta unita rosso TBE.",
    price: 28,
    media: {
      kind: "art",
      background: "var(--tbe-black)",
      lines: [
        { text: "Manicotti", color: "accent", size: 56 },
        { text: "Estivi", color: "white", size: 56 },
      ],
    },
  },
  {
    id: "cycling-cap-aquile",
    category: "accessori",
    cat: "Accessorio",
    name: 'Cycling Cap "Aquile"',
    desc: "Cappello sotto-casco in cotone Italia. Bordo bianco-rosso-nero.",
    price: 22,
    media: {
      kind: "image",
      src: "/assets/logo-badge.png",
      alt: "Cap",
      bg: "var(--tbe-bone)",
      contain: true,
      padding: 60,
    },
  },
  {
    id: "bundle-calze-manicotti",
    category: "accessori",
    cat: "Accessorio",
    name: "Bundle Calze + Manicotti",
    desc: "Risparmia €6 sul bundle estivo. Tutto in maglia rosso TBE.",
    price: 40,
    media: {
      kind: "art",
      background: "linear-gradient(135deg, #f4f1ec, #ddd)",
      lines: [
        { text: "SOCKS", color: "black", size: 64 },
        { text: "×2", color: "accent", size: 64 },
      ],
    },
  },
  {
    id: "bike-bag-trasferta",
    category: "accessori",
    cat: "Accessorio",
    name: 'Bike Bag "Trasferta"',
    desc: "Sacca porta-casco e scarpe. 25L. Logo TBE ricamato.",
    price: 55,
    media: {
      kind: "art",
      background: "var(--tbe-black)",
      lines: [
        { text: "Zaino", color: "accent", size: 72 },
        { text: "Trasporto", color: "accent", size: 72 },
      ],
    },
  },
  {
    id: "top-tube-bag-cronometro",
    category: "accessori",
    cat: "Accessorio",
    name: 'Top Tube Bag "Cronometro"',
    desc: "Borsetta telaio impermeabile. Per gel, camera d'aria, telefono.",
    price: 32,
    media: {
      kind: "art",
      background: "var(--tbe-red)",
      lines: [
        { text: "Borsetta", color: "white", size: 60 },
        { text: "Telaio", color: "white", size: 60 },
      ],
    },
  },
  // ---- MERCH ----
  {
    id: "tshirt-heritage",
    category: "merch",
    cat: "Merch · T-shirt",
    name: 'T-shirt "Heritage"',
    desc: "100% cotone organico. Stampa serigrafica nera/rossa su bianco panna.",
    price: 32,
    media: {
      kind: "art",
      background: "var(--tbe-paper)",
      padding: 60,
      lines: [{ text: "TBE", color: "black", size: 80 }],
      bar: true,
      caption: "TERAMO · 2026",
    },
  },
  {
    id: "tshirt-una-scusa",
    category: "merch",
    cat: "Merch · T-shirt",
    name: 'T-shirt "Una Scusa"',
    desc: "Slogan TBE. Cotone pesante. Stampa serigrafica fronte.",
    price: 32,
    media: {
      kind: "art",
      background: "var(--tbe-black)",
      padding: 50,
      lines: [
        { text: "Bici è", color: "accent", size: 56 },
        { text: "Una Scusa", color: "white", size: 56 },
      ],
    },
  },
  {
    id: "hoodie-stagione-26",
    category: "merch",
    cat: "Merch · Felpa",
    name: 'Hoodie "Stagione \'26"',
    desc: "Felpa con cappuccio. 380gr cotone garzato. Patch ricamato sul cuore.",
    price: 68,
    media: {
      kind: "art",
      background: "linear-gradient(180deg, #C8102E, #4A0410)",
      lines: [
        { text: "Hoodie", color: "white", size: 84 },
        { text: "'26", color: "white", size: 84, strokeColor: "white" },
      ],
    },
  },
  {
    id: "cap-dad-hat",
    category: "merch",
    cat: "Merch · Cappellino",
    name: 'Cap "Dad Hat"',
    desc: "Cappellino casual non da bici. Cotone lavato. Patch frontale.",
    price: 26,
    media: {
      kind: "image",
      src: "/assets/logo-badge.png",
      alt: "Cappellino",
      bg: "var(--tbe-bone)",
      contain: true,
      padding: 70,
    },
  },
  {
    id: "poster-manifesto-dove-altri",
    category: "merch",
    cat: "Merch · Poster",
    name: 'Poster Manifesto "Insieme"',
    desc: "Stampa offset 50×70 cm su carta riciclata 250gr. Edizione 200 numerata.",
    price: 24,
    media: {
      kind: "art",
      background: "var(--tbe-paper)",
      padding: 40,
      lines: [
        { text: "PEDALIAMO", color: "black", size: 24 },
        { text: "INSIEME", color: "accent", size: 36 },
        { text: "DA TERAMO", color: "black", size: 24, strokeColor: "black" },
      ],
      caption: "50 × 70 cm · POSTER",
    },
  },
  {
    id: "sticker-pack-magma",
    category: "merch",
    cat: "Merch · Adesivi",
    name: "Sticker Pack TBE",
    desc: "10 adesivi assortiti per casco, borraccia, telaio. Vinile resistente.",
    price: 8,
    media: {
      kind: "art",
      background: "var(--tbe-black)",
      frame: "circle-white",
      lines: [
        { text: "TBE", color: "accent", size: 28 },
        { text: "'26", color: "black", size: 18 },
      ],
    },
  },
];

export const SHOP_INFO = [
  {
    icon: "↗ Spedizione",
    title: "Gratuita sopra €80",
    text: "Italia: 3-5 giorni lavorativi. UE: 5-7 giorni. Spedito da Castelnuovo Vomano (TE).",
  },
  {
    icon: "↺ Resi",
    title: "14 giorni · taglie sbagliate",
    text: "Reso gratuito per cambio taglia. Capi personalizzati non rimborsabili dopo produzione.",
  },
  {
    icon: "✱ Made in Italy",
    title: "Produzione · Alpic, Castelnuovo",
    text: "Tutti i kit prodotti da Alpic, sartoria digitale a 4 km dalla nostra sede.",
  },
];
