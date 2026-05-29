/**
 * Events: the season calendar, the "next event" hero, and the full
 * cronoscalata detail page. Add or edit events here.
 */

export type EventType = "gara" | "social" | "solidale";

export interface CalendarEvent {
  day: string;
  month: string;
  type: EventType;
  /** Mono label above the title (e.g. "Gara · Granfondo"). */
  kicker: string;
  /** Optional override color for the kicker. */
  kickerColor?: "amber" | "italian";
  title: string;
  place: string;
  cta: string;
  href: string;
}

/** Filter pills above the calendar. */
export const EVENT_FILTERS: { label: string; value: EventType | "all" }[] = [
  { label: "Tutti", value: "all" },
  { label: "Gare", value: "gara" },
  { label: "Uscite Social", value: "social" },
  { label: "Solidali", value: "solidale" },
];

export const EVENTS_HERO = {
  eyebrowNum: "/04",
  eyebrowText: "Eventi & Calendario 2026",
  titleLines: [[{ text: "Date che" }], [{ text: "contano.", accent: true }]],
};

/** The featured "next event" card on /eventi (links to the detail page). */
export const NEXT_EVENT = {
  href: "/eventi/cronoscalata",
  tag: "Prossimo Evento",
  status: "Iscrizioni Aperte",
  date: "21 Giugno 2026 · Roiano di Campli (TE)",
  titleLines: ["1ª Cronoscalata", "di Mattia Fiore"],
  lead: "6,10 km dal centro di Roiano al Rifugio delle Aquile. Vista mare e Gran Sasso, premiati i primi tre di ogni categoria.",
  /** ISO target for the live countdown. */
  countdownTarget: "2026-06-21T08:30:00+02:00",
  countdownLabels: { days: "Giorni", hours: "Ore", min: "Min", sec: "Sec" },
  ctaInline: "Vai al dettaglio & iscriviti →",
  stats: [
    { label: "Lunghezza", value: "6,10", unit: "km" },
    { label: "Dislivello", value: "+435", unit: "m" },
    { label: "Pendenza media", value: "7,2", unit: "%" },
    { label: "Iscritti", value: "87", unit: "/ 200" },
  ],
};

export const CALENDAR_HEADER = {
  label: "Calendario completo",
  titleLines: [
    [{ text: "Tutta la stagione," }],
    [{ text: "in una pagina.", accent: true }],
  ],
};

export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    day: "21",
    month: "GIU",
    type: "gara",
    kicker: "★ Evento Principale · Cronoscalata",
    kickerColor: "amber",
    title: "1ª Cronoscalata di Mattia Fiore",
    place: "ROIANO · 6,10 KM · 435 D+",
    cta: "Iscriviti",
    href: "/eventi/cronoscalata",
  },
];

export const EVENTS_PROPOSE = {
  kicker: "Oltre la cronoscalata",
  titleLines: [[{ text: "Pedaliamo" }], [{ text: "tutto l'anno.", accent: true }]],
  lead: "La cronoscalata è il nostro evento, ma ci troviamo ogni settimana per uscire insieme e ogni tanto partecipiamo a qualche gara. Vuoi unirti a noi? Scrivici.",
  cta: { label: "Unisciti a noi", href: "/contatti" },
};

/* ============================================================
   CRONOSCALATA — full event detail page
   ============================================================ */

