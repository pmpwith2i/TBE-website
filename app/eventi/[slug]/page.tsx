import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EventRegistrationForm } from "@/components/eventi/event-registration-form";
import { EventMainSponsor } from "@/components/eventi/event-main-sponsor";
import { EventRoutesViewer } from "@/components/eventi/event-routes-viewer";
import { SiteShell } from "@/components/site/site-shell";
import { SectionLabel } from "@/components/site/section-label";
import { ButtonArrow } from "@/components/site/buttons";
import { EventStructuredData } from "@/components/site/structured-data";
import {
  EVENTS,
  getEventFeeSummary,
  getEventRegistrationCtaLabel,
  getEventBySlug,
  hasEventRegistration,
  type EventFee,
  type EventInfoGroup,
  type EventScheduleItem,
} from "@/constants/events";
import { pageSeo, truncate } from "@/lib/seo";

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
    description: truncate(
      `${event.date.label} · ${event.location} — ${event.notes}`
    ),
    path: `/eventi/${event.slug}`,
    keywords: [...event.seoKeywords],
    image: {
      url: event.poster,
      alt: event.posterAlt,
      width: event.posterSize.width,
      height: event.posterSize.height,
    },
  });
}

function formatScheduleItem(item: EventScheduleItem) {
  return [item.time, item.title].filter(Boolean).join(" - ");
}

