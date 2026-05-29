/**
 * Team page: the rider roster grid and the staff. Add/remove riders here.
 */

export interface Rider {
  n: number;
  first: string;
  last: string;
  town: string;
  img: string;
}

export interface StaffMember {
  role: string;
  name: string;
  bio: string;
  img: string;
}

export const TEAM_HERO = {
  eyebrowNum: "/02",
  eyebrowText: "Roster Stagione 2026",
  titleLines: [
    [{ text: "Stessa" }],
    [{ text: "strada.", accent: true }],
    [{ text: "Stessa " }, { text: "maglia", em: true }, { text: "." }],
  ],
  lead: "Dai veterani che hanno cominciato negli anni '90 ai venti­enni della categoria juniores. Tutti teramani, tutti diversi, tutti con la stessa voglia di pedalare insieme.",
  counterLabel: "Corridori iscritti · Stagione 2026",
};

export const RIDERS: Rider[] = [
  { n: 1, first: "Marco", last: "Di Pietro", town: "Mosciano S.A.", img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=900&q=85" },
  { n: 2, first: "Luca", last: "Marini", town: "Teramo", img: "https://images.unsplash.com/photo-1604242692760-2f7b0c26856d?w=900&q=85" },
  { n: 3, first: "Andrea", last: "Costanzi", town: "Campli", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=85" },
  { n: 4, first: "Federico", last: "Liguori", town: "Roseto", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=85" },
  { n: 5, first: "Davide", last: "Tagliente", town: "Atri", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&q=85" },
  { n: 6, first: "Simone", last: "D'Onofrio", town: "Isola G.S.", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=85" },
  { n: 7, first: "Giulia", last: "Pavone", town: "Teramo", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900&q=85" },
  { n: 8, first: "Mattia", last: "Fiore", town: "Campli", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=85" },
  { n: 9, first: "Sara", last: "Verdone", town: "Pineto", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&q=85" },
  { n: 10, first: "Antonio", last: "Ciaffaroni", town: "Teramo", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=900&q=85" },
  { n: 11, first: "Francesco", last: "Petruzzi", town: "Giulianova", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=900&q=85" },
  { n: 12, first: "Chiara", last: "Massari", town: "Castelli", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=900&q=85" },
  { n: 13, first: "Pietro", last: "Iezzi", town: "Isola G.S.", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=900&q=85" },
  { n: 14, first: "Stefano", last: "Cocci", town: "Civitella", img: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=900&q=85" },
  { n: 15, first: "Riccardo", last: "Bucci", town: "Roseto", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=900&q=85" },
];

export const STAFF_SECTION = {
  label: "/03 — Staff",
  titleLines: [
    [{ text: "Chi " }, { text: "tiene in piedi", accent: true }],
    [{ text: "tutta la baracca." }],
  ],
};

export const STAFF: StaffMember[] = [
  {
    role: "Direttore Sportivo",
    name: "Roberto Pallini",
    bio: "Ex pro' anni '80, oggi tattica e calendario gare. La voce in radio quando le cose si complicano.",
    img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&q=85",
  },
  {
    role: "Meccanico",
    name: "Brian Esposito",
    bio: "Brian's Bike Shop, Castelnuovo Vomano. Mani che capiscono le bici prima che parlino. Sponsor & officina.",
    img: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=800&q=85",
  },
  {
    role: "Fisioterapista",
    name: "Elena Marcozzi",
    bio: "Studio Fisioste, Teramo. Rimette in piedi ginocchia e schiene il lunedì mattina, sempre.",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=85",
  },
];