export const CRONOSCALATA = {
  meta: {
    title: "1ª Cronoscalata di Mattia Fiore",
    breadcrumb: "Cronoscalata Roiano",
  },
  hero: {
    status: "Iscrizioni Aperte",
    date: "21 Giugno 2026 · Roiano di Campli (TE)",
    /** "1ª Crono" + outlined "scalata" + line "Di Mattia Fiore". */
    titlePrefix: "1ª Crono",
    titleOutline: "scalata",
    titleSecond: "Di Mattia Fiore",
    lead: "Da Roiano di Campli al Rifugio delle Aquile. Una salita autentica in mezzo ai boschi del Parco Nazionale del Gran Sasso, con vista mare e sui 2.912 metri del Corno Grande. Premiati i primi tre di ogni categoria.",
    bgImage: "/assets/cronoscalata.jpg",
    ctaPrimary: { label: "Iscriviti · €25", href: "#iscrizione" },
    ctaSecondary: { label: "Vedi il percorso", href: "#percorso" },
  },
  stats: [
    { label: "Quando", value: "21 GIU", unit: "", note: "Domenica · ore 08:30" },
    { label: "Lunghezza", value: "6,10", unit: "km", note: "Tracciato asfalto" },
    { label: "Dislivello", value: "435", unit: "m", note: "327m → 762m" },
    { label: "Pendenza media", value: "7,2", unit: "%", note: "Picco al 8,4%" },
    { label: "Iscrizione", value: "€25", unit: "", note: "€35 in giornata", accent: true },
  ],
  route: {
    label: "/01 — Il percorso",
    titleLines: [
      [{ text: "Sei chilometri," }],
      [{ text: "venti tornanti.", accent: true }],
    ],
    paragraphs: [
      "La partenza è dal piazzale del bar di Roiano di Campli (327m). Si inizia subito a salire al 6,5% costante per il primo chilometro, poi il terreno si fa più impegnativo: tra il km 2 e il km 4 la media è dell'8% con picchi al 10% nei tornanti.",
      "Dal km 4 al km 5 una breve discesa di 200 metri permette di tirare il fiato, prima dell'ultimo strappo finale che porta al Rifugio delle Aquile (762m), dove il panorama si apre sul mare Adriatico da una parte e sul massiccio del Gran Sasso dall'altra.",
    ],
    recon: {
      before: "Ricognizione collettiva libera ",
      strong: "il 25 maggio",
      after: " partendo dalla nostra sede.",
    },
    profileLabel: "Profilo altimetrico",
    profile: {
      gradients: [
        { x: 200, y: 220, label: "6,5%" },
        { x: 450, y: 170, label: "7,8%" },
        { x: 700, y: 120, label: "8,4%" },
        { x: 950, y: 70, label: "6,9%" },
      ],
      kmMarks: [
        { x: 20, label: "0 KM" },
        { x: 220, label: "1" },
        { x: 420, label: "2" },
        { x: 620, label: "3" },
        { x: 820, label: "4" },
        { x: 1020, label: "5" },
        { x: 1160, label: "6.10" },
      ],
      start: "START · ROIANO · 327m",
      end: "RIFUGIO DELLE AQUILE · 762m",
    },
  },
  info: {
    label: "/02 — Info pratiche",
    title: "Quello che devi sapere.",
    cards: [
      {
        title: "Categorie",
        text: "JUN · ÉLITE · M1 · M2 · M3 · M4 · M5 · Donne (DA · DB · DC)",
        accent: "red" as const,
      },
      {
        title: "Iscrizione",
        text: "€25 entro il 15 giugno · €35 in giornata · Tessera CSI obbligatoria",
        accent: "red" as const,
      },
      {
        title: "Servizi inclusi",
        text: "Pacco gara · Ristoro in cima · Cronometraggio chip · Foto · Pasta party",
        accent: "red" as const,
      },
      {
        title: "Premi",
        text: 'Primi 3 di categoria · Maglia leader giovani · KOM assoluto · Premio "ultimo arrivato"',
        accent: "amber" as const,
      },
    ],
    programTitle: "Programma della giornata.",
    program: [
      { time: "07:00", text: "Apertura segreteria, ritiro pacco gara e numero al campo di Roiano." },
      { time: "08:15", text: "Briefing tecnico e nota di sicurezza. Tutti in zona partenza." },
      { time: "08:30", text: 'Partenza primo concorrente. Ogni atleta parte a distanza di 30".' },
      { time: "11:00", text: "Chiusura ufficiale del cronometro. Discesa accompagnata fino a Roiano." },
      { time: "12:30", text: "Pasta party in piazza a Roiano (incluso nell'iscrizione)." },
      { time: "14:00", text: "Cerimonia di premiazione delle categorie." },
    ],
  },
  registration: {
    label: "/03 — Iscriviti",
    titleLines: [[{ text: "Compila e" }], [{ text: "parti.", accent: true }]],
    intro:
      "Compila tutti i campi richiesti. Riceverai una mail di conferma all'indirizzo indicato.",
    summaryTitle: "In breve",
    summary: [
      { label: "Quota gara", value: "€25,00" },
      { label: "Pacco gara + chip", value: "incluso" },
      { label: "Pasta party", value: "incluso" },
    ],
    warning: {
      title: "⚠ Posti limitati",
      before: "87 iscritti su 200. Chiusura iscrizioni il ",
      strong: "15 giugno",
      after: " alle 23:59.",
    },
    formTitle: "Modulo iscrizione",
    formNote: "I campi contrassegnati con * sono obbligatori.",
    fee: "€25,00",
    feeLabel: "Quota iscrizione",
    feeNote: "Pagamento al ritiro pettorale",
    submitLabel: "⮕  Invia iscrizione",
    footnoteBefore:
      "Riceverai una mail di conferma all'indirizzo indicato. In caso di problemi: ",
    footnoteEmail: "cronoscalata@teramobike.it",
    tessere: ["FCI", "UISP", "ACSI", "CSI", "Altro"],
    /** Category options. Suffix -M / -W is used to filter by gender. */
    categories: [
      "Primavera - PRI-M",
      "Debuttante - DEB-M",
      "Junior Sport - JUN-M",
      "Elite Sport - ELISP-M",
      "Master 1 - M1",
      "Master 2 - M2",
      "Master 3 - M3",
      "Master 4 - M4",
      "Master 5 - M5",
      "Master 6 - M6",
      "Master 7 - M7",
      "Master 8 - M8",
      "Master 9 - M9",
      "Master 10 - M10",
      "Free Bike - FBK-W",
      "Primavera - PRI-W",
      "Debuttante - DEB-W",
      "Junior Sport - JUN-W",
      "Elite Sport - ELISP-W",
      "Master Women 1 - W1",
      "Master Women 2 - W2",
      "Master Women 3 - W3",
      "Master Women 4 - W4",
    ],
  },
  partnersLabel: "— L'evento è reso possibile da —",
  partners: [
    { name: "Di Mattia Fiore", detail: "Title Sponsor" },
    { name: "EcoVerde", detail: "Energia" },
    { name: "Brian's", detail: "Bike Shop" },
    { name: "Vischia", detail: "Autocarrozzeria" },
    { name: "Decar", detail: "Ford Partner" },
    { name: "Pallini", detail: "Gioielleria" },
    { name: "D'Onofrio", detail: "Farmacia" },
    { name: "CSI", detail: "Centro Sportivo Italiano" },
  ],
};
