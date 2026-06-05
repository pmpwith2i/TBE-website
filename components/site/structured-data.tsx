import { SITE } from "@/constants/site";

/**
 * JSON-LD structured data (schema.org), rendered site-wide from the root
 * layout. A SportsClub entity for the team + a WebSite node, so Google can
 * build the brand/knowledge entity and understand this is an Italian cycling
 * club based in Teramo. Address is kept at locality level on purpose (no
 * unverified street/VAT pushed to search engines).
 */
export function StructuredData() {
  const base = SITE.url.replace(/\/$/, "");

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SportsClub",
        "@id": `${base}/#club`,
        name: SITE.name,
        alternateName: SITE.shortName,
        legalName: SITE.legalName,
        description:
          "Squadra di ciclismo a Teramo: uscite in bici di gruppo aperte a tutti, e qualche gara del calendario FCI e CSI. ASD affiliata FCI e CSI.",
        url: base,
        logo: `${base}${SITE.logos.badge}`,
        image: `${base}/assets/sunset-rider.jpg`,
        sport: "Ciclismo",
        knowsLanguage: "it",
        areaServed: { "@type": "City", name: "Teramo" },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Teramo",
          addressRegion: "TE",
          postalCode: "64100",
          addressCountry: "IT",
        },
        sameAs: [SITE.instagram, SITE.facebook],
        memberOf: [
          {
            "@type": "SportsOrganization",
            name: "Federazione Ciclistica Italiana",
            alternateName: "FCI",
          },
          {
            "@type": "SportsOrganization",
            name: "Centro Sportivo Italiano",
            alternateName: "CSI",
          },
        ],
        member: [
          {
            "@type": "Person",
            name: "Daniele Di Odoardo",
            jobTitle: "Tecnico istruttore di secondo livello FCI",
          },
          {
            "@type": "Person",
            name: "Davide Danesi",
            jobTitle:
              "Tecnico istruttore di secondo livello FCI · Istruttore/tecnico sportivo Cicloturismo di primo livello CSI",
          },
          {
            "@type": "Person",
            name: "Renzo Miracoli",
            jobTitle:
              "Istruttore/tecnico sportivo Cicloturismo di primo livello CSI",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        name: SITE.name,
        url: base,
        inLanguage: "it-IT",
        publisher: { "@id": `${base}/#club` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
