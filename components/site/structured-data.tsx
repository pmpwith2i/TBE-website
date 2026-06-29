import {
  EVENTS,
  hasEventRegistration,
  type BikeEvent,
} from "@/constants/events";
import { SITE } from "@/constants/site";
import { SITE_UPDATED_AT } from "@/lib/seo";

/**
 * JSON-LD structured data (schema.org).
 *
 * - `StructuredData` is rendered site-wide from the root layout: a `SportsClub`
 *   entity for the team + a `WebSite` node, so Google can build the brand /
 *   knowledge entity and understand this is an Italian cycling club in Teramo.
 * - `EventStructuredData` is rendered on each event's own page (its `SportsEvent`
 *   node + a breadcrumb). Event markup lives on the event page it describes —
 *   not on every page — which is what Google expects for rich results. The
 *   `SportsClub` referenced as `organizer` is always present via the layout.
 * - `EventsListStructuredData` adds a breadcrumb + `ItemList` on the calendar.
 */
const BASE = SITE.url.replace(/\/$/, "");

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

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

/** Build the `SportsEvent` node for one event, referencing the club as organizer. */
function eventNode(event: BikeEvent) {
  const externalUrl =
    "externalUrl" in event.preRegistration
      ? event.preRegistration.externalUrl
      : undefined;
  const registrationUrl =
    externalUrl ?? `${BASE}/eventi/${event.slug}#pre-iscrizione`;

  return {
    "@type": "SportsEvent",
    "@id": `${BASE}/eventi/${event.slug}#event`,
    name: event.title,
    description: event.notes,
    sport: "Ciclismo",
    inLanguage: "it-IT",
    startDate: schemaStartDate(event),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: `${BASE}${event.poster}`,
    url: `${BASE}/eventi/${event.slug}`,
    organizer: { "@id": `${BASE}/#club` },
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
            validFrom: SITE_UPDATED_AT,
            url: registrationUrl,
          }))
        : undefined,
  };
}

function breadcrumb(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE}${item.path}`,
    })),
  };
}

export function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SportsClub",
        "@id": `${BASE}/#club`,
        name: SITE.name,
        alternateName: SITE.shortName,
        legalName: SITE.legalName,
        description: SITE.description,
        url: BASE,
        logo: `${BASE}${SITE.logos.badge}`,
        image: `${BASE}/assets/sunset-rider.jpg`,
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
        "@id": `${BASE}/#website`,
        name: SITE.name,
        url: BASE,
        inLanguage: "it-IT",
        publisher: { "@id": `${BASE}/#club` },
      },
    ],
  };

  return <JsonLd data={graph} />;
}

/** Per-event markup: the `SportsEvent` node + a breadcrumb, on the event page. */
export function EventStructuredData({ event }: { event: BikeEvent }) {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      eventNode(event),
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Eventi", path: "/eventi" },
        { name: event.title, path: `/eventi/${event.slug}` },
      ]),
    ],
  };

  return <JsonLd data={graph} />;
}

/** Calendar markup: a breadcrumb + an `ItemList` of the events. */
export function EventsListStructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Eventi", path: "/eventi" },
      ]),
      {
        "@type": "ItemList",
        name: `Eventi ${SITE.name}`,
        itemListElement: EVENTS.map((event, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: event.title,
          url: `${BASE}/eventi/${event.slug}`,
        })),
      },
    ],
  };

  return <JsonLd data={graph} />;
}
