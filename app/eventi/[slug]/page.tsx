import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EventRegistrationForm } from "@/components/eventi/event-registration-form";
import { SiteShell } from "@/components/site/site-shell";
import { Eyebrow, SectionLabel } from "@/components/site/section-label";
import { EVENTS, getEventBySlug } from "@/constants/events";
import { pageSeo } from "@/lib/seo";

type EventPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return EVENTS.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {};
  }

  return pageSeo({
    title: event.title,
    description: `${event.title}: locandina, data, premi, note e pre-iscrizione quando disponibile.`,
    path: `/eventi/${event.slug}`,
    keywords: [
      event.title,
      `${event.typeLabel} Teramo`,
      `pre iscrizione ${event.typeLabel.toLowerCase()} Teramo`,
    ],
  });
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <SiteShell theme="dark">
      <section
        className="event-detail-hero"
        style={{
          background: "var(--tbe-black)",
          color: "var(--tbe-paper)",
        }}
      >
        <div className="container event-detail-hero__grid">
          <div>
            <Eyebrow num="/04" light style={{ marginBottom: 28 }}>
              {event.typeLabel}
            </Eyebrow>
            <h1 className="display event-detail-title">{event.title}</h1>
            <p className="lede" style={{ marginTop: 28, opacity: 0.82 }}>
              {event.notes}
            </p>
            <div className="event-detail-actions">
              {event.preRegistration.available ? (
                <a href="#pre-iscrizione" className="btn btn-primary">
                  Pre-iscriviti
                  <span className="arrow" aria-hidden>
                    →
                  </span>
                </a>
              ) : null}
              <Link href="/eventi" className="btn btn-ghost">
                Tutti gli eventi
              </Link>
            </div>
          </div>

          <figure className="event-poster">
            <Image
              src={event.poster}
              alt={event.posterAlt}
              width={event.posterSize.width}
              height={event.posterSize.height}
              sizes="(max-width: 900px) 82vw, 420px"
              priority
            />
          </figure>
        </div>
      </section>

      <section
        className="section"
        style={{
          background: "var(--tbe-ink)",
          paddingBlock: "clamp(56px, 8vw, 104px)",
        }}
      >
        <div className="container event-detail-info">
          <div>
            <SectionLabel light>Informazioni</SectionLabel>
            <dl className="event-facts">
              <div>
                <dt>Data</dt>
                <dd>{event.date.label}</dd>
              </div>
              <div>
                <dt>Luogo</dt>
                <dd>{event.location}</dd>
              </div>
              <div>
                <dt>Pre-iscrizione</dt>
                <dd>{event.preRegistration.available ? "Disponibile" : "Non disponibile"}</dd>
              </div>
            </dl>
          </div>

          <div>
            <SectionLabel light>Premi</SectionLabel>
            <ul className="event-awards">
              {event.awards.map((award) => (
                <li key={award}>{award}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        id="pre-iscrizione"
        className="section"
        style={{
          background: "var(--tbe-black)",
          paddingBlock: "clamp(56px, 8vw, 110px)",
        }}
      >
        <div className="container event-registration-section">
          <div>
            <SectionLabel light>Pre-iscrizione</SectionLabel>
            <h2 className="display display-l" style={{ marginBottom: 22 }}>
              Lascia i tuoi
              <br />
              <span style={{ color: "var(--accent)" }}>dati.</span>
            </h2>
            <p className="lede" style={{ opacity: 0.82, maxWidth: "42ch" }}>
              I campi extra del form sono specifici di questo evento e si
              modificano dal file di costanti.
            </p>
          </div>

          <EventRegistrationForm event={event} />
        </div>
      </section>
    </SiteShell>
  );
}
