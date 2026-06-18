import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { pageSeo } from "@/lib/seo";
import { Eyebrow, SectionLabel } from "@/components/site/section-label";
import { BtnLink } from "@/components/site/buttons";
import { EVENTS, FEATURED_EVENT } from "@/constants/events";

export const metadata = pageSeo({
  title: "Eventi e pre-iscrizioni",
  description:
    "Gli eventi di Teramo Bike Experience: cicloturistica, cronoscalata, locandine, premi, note e pre-iscrizioni quando disponibili.",
  path: "/eventi",
  keywords: [
    "eventi ciclismo Teramo",
    "cicloturistica Teramo",
    "cronoscalata Teramo",
    "pre iscrizione ciclismo Teramo",
  ],
});

export default function EventiPage() {
  return (
    <SiteShell theme="dark">
      <section
        style={{
          padding: "180px var(--gutter) 80px",
          background: "var(--tbe-black)",
          color: "var(--tbe-paper)",
        }}
      >
        <div className="container">
          <Eyebrow num="/04" light style={{ marginBottom: 28 }}>
            Eventi
          </Eyebrow>
          <h1
            className="display"
            style={{ fontSize: "clamp(56px, 11vw, 180px)", lineHeight: 0.85 }}
          >
            Gare e
            <br />
            <span style={{ color: "var(--accent)" }}>pedalate.</span>
          </h1>
          <p
            className="lede"
            style={{ marginTop: 32, opacity: 0.8, maxWidth: "60ch" }}
          >
            Qui trovi gli eventi organizzati da Teramo Bike Experience: locandina,
            data, premi, note e pre-iscrizione quando e aperta.
          </p>
        </div>
      </section>

      <section
        className="section"
        style={{
          background: "var(--tbe-black)",
          paddingTop: 0,
        }}
      >
        <div className="container">
          <SectionLabel light>In evidenza</SectionLabel>
          <Link
            href={`/eventi/${FEATURED_EVENT.slug}`}
            className="next-event"
            style={{ display: "block" }}
          >
            <div className="next-event-overlay" />
            <div className="next-event-inner">
              <div>
                <span className="next-event-tag">
                  {FEATURED_EVENT.preRegistration.available ? (
                    <span className="pulse" aria-hidden />
                  ) : null}
                  {FEATURED_EVENT.preRegistration.available
                    ? "Pre-iscrizioni aperte"
                    : "In preparazione"}
                </span>
                <h2
                  className="display display-xl"
                  style={{ marginTop: 28, marginBottom: 20 }}
                >
                  {FEATURED_EVENT.title}
                </h2>
                <p className="lede" style={{ opacity: 0.86, marginBottom: 28 }}>
                  {FEATURED_EVENT.notes}
                </p>
                <div className="event-feature-meta">
                  <div>
                    <span>Data</span>
                    <strong>{FEATURED_EVENT.date.label}</strong>
                  </div>
                  <div>
                    <span>Tipo</span>
                    <strong>{FEATURED_EVENT.typeLabel}</strong>
                  </div>
                  <div>
                    <span>Premi</span>
                    <strong>{FEATURED_EVENT.awards.length} voci</strong>
                  </div>
                </div>
                <span className="btn btn-primary">
                  Vai all&apos;evento
                  <span className="arrow" aria-hidden>
                    →
                  </span>
                </span>
              </div>

              <figure className="event-feature-poster">
                <Image
                  src={FEATURED_EVENT.poster}
                  alt={FEATURED_EVENT.posterAlt}
                  width={FEATURED_EVENT.posterSize.width}
                  height={FEATURED_EVENT.posterSize.height}
                  sizes="(max-width: 800px) 82vw, 360px"
                  priority
                />
              </figure>
            </div>
          </Link>
        </div>
      </section>

      <section
        className="section"
        style={{
          background: "var(--tbe-ink)",
          paddingBlock: "clamp(60px, 8vw, 100px)",
        }}
      >
        <div className="container">
          <SectionLabel light>Calendario</SectionLabel>
          <div>
            {EVENTS.map((event) => (
              <Link
                key={event.slug}
                href={`/eventi/${event.slug}`}
                className="event-row"
              >
                <div className="event-date" aria-label={event.date.label}>
                  <span className="day">{event.date.dayLabel}</span>
                  <span className="month">{event.date.monthLabel}</span>
                </div>
                <div>
                  <div className="event-type">{event.typeLabel}</div>
                  <div className="event-title">{event.title}</div>
                </div>
                <div className="event-place">{event.location}</div>
                <div className="event-cta">
                  {event.preRegistration.available
                    ? "Pre-iscriviti"
                    : "Dettagli"}
                  <span className="arrow" aria-hidden>
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          background: "var(--tbe-black)",
          padding: "var(--section) var(--gutter)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 className="display display-l" style={{ marginBottom: 20 }}>
            Hai domande
            <br />
            <span style={{ color: "var(--accent)" }}>sugli eventi?</span>
          </h2>
          <p
            className="lede"
            style={{ margin: "0 auto 32px", maxWidth: "50ch", opacity: 0.85 }}
          >
            Scrivici dai contatti: ti rispondiamo con aggiornamenti su percorsi,
            regolamenti e aperture delle pre-iscrizioni.
          </p>
          <BtnLink href="/contatti" className="btn btn-primary">
            Scrivici
          </BtnLink>
        </div>
      </section>
    </SiteShell>
  );
}
