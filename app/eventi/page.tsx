import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { pageSeo } from "@/lib/seo";
import { SectionLabel } from "@/components/site/section-label";
import { BtnLink, ButtonArrow } from "@/components/site/buttons";
import { EventMainSponsor } from "@/components/eventi/event-main-sponsor";
import { EventsListStructuredData } from "@/components/site/structured-data";
import {
  EVENTS,
  getEventRegistrationCtaLabel,
  hasEventRegistration,
} from "@/constants/events";

export const metadata = pageSeo({
  title: "Eventi e iscrizioni",
  description:
    "Calendario Teramo Bike Experience: Cicloturistica di Garrano del 4 luglio 2026 e Cronoscalata del 5 luglio 2026, con dettagli, GPX e iscrizioni.",
  path: "/eventi",
  keywords: [
    "eventi ciclismo Teramo",
    "calendario eventi ciclismo Teramo",
    "gare ciclismo Teramo",
    "cicloturistica e cronoscalata Teramo",
    "Cicloturistica di Garrano",
    "Cronoscalata Teramo Bike Experience",
    "Garrano Basso",
    "Roiano di Campli",
  ],
});

const CHRONOLOGICAL_EVENTS = [...EVENTS].sort((a, b) =>
  (a.date.iso ?? "9999-12-31").localeCompare(b.date.iso ?? "9999-12-31")
);

export default function EventiPage() {
  return (
    <SiteShell theme="dark">
      <EventsListStructuredData />
      <section className="bg-tbe-black px-[var(--gutter)] pb-20 pt-[180px] text-tbe-paper">
        <div className="mx-auto w-full max-w-[var(--maxw)]">
          <h1 className="font-display text-[clamp(56px,11vw,180px)] font-black italic uppercase leading-[0.85] tracking-[-0.01em]">
            Gare ed
            <br />
            <span className="text-accent">eventi.</span>
          </h1>
        </div>
      </section>

      <section className="bg-tbe-ink py-[clamp(60px,8vw,100px)]">
        <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--gutter)]">
          <SectionLabel light>Calendario</SectionLabel>
          <div>
            {CHRONOLOGICAL_EVENTS.map((event) => (
              <Link
                key={event.slug}
                href={`/eventi/${event.slug}`}
                className="group grid grid-cols-[120px_1fr_220px_160px] items-center gap-8 border-b border-white/10 py-7 text-inherit transition-[background,padding] duration-200 hover:bg-tbe-red/10 hover:px-4 max-[900px]:grid-cols-[90px_1fr] max-[900px]:gap-4"
              >
                <div
                  className="font-display font-black italic leading-[0.9]"
                  aria-label={event.date.label}
                >
                  <span className="block text-[56px] text-accent">
                    {event.date.dayLabel}
                  </span>
                  <span className="mt-1 block text-sm uppercase tracking-[0.1em] opacity-70">
                    {event.date.monthLabel}
                  </span>
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                    {event.typeLabel}
                  </div>
                  <div className="mt-1 font-display text-2xl font-extrabold italic uppercase leading-[1.1]">
                    {event.title}
                  </div>
                  {event.mainSponsor ? (
                    <EventMainSponsor
                      sponsor={event.mainSponsor}
                      variant="compact"
                      className="mt-4"
                    />
                  ) : null}
                </div>
                <div className="font-mono text-xs uppercase tracking-[0.1em] opacity-70 max-[900px]:col-start-2">
                  {event.location}
                </div>
                <div className="flex items-center justify-end gap-2 text-right font-display text-[13px] font-extrabold italic uppercase tracking-[0.1em] text-accent transition-colors group-hover:text-white max-[900px]:col-start-2 max-[900px]:justify-start">
                  {hasEventRegistration(event)
                    ? getEventRegistrationCtaLabel(event)
                    : "Dettagli"}
                  <ButtonArrow />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-tbe-black px-[var(--gutter)] py-[var(--section)] text-center">
        <div className="mx-auto max-w-[800px]">
          <h2 className="mb-5 font-display text-[clamp(36px,5vw,76px)] font-black italic uppercase leading-[0.88] tracking-[-0.01em]">
            Hai domande
            <br />
            <span className="text-accent">sugli eventi?</span>
          </h2>
          <p className="mx-auto mb-8 max-w-[50ch] text-[clamp(18px,1.4vw,22px)] leading-[1.5] opacity-85">
            Scrivici dai contatti: ti rispondiamo con aggiornamenti su percorsi,
            regolamenti e aperture delle pre-iscrizioni.
          </p>
          <BtnLink href="/contatti">Scrivici</BtnLink>
        </div>
      </section>
    </SiteShell>
  );
}
