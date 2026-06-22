import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EventRegistrationForm } from "@/components/eventi/event-registration-form";
import { EventMainSponsor } from "@/components/eventi/event-main-sponsor";
import { EventRoutesViewer } from "@/components/eventi/event-routes-viewer";
import { SiteShell } from "@/components/site/site-shell";
import { Eyebrow, SectionLabel } from "@/components/site/section-label";
import { ButtonArrow } from "@/components/site/buttons";
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

  const infoRows = [
    ["Data", event.date.label],
    ["Luogo", event.location],
    ...(event.registrationFee
      ? [["Quota", event.registrationFee.amount]]
      : []),
    [
      "Pre-iscrizione",
      event.preRegistration.available ? "Disponibile" : "Non disponibile",
    ],
  ];
  const hasRouteDetails = event.routes.length > 0 || Boolean(event.registrationFee);

  return (
    <SiteShell theme="dark">
      <section className="bg-tbe-black pb-[88px] pt-[180px] text-tbe-paper">
        <div className="mx-auto grid w-full max-w-[var(--maxw)] items-center gap-[clamp(36px,7vw,110px)] px-[var(--gutter)] min-[901px]:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div>
            <Eyebrow num="/04" light className="mb-7">
              {event.typeLabel}
            </Eyebrow>
            <h1 className="max-w-[10ch] font-display text-[clamp(52px,9vw,142px)] font-black italic uppercase leading-[0.85] tracking-[-0.01em]">
              {event.title}
            </h1>
            {event.mainSponsor ? (
              <EventMainSponsor
                sponsor={event.mainSponsor}
                className="mt-7"
              />
            ) : null}
            <p className="mt-7 max-w-[60ch] text-[clamp(18px,1.4vw,22px)] leading-[1.5] opacity-80">
              {event.notes}
            </p>
            <div className="mt-[34px] flex flex-wrap gap-4">
              {event.preRegistration.available ? (
                <a
                  href="#pre-iscrizione"
                  className="group inline-flex cursor-pointer items-center gap-2.5 border-0 bg-accent px-8 py-4 font-display text-base font-extrabold italic uppercase tracking-[0.1em] text-tbe-white transition-[background,transform] duration-200 [clip-path:polygon(6%_0,100%_0,94%_100%,0_100%)] hover:translate-x-1 hover:bg-tbe-amber"
                >
                  Pre-iscriviti
                  <ButtonArrow />
                </a>
              ) : null}
              {event.routes.length > 0 ? (
                <a
                  href="#tracciati"
                  className="inline-flex items-center border-b-2 border-accent bg-transparent px-0 py-2 font-display text-base font-extrabold italic uppercase tracking-[0.1em] text-current transition-colors hover:text-accent"
                >
                  Tracciati GPX
                </a>
              ) : null}
              <Link
                href="/eventi"
                className="inline-flex items-center border-b-2 border-accent bg-transparent px-0 py-2 font-display text-base font-extrabold italic uppercase tracking-[0.1em] text-current transition-colors hover:text-accent"
              >
                Tutti gli eventi
              </Link>
            </div>
          </div>

          <figure className="m-0 w-[min(100%,460px)] justify-self-start overflow-hidden border border-white/10 bg-tbe-graphite min-[901px]:justify-self-end">
            <Image
              src={event.poster}
              alt={event.posterAlt}
              width={event.posterSize.width}
              height={event.posterSize.height}
              sizes="(max-width: 900px) 82vw, 420px"
              className="h-auto w-full object-contain"
              priority
            />
          </figure>
        </div>
      </section>

      <section className="bg-tbe-ink py-[clamp(56px,8vw,104px)]">
        <div className="mx-auto grid w-full max-w-[var(--maxw)] items-start gap-[clamp(36px,7vw,96px)] px-[var(--gutter)] min-[901px]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div>
            <SectionLabel light>Informazioni</SectionLabel>
            <dl className="m-0 grid gap-3.5">
              {infoRows.map(([label, value]) => (
                <div className="border-t border-white/10 pt-4" key={label}>
                  <dt className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">
                    {label}
                  </dt>
                  <dd className="m-0 block font-display text-[clamp(22px,3vw,34px)] font-extrabold italic uppercase leading-none">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <SectionLabel light>Premi</SectionLabel>
            <ul className="m-0 grid list-none gap-3 p-0">
              {event.awards.map((award) => (
                <li
                  className="relative border border-white/10 bg-white/5 py-[18px] pl-12 pr-[18px] text-base before:absolute before:left-5 before:top-[25px] before:size-2.5 before:bg-accent before:content-['']"
                  key={award}
                >
                  {award}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {hasRouteDetails ? (
        <section
          id="tracciati"
          className="bg-tbe-black py-[clamp(56px,8vw,110px)]"
        >
          <div className="mx-auto grid w-full max-w-[var(--maxw)] items-start gap-[clamp(36px,7vw,96px)] px-[var(--gutter)] min-[1001px]:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
            <div>
              <SectionLabel light>Tracciati e quota</SectionLabel>
              <h2 className="mb-[22px] font-display text-[clamp(36px,5vw,76px)] font-black italic uppercase leading-[0.88]">
                Scegli il
                <br />
                <span className="text-accent">percorso.</span>
              </h2>
              <p className="max-w-[42ch] text-[clamp(18px,1.4vw,22px)] leading-[1.5] opacity-80">
                Due tracciati per pedalare con il gruppo giusto e tutti i
                dettagli GPX raccolti nella scheda evento.
              </p>

              {event.registrationFee ? (
                <div className="mt-8 border border-white/10 bg-white/5 p-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
                    {event.registrationFee.label}
                  </span>
                  <strong className="mt-3 block font-display text-[clamp(46px,7vw,84px)] font-black italic uppercase leading-none text-accent">
                    {event.registrationFee.amount}
                  </strong>
                  <ul className="mt-6 grid list-none gap-3 p-0">
                    {event.registrationFee.benefits.map((benefit) => (
                      <li
                        className="relative border-t border-white/10 pt-3 pl-8 text-sm font-semibold uppercase tracking-[0.04em] text-white/78 before:absolute before:left-0 before:top-[18px] before:size-2.5 before:bg-accent before:content-['']"
                        key={benefit}
                      >
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            {event.routes.length > 0 ? (
              <EventRoutesViewer routes={event.routes} />
            ) : null}
          </div>
        </section>
      ) : null}

      <section
        id="pre-iscrizione"
        className="bg-tbe-black py-[clamp(56px,8vw,110px)]"
      >
        <div className="mx-auto grid w-full max-w-[var(--maxw)] items-start gap-[clamp(36px,7vw,96px)] px-[var(--gutter)] min-[901px]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div>
            <SectionLabel light>Pre-iscrizione</SectionLabel>
            <h2 className="mb-[22px] font-display text-[clamp(36px,5vw,76px)] font-black italic uppercase leading-[0.88] tracking-[-0.01em]">
              Lascia i tuoi
              <br />
              <span className="text-accent">dati.</span>
            </h2>
            <p className="max-w-[42ch] text-[clamp(18px,1.4vw,22px)] leading-[1.5] opacity-80">
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
