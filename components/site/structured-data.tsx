import { EVENTS, hasEventRegistration, type BikeEvent } from "@/constants/events";
import { SITE } from "@/constants/site";

/**
 * JSON-LD structured data (schema.org), rendered site-wide from the root
 * layout. A SportsClub entity for the team + a WebSite node, so Google can
 * build the brand/knowledge entity and understand this is an Italian cycling
 * club based in Teramo.
 */
function schemaStartDate(event: BikeEvent) {
  if (!event.date.iso) {
    return undefined;
  }

  const rawTime = event.schedule[0]?.time?.replace(".", ":") ?? "00:00";
  const time = /^\d{2}:\d{2}$/.test(rawTime) ? rawTime : "00:00";
  return `${event.date.iso}T${time}:00+02:00`;
}

function stripProvince(location: string) {
  return location.replace(/\s*\(TE\)\s*$/i, "");
}

function euroPrice(amount: string) {
  const value = Number.parseFloat(
    amount.replace(/[^\d,.-]/g, "").replace(",", ".")
  );

  return Number.isFinite(value) ? value.toFixed(2) : undefined;
}

export function StructuredData() {
  const base = SITE.url.replace(/\/$/, "");
  const eventNodes = EVENTS.filter((event) => event.date.iso).map((event) => {
    const externalUrl =
      "externalUrl" in event.preRegistration
        ? event.preRegistration.externalUrl
        : undefined;
    const registrationUrl =
      externalUrl ?? `${base}/eventi/${event.slug}#pre-iscrizione`;

    return {
      "@type": "SportsEvent",
      "@id": `${base}/eventi/${event.slug}#event`,
      name: event.title,
      description: event.notes,
      sport: "Ciclismo",
      startDate: schemaStartDate(event),
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      image: `${base}${event.poster}`,
      url: `${base}/eventi/${event.slug}`,
      organizer: { "@id": `${base}/#club` },
      location: {
        "@type": "Place",
        name: event.location,
        address: {
          "@type": "PostalAddress",
          streetAddress: event.schedule[0]?.detail ?? event.location,
          addressLocality: stripProvince(event.location),
          addressRegion: "TE",
          addressCountry: "IT",
        },
      },
      offers:
        hasEventRegistration(event) && event.fees.length > 0
          ? event.fees.map((fee) => ({
              "@type": "Offer",
              name: fee.label,
              price: euroPrice(fee.amount),
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
              url: registrationUrl,
            }))
          : undefined,
    };
  });

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SportsClub",
        "@id": `${base}/#club`,
        name: SITE.name,
        alternateName: SITE.shortName,
        legalName: SITE.legalName,
        description: SITE.description,
        url: base,
        logo: `${base}${SITE.logos.badge}`,
        image: `${base}/assets/sunset-rider.jpg`,
        sport: "Ciclismo",
        knowsLanguage: "it",
        areaServed: { "@type": "City", name: "Teramo" },
        taxID: SITE.vatNumber,
        identifier: {
          "@type": "PropertyValue",
          propertyID: "P.IVA",
          value: SITE.vatNumber,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.addressParts.streetAddress,
          postalCode: SITE.addressParts.postalCode,
          addressLocality: SITE.addressParts.addressLocality,
          addressRegion: SITE.addressParts.addressRegion,
          addressCountry: SITE.addressParts.addressCountry,
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
        member: SITE.instructors.map((instructor) => ({
          "@type": "Person",
          name: instructor.name,
          jobTitle: instructor.role,
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        name: SITE.name,
        url: base,
        inLanguage: "it-IT",
        publisher: { "@id": `${base}/#club` },
      },
      ...eventNodes,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
