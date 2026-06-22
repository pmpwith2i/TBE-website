/**
 * Events DATA only — posters, dates, awards, notes and preregistration setup.
 * Page copy and layout live in `app/eventi`.
 */

export type EventKind = "cicloturistica" | "cronoscalata";

export type EventCustomField =
  | {
      id: string;
      label: string;
      type: "text" | "textarea";
      required?: boolean;
      placeholder?: string;
    }
  | {
      id: string;
      label: string;
      type: "select";
      required?: boolean;
      placeholder?: string;
      options: readonly string[];
    }
  | {
      id: string;
      label: string;
      type: "checkbox";
      required?: boolean;
      help?: string;
    };

export interface EventDate {
  /** Optional ISO date. Keep undefined until the official date is confirmed. */
  iso?: string;
  label: string;
  dayLabel: string;
  monthLabel: string;
}

export interface EventPreRegistration {
  available: boolean;
  formTitle: string;
  intro: string;
  closedMessage: string;
  customFields: readonly EventCustomField[];
}

export interface EventSponsor {
  name: string;
  detail: string;
  logo: string;
  logoSize: {
    width: number;
    height: number;
  };
  logoAlt: string;
}

export interface EventRoute {
  id: string;
  name: string;
  description: string;
  gpxUrl: string;
}

export interface EventRegistrationFee {
  label: string;
  amount: string;
  benefits: readonly string[];
}

export interface BikeEvent {
  slug: string;
  kind: EventKind;
  typeLabel: string;
  title: string;
  date: EventDate;
  location: string;
  poster: string;
  posterSize: {
    width: number;
    height: number;
  };
  posterAlt: string;
  mainSponsor?: EventSponsor;
  routes: readonly EventRoute[];
  registrationFee?: EventRegistrationFee;
  awards: readonly string[];
  notes: string;
  preRegistration: EventPreRegistration;
}

export const EVENTS = [
  {
    slug: "cicloturistica",
    kind: "cicloturistica",
    typeLabel: "Cicloturistica",
    title: "Prima Cicloturistica Di Garrano",
    date: {
      label: "Sabato 4 Giugno 2026",
      dayLabel: "4",
      monthLabel: "Giugno 2026",
    },
    location: "Teramo",
    poster: "/assets/cicloturistica.jpg",
    posterSize: {
      width: 3508,
      height: 4961,
    },
    posterAlt: "Ciclisti in uscita al tramonto sulle strade del teramano",
    mainSponsor: {
      name: "Di Mattia Fiore",
      detail: "Impresa di Costruzioni",
      logo: "/assets/sponsors/di_mattia_fiore.png",
      logoSize: {
        width: 510,
        height: 167,
      },
      logoAlt: "Logo Di Mattia Fiore",
    },
    routes: [
      {
        id: "corto",
        name: "Percorso corto",
        description:
          "Tracciato cicloturistico pensato per chi vuole pedalare in gruppo con passo accessibile.",
        gpxUrl: "/assets/tracciati/cicloturistica-corto.gpx",
      },
      {
        id: "lungo",
        name: "Percorso lungo",
        description:
          "Tracciato piu completo per chi cerca una distanza maggiore mantenendo lo spirito non competitivo.",
        gpxUrl: "/assets/tracciati/cicloturistica-lungo.gpx",
      },
    ],
    registrationFee: {
      label: "Quota di iscrizione",
      amount: "20€",
      benefits: [
        "PACCO GARA PER I PRIMI 50 iscritti",
        "RISTORO PRESSO IL RIFUGIO FRATTA MONTANARA",
        "RISTORO finale PRESSo partenza/arrivo",
      ],
    },
    awards: [
    ],
    notes:
      "Evento non competitivo aperto al territorio. Percorso, ritrovo e dettagli logistici saranno aggiornati appena definitivi.",
    preRegistration: {
      available: true,
      formTitle: "Pre-iscriviti alla cicloturistica",
      intro:
        "Lasciaci i tuoi dati: ti ricontattiamo con conferma, ritrovo e dettagli sul percorso.",
      closedMessage: "Le pre-iscrizioni non sono ancora aperte.",
      customFields: [
        {
          id: "percorso",
          label: "Percorso preferito",
          type: "select",
          required: true,
          placeholder: "Seleziona un percorso",
          options: ["Percorso corto", "Percorso lungo"],
        },
        {
          id: "societa",
          label: "Societa o gruppo",
          type: "text",
          placeholder: "Facoltativo",
        },
        {
          id: "tesserato",
          label: "Sono tesserato FCI, CSI o altro ente",
          type: "checkbox",
        },
      ],
    },
  },
  {
    slug: "cronoscalata",
    kind: "cronoscalata",
    typeLabel: "Cronoscalata",
    title: "Cronoscalata Teramo Bike Experience",
    date: {
      label: "Data in definizione",
      dayLabel: "TBD",
      monthLabel: "2026",
    },
    location: "Teramo",
    poster: "/assets/cronoscalata.jpg",
    posterSize: {
      width: 2100,
      height: 2800,
    },
    posterAlt: "Ciclista in salita durante una cronoscalata",
    mainSponsor: undefined,
    routes: [],
    registrationFee: undefined,
    awards: [
      "Premio assoluto uomo",
      "Premio assoluto donna",
      "Premi di categoria",
    ],
    notes:
      "Evento competitivo in preparazione. Regolamento, categorie, percorso e modalita di partenza saranno pubblicati appena confermati.",
    preRegistration: {
      available: false,
      formTitle: "Pre-iscriviti alla cronoscalata",
      intro:
        "Quando le pre-iscrizioni apriranno, useremo questi campi per raccogliere i dati sportivi necessari.",
      closedMessage:
        "Le pre-iscrizioni apriranno dopo la pubblicazione del regolamento.",
      customFields: [
        {
          id: "categoria",
          label: "Categoria",
          type: "select",
          required: true,
          placeholder: "Seleziona la categoria",
          options: ["Elite Sport", "M1-M2", "M3-M4", "M5-M6", "Donne", "E-bike"],
        },
        {
          id: "numero_tessera",
          label: "Numero tessera",
          type: "text",
          required: true,
          placeholder: "FCI, CSI o altro ente",
        },
      ],
    },
  },
] as const satisfies readonly BikeEvent[];

export type EventSlug = (typeof EVENTS)[number]["slug"];

export const FEATURED_EVENT = EVENTS[0];

export function getEventBySlug(slug: string): BikeEvent | undefined {
  return EVENTS.find((event) => event.slug === slug);
}
