/**
 * Contatti page: social channels, "join the team" form, sponsor tiers, location.
 */

import { SITE } from "./site";

export interface Channel {
  platform: "instagram" | "facebook";
  label: string;
  handle: string;
  note: string;
  href: string;
}

export const CONTATTI_HERO = {
  eyebrowNum: "/06",
  eyebrowText: "Contatti & Iscrizioni",
  titleLines: [[{ text: "Seguici" }], [{ text: "sui social.", accent: true }]],
  lead: "Il modo migliore per restare in contatto con noi è sui social. Ci trovi su Instagram e Facebook: scrivici un messaggio quando vuoi.",
};

/** The club only communicates through its social profiles. */
export const CHANNELS: Channel[] = [
  {
    platform: "instagram",
    label: "Instagram",
    handle: "@teramobikeexperience",
    note: "Foto e racconti delle nostre uscite",
    href: SITE.instagram,
  },
  {
    platform: "facebook",
    label: "Facebook",
    handle: "Teramo Bike Experience",
    note: "Eventi e aggiornamenti della squadra",
    href: SITE.facebook,
  },
];

export const JOIN_FORM = {
  label: "/01 — Iscriviti al team",
  titleLines: [
    [{ text: "Vuoi correre" }],
    [{ text: "con noi?", accent: true }],
  ],
  lead: "Mandaci una mail. Ti ricontattiamo il prima possibile.",
  requirementsLabel: "Cosa serve",
  companyLabel: "Hai un'azienda?",
  companyLink: { label: "Diventa sponsor →", href: "#sponsor" },
  disciplines: ["Strada", "Gravel", "MTB", "Più di una", "Non so ancora"],
  experience: [
    "Principiante (< 1 anno)",
    "Amatore (1-5 anni)",
    "Avanzato (5+ anni)",
    "Ex agonista",
  ],
  textareaPlaceholder:
    "Cosa cerchi in una squadra? Da dove pedali di solito? Hai una salita preferita?",
  privacy:
    "Acconsento al trattamento dei dati ai sensi del GDPR per essere ricontattato/a dal team.",
  submit: "Invia candidatura",
};

export const SPONSOR_SECTION = {
  id: "sponsor",
  label: "/02 — Diventa partner",
  titleLines: [[{ text: "Il tuo logo" }], [{ text: "in salita.", accent: true }]],
  lead: "Il nostro pubblico è composto da appassionati, sportivi locali, famiglie. La maglia TBE attraversa l'Abruzzo 12 mesi l'anno. La cronoscalata porta a Teramo 200+ corridori e relative famiglie da tutto il centro Italia.",
  cta: { label: "Scrivici su Instagram", href: SITE.instagram },
  tiers: [
    {
      mark: "A",
      title: "Sponsor Tecnico",
      text: "Logo grande fronte maglia. Pannello in cronoscalata. €5.000 / anno.",
      accent: "red" as const,
    },
    {
      mark: "B",
      title: "Co-Sponsor",
      text: "Logo posteriore + manica. Banner cronoscalata. €1.500 / anno.",
      accent: "red" as const,
    },
    {
      mark: "C",
      title: "Supporter",
      text: "Logo piccolo posteriore. Citazione social. €500 / anno.",
      accent: "red" as const,
    },
    {
      mark: "+",
      title: "Su misura",
      text: "Pacchetti personalizzati per eventi, gare, attivazioni territoriali.",
      accent: "amber" as const,
    },
  ],
};

export const LOCATION = {
  label: "/03 — Dove siamo",
  titleLines: [[{ text: "Sede" }], [{ text: "Teramo.", accent: true }]],
  text: "La nostra sede operativa è dentro il negozio di Brian's Bike Shop, dove ci troviamo ogni martedì sera per pianificare uscite, montare bici e bere birra artigianale abruzzese.",
  address: ["Via delle Aquile 14", "64100 Teramo (TE)"],
  hours: ["Mar 19:00 — 22:00 · Sab 9:00 — 12:00", "Domenica: in strada"],
};
