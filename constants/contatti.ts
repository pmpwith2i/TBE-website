/**
 * Contatti page: channels, "join the team" form, sponsor tiers, location.
 */

export interface Channel {
  icon: string;
  label: string;
  /** Two-line value (e.g. ["+39 0861", "123 456"]). */
  value: string[];
  note: string;
  href: string;
}

export const CONTATTI_HERO = {
  eyebrowNum: "/06",
  eyebrowText: "Contatti & Iscrizioni",
  titleLines: [[{ text: "Vieni a" }], [{ text: "trovarci.", accent: true }]],
  lead: "In sede ogni martedì sera dalle 19. In strada ogni domenica mattina. Online, sempre.",
};

export const CHANNELS: Channel[] = [
  {
    icon: "@",
    label: "Scrivici",
    value: ["info", "@teramobike.it"],
    note: "Rispondiamo entro 48h",
    href: "mailto:info@teramobike.it",
  },
  {
    icon: "☏",
    label: "Chiamaci",
    value: ["+39 0861", "123 456"],
    note: "Lun-Ven 18-20 · Sab 9-12",
    href: "tel:+390861123456",
  },
  {
    icon: "◉",
    label: "Sede",
    value: ["Via delle Aquile 14", "Teramo"],
    note: "Martedì sera dalle 19:00",
    href: "#",
  },
  {
    icon: "✆",
    label: "WhatsApp",
    value: ["+39 333", "123 4567"],
    note: "Per uscite social & gare",
    href: "https://wa.me/393331234567",
  },
];

export const JOIN_FORM = {
  label: "/01 — Iscriviti al team",
  titleLines: [
    [{ text: "Vuoi correre" }],
    [{ text: "in maglia rossa?", accent: true }],
  ],
  lead: "Mandaci una mail con due righe su di te. Ti rispondiamo entro 48 ore e ti invitiamo a un'uscita di prova senza impegno. Se ti trovi bene, parliamo di tesseramento.",
  requirementsLabel: "Cosa serve",
  requirements: [
    "· Bici (qualunque, l'importante è che freni)",
    "· Certificato medico sportivo agonistico",
    "· Quota annuale €120 (tessera CSI inclusa)",
    "· Voglia di esserci anche d'inverno",
  ],
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
  cta: { label: "Richiedi il media kit", href: "mailto:sponsor@teramobike.it" },
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
