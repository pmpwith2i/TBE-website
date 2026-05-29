/**
 * Vision / manifesto page content.
 */

export const VISION_HERO = {
  bgImage: "/assets/sunset-rider.jpg",
  eyebrowNum: "/00",
  eyebrowText: "La nostra Vision",
  titleLines: [[{ text: "La bici è" }], [{ text: "una scusa.", accent: true }]],
  lead: "Una scusa per alzarsi presto. Per chiamare un amico la domenica. Per scoprire un paese a quattro chilometri da casa di cui non sapevi il nome. Per fare 200 metri di dislivello in più solo per vedere il mare da lassù.",
};

export const VISION_MANIFESTO = {
  label: "/01 — Manifesto",
  titleLines: [
    [{ text: "Quattro convinzioni" }],
    [{ text: "che ci tengono" }],
    [{ text: "in sella.", accent: true }],
  ],
  points: [
    {
      kicker: "01 / Territorio",
      title: "Il nostro territorio è la palestra.",
      text: "Dal mare alle montagne in due ore di bici. Mille metri di dislivello dietro casa, valli che non finiscono, strade dove non passa nessuno. Non ci serve andare altrove: qui c'è già tutto.",
    },
    {
      kicker: "02 / Comunità",
      title: "Si pedala in due o non si pedala.",
      text: "Non ci interessa il fenomeno solitario. Ci interessa chi aspetta in cima per chi è in difficoltà, chi divide la borraccia, chi torna indietro a controllare. Il gruppo è la nostra unità di misura.",
    },
    {
      kicker: "03 / Apertura",
      title: "Nessun livello richiesto.",
      text: "Abbiamo corridori da podio e gente che ha cominciato a 50 anni. Tutti in maglia, tutti nello stesso gruppo. L'unico requisito è esserci, anche quando piove.",
    },
    {
      kicker: "04 / Sostanza",
      title: "Meno post, più chilometri.",
      text: "Non facciamo questo per i social. Facciamo questo perché la testa, dopo cento chilometri, è in pace. Tutto il resto — la maglia, le foto, gli sponsor — viene di conseguenza.",
    },
  ],
};

export const VISION_QUOTE = {
  lines: [
    { text: "La salita non si vince" },
    { text: "con le gambe." },
    { text: "Si vince con la pazienza.", outline: true },
  ],
  attribution: "Mantra della Cronoscalata · TBE",
};

export const VISION_STORY = {
  label: "/02 — Come siamo nati",
  titleLines: [
    [{ text: "Tre anni fa, un caffè a Roseto." }],
    [{ text: "Oggi, una squadra vera.", accent: true }],
  ],
  timeline: [
    {
      year: "'23",
      title: "Il primo gruppo",
      text: "Sei amici, una chat WhatsApp, e l'idea di fare un'uscita ogni domenica. Da Teramo verso il mare, poi su per Civitella, poi giù di nuovo. Niente di organizzato. Tutto spontaneo.",
    },
    {
      year: "'24",
      title: "La prima maglia",
      text: "Di Mattia Fiore Costruzioni ci offre di stampare una maglia. La disegniamo noi una sera, ispirandoci ai colori del Gran Sasso al tramonto. Da sei diventiamo dodici.",
    },
    {
      year: "'25",
      title: "ASD e prima gara",
      text: "Diventiamo Associazione Sportiva Dilettantistica, affiliata CSI. Schieriamo sette atleti alla Granfondo dei Quattro Borghi: tre arrivano nei primi venti di categoria.",
    },
    {
      year: "'26",
      title: "Organizziamo noi",
      textBefore: "Lanciamo la ",
      textEm: "Prima Cronoscalata di Mattia Fiore Costruzioni",
      textAfter:
        ": Roiano → Rifugio delle Aquile, 6,10 km al 7,2%. Quindici corridori, undici sponsor, una stagione vera.",
    },
  ],
};

export const VISION_VALUES = {
  label: "/03 — Cosa facciamo",
  titleLines: [[{ text: "Quattro cose," }], [{ text: "fatte bene." }]],
  cards: [
    {
      num: "01",
      title: "Gare",
      text: "Calendario CSI, oltre 30 gare l'anno. Roster pubblico per ogni evento.",
    },
    {
      num: "02",
      title: "Uscite Social",
      text: "Domenica mattina, aperte a chiunque abbia una bici. Tre velocità, nessuno lasciato indietro.",
    },
    {
      num: "03",
      title: "Eventi",
      text: "Cronoscalata di stagione + pedalate solidali. Organizzati da noi, aperti a tutti.",
    },
    {
      num: "04",
      title: "Avviamento",
      text: "Programma per nuovi ciclisti: 10 settimane, gruppo dedicato, dal primo pedale alla prima gara.",
    },
  ],
};

export const VISION_CTA = {
  titleLines: [[{ text: "Ti rispecchi in tutto" }], [{ text: "questo?" }]],
  lead: "Allora c'è una bici e una maglia che ti aspettano. Scrivici.",
  cta: { label: "Candidati al team", href: "/contatti" },
};
