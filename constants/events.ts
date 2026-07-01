/**
 * Events DATA only — posters, dates, awards, notes and registration setup.
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

export interface EventScheduleItem {
  time?: string;
  title: string;
  detail?: string;
}

export interface EventFee {
  label: string;
  amount: string;
  detail?: string;
}

export interface EventInfoGroup {
  title: string;
  items: readonly string[];
}

export interface EventPreRegistration {
  available: boolean;
  externalUrl?: string;
  externalCtaLabel?: string;
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
  gpxUrl?: string;
  gpxStatusLabel?: string;
}

export interface EventRouteSection {
  label: string;
  title: string;
  accent: string;
  intro: string;
}

export interface EventMapCoordinates {
  lat: number;
  lng: number;
}

export interface EventMapPoint {
  id: string;
  label: string;
  title: string;
  detail?: string;
  coordinates: EventMapCoordinates;
  googleMapsUrl: string;
}

export interface EventLocationMap {
  id: string;
  label: string;
  title: string;
  intro?: string;
  embedUrl?: string;
  center?: EventMapCoordinates;
  zoom?: number;
  points: readonly EventMapPoint[];
}

export interface EventLocationMapSection {
  label: string;
  title: string;
  accent: string;
  intro?: string;
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
  schedule: readonly EventScheduleItem[];
  fees: readonly EventFee[];
  routes: readonly EventRoute[];
  routeSection?: EventRouteSection;
  locationMapSection?: EventLocationMapSection;
  locationMaps?: readonly EventLocationMap[];
  infoGroups: readonly EventInfoGroup[];
  awards: readonly string[];
  notes: string;
  /** Event-specific long-tail keywords for local-SEO indexing. */
  seoKeywords: readonly string[];
  preRegistration: EventPreRegistration;
}

export const DI_MATTIA_FIORE_SPONSOR = {
  name: "Di Mattia Fiore",
  detail: "Impresa di Costruzioni",
  logo: "/assets/sponsors/di_mattia_fiore.png",
  logoSize: {
    width: 510,
    height: 167,
  },
  logoAlt: "Logo Di Mattia Fiore",
} as const satisfies EventSponsor;

