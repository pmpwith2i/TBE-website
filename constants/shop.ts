/**
 * Shop DATA only — the official kit. Prices, image and sizes live here so
 * they're easy to update; all marketing copy lives in the shop page TSX.
 */

export interface PriceTier {
  label: string;
  value: string;
  note?: string;
  /** Highlight the price in the accent color. */
  accent?: boolean;
}

export const KIT = {
  image: "/assets/maglia-front.jpg",
  imageAlt: "Kit ufficiale Teramo Bike Experience 2026 — vista frontale",
  badges: ["Nuovo 2026", "Made in Italy"],
  name: "Kit Ufficiale '26",
  priceTiers: [
    { label: "Maglia", value: "€95", accent: true },
    { label: "Salopette", value: "€120", accent: true },
    { label: "Completo", value: "€195", note: "sconto −10%" },
    { label: "Taglie", value: "XS — XXXL" },
  ] satisfies PriceTier[],
} as const;