function EventScheduleList({
  items,
}: {
  items: readonly EventScheduleItem[];
}) {
  return (
    <ol className="m-0 grid list-none gap-3 p-0">
      {items.map((item) => (
        <li
          className="grid gap-4 border border-white/10 bg-white/5 p-5 min-[641px]:grid-cols-[92px_1fr]"
          key={`${item.time}-${item.title}`}
        >
          <time className="font-display text-[clamp(28px,4vw,42px)] font-black italic uppercase leading-none text-accent">
            {item.time ?? "--"}
          </time>
          <div>
            <h3 className="font-display text-2xl font-extrabold italic uppercase leading-none">
              {item.title}
            </h3>
            {item.detail ? (
              <p className="mt-2 text-sm leading-relaxed text-white/68">
                {item.detail}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

function EventFees({ fees }: { fees: readonly EventFee[] }) {
  if (fees.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="mb-4 font-display text-2xl font-black italic uppercase leading-none">
        Quote
      </h3>
      <div className="grid gap-3 min-[701px]:grid-cols-3">
        {fees.map((fee) => (
          <div className="border border-white/10 bg-white/5 p-5" key={fee.label}>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
              {fee.label}
            </span>
            <strong className="mt-3 block font-display text-[clamp(38px,5vw,58px)] font-black italic uppercase leading-none text-accent">
              {fee.amount}
            </strong>
            {fee.detail ? (
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                {fee.detail}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function EventInfoGroups({
  groups,
  awards,
}: {
  groups: readonly EventInfoGroup[];
  awards: readonly string[];
}) {
  return (
    <div className="grid gap-4 min-[801px]:grid-cols-2">
      {groups.map((group) => (
        <section className="border border-white/10 bg-white/5 p-5" key={group.title}>
          <h3 className="font-display text-2xl font-black italic uppercase leading-none">
            {group.title}
          </h3>
          <ul className="mt-5 m-0 grid list-none gap-3 p-0">
            {group.items.map((item) => (
              <li
                className="relative border-t border-white/10 pt-3 pl-7 text-sm font-semibold uppercase tracking-[0.04em] text-white/78 before:absolute before:left-0 before:top-[18px] before:size-2.5 before:bg-accent before:content-['']"
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}

      {awards.length > 0 ? (
        <section className="border border-white/10 bg-white/5 p-5">
          <h3 className="font-display text-2xl font-black italic uppercase leading-none">
            Premi
          </h3>
          <ul className="mt-5 m-0 grid list-none gap-3 p-0">
            {awards.map((award) => (
              <li
                className="relative border-t border-white/10 pt-3 pl-7 text-sm font-semibold uppercase tracking-[0.04em] text-white/78 before:absolute before:left-0 before:top-[18px] before:size-2.5 before:bg-accent before:content-['']"
                key={award}
              >
                {award}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const externalRegistrationUrl = event.preRegistration.externalUrl;
  const registrationCtaLabel = getEventRegistrationCtaLabel(event);
  const registrationHref = externalRegistrationUrl ?? "#pre-iscrizione";
  const registrationIsAvailable = hasEventRegistration(event);
  const feeSummary = getEventFeeSummary(event);
  const scheduleSummary = event.schedule[0]
    ? formatScheduleItem(event.schedule[0])
    : undefined;
  const infoRows: [string, string][] = [
    ["Data", event.date.label],
    ["Luogo", event.location],
    ...(scheduleSummary ? [["Programma", scheduleSummary] as [string, string]] : []),
    ...(feeSummary ? [["Quote", feeSummary] as [string, string]] : []),
    [
      externalRegistrationUrl ? "Iscrizione" : "Pre-iscrizione",
      registrationIsAvailable ? "Disponibile" : "Non disponibile",
    ],
  ];
  const hasDetails =
    event.fees.length > 0 ||
    event.infoGroups.length > 0 ||
    event.awards.length > 0;
  const hasRouteDetails = event.routes.length > 0;
  const routeSection = event.routeSection ?? {
    label: "Tracciati",
    title: "Scopri il",
    accent: "percorso.",
    intro: "I dettagli del tracciato sono raccolti nella scheda evento.",
  };
  const routeCtaLabel = event.routes.some((route) => route.gpxUrl)
    ? "Tracciati GPX"
    : "Tracciato";

  return (
    <SiteShell theme="dark">
      <EventStructuredData event={event} />
      <section className="bg-tbe-black pb-[88px] pt-[180px] text-tbe-paper">
        <div className="mx-auto grid w-full max-w-[var(--maxw)] items-center gap-[clamp(36px,7vw,110px)] px-[var(--gutter)] min-[901px]:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div>
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
              {registrationIsAvailable ? (
                <a
                  href={registrationHref}
                  className="group inline-flex cursor-pointer items-center gap-2.5 border-0 bg-accent px-8 py-4 font-display text-base font-extrabold italic uppercase tracking-[0.1em] text-tbe-white transition-[background,transform] duration-200 [clip-path:polygon(6%_0,100%_0,94%_100%,0_100%)] hover:translate-x-1 hover:bg-tbe-amber"
                  target={externalRegistrationUrl ? "_blank" : undefined}
                  rel={externalRegistrationUrl ? "noopener noreferrer" : undefined}
                >
                  {registrationCtaLabel}
                  <ButtonArrow />
                </a>
              ) : null}
              {event.routes.length > 0 ? (
                <a
                  href="#tracciati"
                  className="inline-flex items-center border-b-2 border-accent bg-transparent px-0 py-2 font-display text-base font-extrabold italic uppercase tracking-[0.1em] text-current transition-colors hover:text-accent"
                >
                  {routeCtaLabel}
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

      <section
        id="programma"
        className="bg-tbe-ink py-[clamp(56px,8vw,104px)]"
      >
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
            <SectionLabel light>Programma</SectionLabel>
            <EventScheduleList items={event.schedule} />
          </div>
        </div>
      </section>

      {hasDetails ? (
        <section className="bg-tbe-black py-[clamp(56px,8vw,110px)]">
          <div className="mx-auto grid w-full max-w-[var(--maxw)] items-start gap-[clamp(36px,7vw,96px)] px-[var(--gutter)] min-[1001px]:grid-cols-[minmax(0,0.74fr)_minmax(0,1.26fr)]">
            <div>
              <SectionLabel light>Dettagli</SectionLabel>
              <h2 className="mb-[22px] font-display text-[clamp(36px,5vw,76px)] font-black italic uppercase leading-[0.88]">
                Tutto per
                <br />
                <span className="text-accent">partecipare.</span>
              </h2>
              <p className="max-w-[42ch] text-[clamp(18px,1.4vw,22px)] leading-[1.5] opacity-80">
                Controlla quote, logistica, requisiti e premi prima di
                completare l&apos;iscrizione.
              </p>
            </div>

            <div className="grid gap-8">
              <EventFees fees={event.fees} />
              <EventInfoGroups groups={event.infoGroups} awards={event.awards} />
            </div>
          </div>
        </section>
      ) : null}

      {hasRouteDetails ? (
        <section
          id="tracciati"
          className="bg-tbe-ink py-[clamp(56px,8vw,110px)]"
        >
          <div className="mx-auto grid w-full max-w-[var(--maxw)] items-start gap-[clamp(36px,7vw,96px)] px-[var(--gutter)] min-[1001px]:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
            <div>
              <SectionLabel light>{routeSection.label}</SectionLabel>
              <h2 className="mb-[22px] font-display text-[clamp(36px,5vw,76px)] font-black italic uppercase leading-[0.88]">
                {routeSection.title}
                <br />
                <span className="text-accent">{routeSection.accent}</span>
              </h2>
              <p className="max-w-[42ch] text-[clamp(18px,1.4vw,22px)] leading-[1.5] opacity-80">
                {routeSection.intro}
              </p>
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
            <SectionLabel light>
              {externalRegistrationUrl ? "Iscrizione" : "Pre-iscrizione"}
            </SectionLabel>
            <h2 className="mb-[22px] font-display text-[clamp(36px,5vw,76px)] font-black italic uppercase leading-[0.88] tracking-[-0.01em]">
              {externalRegistrationUrl ? (
                <>
                  Completa la
                  <br />
                  <span className="text-accent">iscrizione.</span>
                </>
              ) : (
                <>
                  Lascia i tuoi
                  <br />
                  <span className="text-accent">dati.</span>
                </>
              )}
            </h2>
            <p className="max-w-[42ch] text-[clamp(18px,1.4vw,22px)] leading-[1.5] opacity-80">
              {externalRegistrationUrl
                ? "La cronoscalata usa una piattaforma dedicata per raccogliere le iscrizioni ufficiali."
                : "Compila il modulo per bloccare la tua pre-iscrizione e ricevere conferma con i dettagli dell'evento."}
            </p>
          </div>

          <EventRegistrationForm event={event} />
        </div>
      </section>
    </SiteShell>
  );
}
