/**
 * Sponsor DATA only — names, details and (where we have them) logo paths.
 * Copy that frames the sponsors lives in the page/component TSX, not here.
 *
 * The list feeds two places: the main-sponsor highlight (home + contatti)
 * and the scrolling sponsor band on the home page.
 */

export interface Sponsor {
  name: string;
  detail: string;
  /** Path under /public to the logo, if we have one. Most are name-only for now. */
  logo?: string;
}

/** Our principal backer — highlighted on the home page and the contacts page. */
export const MAIN_SPONSOR: Sponsor = {
  name: "Di Mattia Fiore",
  detail: "Impresa di Costruzioni",
  logo: "/assets/sponsors/di_mattia_fiore.png",
};

/** The other partners who support the team, in display order. */
export const SPONSORS: Sponsor[] = [
  { name: "EcoVerde", detail: "Energia" },
  { name: "Brian's", detail: "Bike Shop" },
  { name: "Vischia", detail: "Autocarrozzeria" },
  { name: "Alpic", detail: "Sportswear" },
  { name: "Decar", detail: "Ford Partner" },
  { name: "Pallini", detail: "Gioielleria · dal 1966" },
  { name: "D'Onofrio", detail: "Farmacia" },
  { name: "GI.MA", detail: "Pulizie · Giardinaggio" },
  { name: "Fisioste", detail: "Fisioterapia" },
  { name: "FCI", detail: "Federazione Ciclistica Italiana" },
  { name: "CSI", detail: "Centro Sportivo Italiano" },
  { name: "+ Diventa partner", detail: "Scrivici sui social" },
];

/** Main sponsor first, then every partner — used by the scrolling band. */
export const ALL_SPONSORS: Sponsor[] = [MAIN_SPONSOR, ...SPONSORS];