export const EVENTS = [
  {
    slug: "cicloturistica",
    kind: "cicloturistica",
    typeLabel: "Cicloturistica",
    title: "Cicloturistica di Garrano",
    date: {
      iso: "2026-07-04",
      label: "Sabato 4 luglio 2026",
      dayLabel: "4",
      monthLabel: "Luglio 2026",
    },
    location: "Garrano Basso (TE)",
    poster: "/assets/cicloturistica.jpg",
    posterSize: {
      width: 3508,
      height: 4961,
    },
    posterAlt: "Ciclisti in uscita al tramonto sulle strade del teramano",
    mainSponsor: DI_MATTIA_FIORE_SPONSOR,
    schedule: [
      {
        time: "08.00",
        title: "Iscrizioni e ritrovo",
        detail: "Via Nazionale, Garrano Basso (TE)",
      },
      {
        time: "09.00",
        title: "Partenza",
        detail: "Via Nazionale, Garrano Basso (TE)",
      },
    ],
    fees: [
      {
        label: "Tesserati",
        amount: "20€",
      },
      {
        label: "Non tesserati",
        amount: "25€",
      },
      {
        label: "Solo pranzo",
        amount: "10€",
      },
    ],
    routes: [
      {
        id: "soft",
        name: "Percorso soft",
        description:
          "Tracciato cicloturistico pensato per chi vuole pedalare in gruppo con passo accessibile.",
        gpxUrl: "/assets/tracciati/cicloturistica_04_06_26_soft.gpx",
      },
      {
        id: "hard",
        name: "Percorso hard",
        description:
          "Tracciato piu completo per chi cerca una distanza maggiore mantenendo lo spirito non competitivo.",
        gpxUrl: "/assets/tracciati/cicloturistica_04_06_26_hard.gpx",
      },
    ],
    routeSection: {
      label: "Tracciati",
      title: "Scegli il",
      accent: "percorso.",
      intro:
        "Percorso soft e hard sono disponibili in GPX per preparare la giornata e scegliere il passo giusto.",
    },
    locationMapSection: {
      label: "Mappa",
      title: "Punto di partenza e",
      accent: "ritrovo.",
    },
    locationMaps: [
      {
        id: "partenza-ritrovo",
        label: "Partenza/Ritrovo",
        title: "Via Nazionale, Garrano Basso (TE)",
        zoom: 16,
        points: [
          {
            id: "partenza-ritrovo-garrano",
            label: "Partenza/Ritrovo",
            title: "Via Nazionale, Garrano Basso (TE)",
            coordinates: {
              lat: 42.695575,
              lng: 13.664299,
            },
            googleMapsUrl:
              "https://www.google.com/maps/place/42.695575,13.664299/data=!4m6!3m5!1s0!7e2!8m2!3d42.6955755!4d13.664298899999999!18m1!1e1?entry=gps&coh=192189&g_ep=CAESBzI2LjI1LjUYACDl7Q0qiwEsOTQyNjc3MjcsOTQyOTIxOTUsOTQyOTk1MzIsMTAwNzk2NDk4LDEwMDc5Nzc2MSwxMDA3OTY1MzUsOTQyODA1NzYsOTQyMDczOTQsOTQyMDc1MDYsOTQyMDg1MDYsOTQyMTg2NTMsOTQyMjk4MzksOTQyNzUxNjgsOTQyNzk2MTksMTAwODE1NjM1QgJJVA%3D%3D&skid=43b65c83-32e8-4cc6-93c5-e857eaa7388c&g_st=aw",
          },
        ],
      },
    ],
    infoGroups: [
      {
        title: "Logistica",
        items: [
          "Parcheggio disponibile in zona partenza.",
          "Ristoro presso il Rifugio Fratta Montanara.",
          "Ristoro finale presso partenza/arrivo.",
        ],
      },
      {
        title: "Partecipazione",
        items: ["Casco obbligatorio.", "Ammesse MTB, E-bike e gravel."],
      },
      {
        title: "Pacco gara",
        items: ["Pacco gara per i primi 50 iscritti."],
      },
    ],
    awards: ["Premio per la squadra piu numerosa"],
    notes:
      "Cicloturistica non competitiva a Garrano Basso con percorsi soft e hard, ristoro in quota al Rifugio Fratta Montanara e ristoro finale in zona partenza/arrivo.",
    seoKeywords: [
      "Cicloturistica di Garrano",
      "cicloturistica Garrano Basso",
      "cicloturistica Teramo",
      "cicloturistica 4 luglio 2026",
      "raduno cicloturistico teramano",
      "cicloturistica non competitiva Teramo",
      "Rifugio Fratta Montanara",
      "pedalata Gran Sasso",
      "uscita in bici Garrano Basso",
      "percorso soft hard GPX",
      "MTB e-bike gravel Teramo",
      "pre iscrizione cicloturistica Teramo",
    ],
    preRegistration: {
      available: true,
      formTitle: "Pre-iscriviti alla cicloturistica",
      intro:
        "Pre-iscriviti dal sito: raccogliamo i dati principali per confermare percorso, quota e partecipazione al pranzo.",
      closedMessage: "Le pre-iscrizioni non sono ancora aperte.",
      customFields: [
        {
          id: "tipologia_iscrizione",
          label: "Tipologia iscrizione",
          type: "select",
          required: true,
          placeholder: "Seleziona la quota",
          options: ["Tesserati - 20€", "Non tesserati - 25€", "Solo pranzo - 10€"],
        },
        {
          id: "percorso",
          label: "Percorso preferito",
          type: "select",
          required: true,
          placeholder: "Seleziona un percorso",
          options: ["Percorso soft", "Percorso hard", "Solo pranzo"],
        },
        {
          id: "mezzo",
          label: "Mezzo",
          type: "select",
          required: true,
          placeholder: "Seleziona il mezzo",
          options: ["MTB", "E-bike", "Gravel", "Solo pranzo"],
        },
        {
          id: "societa",
          label: "Societa o gruppo",
          type: "text",
          placeholder: "Facoltativo",
        },
      ],
    },
  },
  {
    slug: "cronoscalata",
    kind: "cronoscalata",
    typeLabel: "Cronoscalata",
    title: "Cronoscalata ASD Teramo Bike Experience",
    date: {
      iso: "2026-07-05",
      label: "Domenica 5 luglio 2026",
      dayLabel: "5",
      monthLabel: "Luglio 2026",
    },
    location: "Roiano di Campli (TE)",
    poster: "/assets/cronoscalata.jpg",
    posterSize: {
      width: 2100,
      height: 2800,
    },
    posterAlt: "Ciclista in salita durante una cronoscalata",
    mainSponsor: DI_MATTIA_FIORE_SPONSOR,
    schedule: [
      {
        time: "07.00",
        title: "Ritrovo",
        detail: "Roiano di Campli (TE)",
      },
      {
        time: "08.30",
        title: "Partenza",
        detail: "Roiano di Campli (TE)",
      },
    ],
    fees: [
      {
        label: "Iscrizione",
        amount: "15€",
      },
    ],
    routes: [
      {
        id: "roiano-rifugio-aquile",
        name: "Roiano - Rifugio delle Aquile",
        description:
          "Cronoscalata da Roiano di Campli al Rifugio delle Aquile, con vista mare e Gran Sasso.",
        gpxUrl: "/assets/tracciati/cronoscalata_05_07_26_roiano_rifugio_aquile.gpx",
      },
    ],
    routeSection: {
      label: "Tracciato gara",
      title: "Roiano",
      accent: "Rifugio delle Aquile.",
      intro:
        "La cronoscalata sale da Roiano al Rifugio delle Aquile, con vista aperta verso mare e Gran Sasso.",
    },
    infoGroups: [
      {
        title: "Percorso",
        items: [
          "Da Roiano di Campli al Rifugio delle Aquile.",
          "Vista mare e Gran Sasso lungo l'arrivo in quota.",
          "File GPX disponibile.",
        ],
      },
      {
        title: "Logistica",
        items: [
          "Casco obbligatorio.",
          "Parcheggio - Piazza San Gabriele - Bivio Campli (TE).",
        ],
      },
      {
        title: "Iscrizione",
        items: [
          "Iscrizioni gestite dalla piattaforma Kronos Teramo.",
          "Il pulsante iscrizione apre la scheda ufficiale della cronoscalata.",
        ],
      },
    ],
    awards: [
      "Premiati i primi 3 assoluti",
      "Premiati i primi di ogni categoria",
    ],
    notes:
      "Cronoscalata competitiva da Roiano di Campli al Rifugio delle Aquile, con arrivo panoramico tra vista mare e Gran Sasso.",
    seoKeywords: [
      "Cronoscalata ASD Teramo Bike Experience",
      "cronoscalata Roiano di Campli",
      "cronoscalata Rifugio delle Aquile",
      "cronoscalata Campli",
      "cronoscalata Teramo",
      "cronoscalata 5 luglio 2026",
      "cronoscalata ciclismo Teramo",
      "salita Roiano Rifugio delle Aquile",
      "cronoscalata Gran Sasso",
      "cronometro in salita Teramo",
      "iscrizione cronoscalata Kronos Teramo",
    ],
    preRegistration: {
      available: false,
      externalUrl: "https://www.kronosteramo.it/cronoscalata/iscrizione.aspx",
      externalCtaLabel: "Iscriviti online",
      formTitle: "Iscriviti alla cronoscalata",
      intro:
        "Completa l'iscrizione sulla piattaforma Kronos Teramo: il link apre la scheda ufficiale della cronoscalata.",
      closedMessage:
        "Le iscrizioni alla cronoscalata sono gestite sulla piattaforma Kronos Teramo.",
      customFields: [],
    },
  },
] as const satisfies readonly BikeEvent[];

export type EventSlug = (typeof EVENTS)[number]["slug"];

export const FEATURED_EVENT = EVENTS[0];

export function getEventBySlug(slug: string): BikeEvent | undefined {
  return EVENTS.find((event) => event.slug === slug);
}

export function hasEventRegistration(event: BikeEvent) {
  return (
    event.preRegistration.available || Boolean(event.preRegistration.externalUrl)
  );
}

export function getEventRegistrationCtaLabel(event: BikeEvent) {
  return event.preRegistration.externalCtaLabel ?? "Pre-iscriviti";
}

export function getEventFeeSummary(event: BikeEvent) {
  if (event.fees.length === 0) {
    return undefined;
  }

  return event.fees
    .map((fee) => `${fee.amount} ${fee.label.toLowerCase()}`)
    .join(" / ");
}

export function getEventScheduleSummary(event: BikeEvent) {
  const firstItem = event.schedule[0];

  if (!firstItem) {
    return undefined;
  }

  return [firstItem.time, firstItem.title].filter(Boolean).join(" - ");
}
