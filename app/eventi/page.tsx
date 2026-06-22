import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { pageSeo } from "@/lib/seo";
import { Eyebrow, SectionLabel } from "@/components/site/section-label";
import { BtnLink, ButtonArrow } from "@/components/site/buttons";
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
      <section className="bg-tbe-black px-[var(--gutter)] pb-20 pt-[180px] text-tbe-paper">
        <div className="mx-auto w-full max-w-[var(--maxw)]">
          <Eyebrow num="/04" light className="mb-7">
            Eventi
          </Eyebrow>
          <h1 className="font-display text-[clamp(56px,11vw,180px)] font-black italic uppercase leading-[0.85] tracking-[-0.01em]">
            Gare e
            <br />
            <span className="text-accent">pedalate.</span>
          </h1>
        </div>
      </section>

      <section className="bg-tbe-black pb-[var(--section)]">
        <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--gutter)]">
          <SectionLabel light>In evidenza</SectionLabel>
          <Link
            href={`/eventi/${FEATURED_EVENT.slug}`}
            className="group relative mt-8 block overflow-hidden bg-tbe-red-deep text-white transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-[linear-gradient(115deg,var(--tbe-red-deep)_0%,rgba(74,4,16,0.78)_45%,rgba(74,4,16,0.4)_100%)]" />
            <div className="relative grid items-center gap-[clamp(32px,5vw,72px)] p-[clamp(40px,6vw,80px)] min-[801px]:grid-cols-[minmax(0,1fr)_minmax(240px,380px)]">
              <div>
                <span className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 font-display text-xs font-black italic uppercase tracking-[0.15em] text-tbe-red">
                  {FEATURED_EVENT.preRegistration.available ? (
                    <span className="size-2 rounded-full bg-tbe-red [animation:pulse_1.6s_ease-in-out_infinite] motion-reduce:animate-none" aria-hidden />
                  ) : null}
                  {FEATURED_EVENT.preRegistration.available
                    ? "Pre-iscrizioni aperte"
                    : "In preparazione"}
                </span>
                <h2 className="mb-5 mt-7 font-display text-[clamp(48px,8vw,120px)] font-black italic uppercase leading-[0.88] tracking-[-0.01em]">
                  {FEATURED_EVENT.title}
                </h2>
                <p className="mb-7 max-w-[60ch] text-[clamp(18px,1.4vw,22px)] leading-[1.5] opacity-85">
                  {FEATURED_EVENT.notes}
                </p>
                <div className="mb-7 grid max-w-[640px] gap-3">
                  {[
                    ["Data", FEATURED_EVENT.date.label],
                    ["Tipo", FEATURED_EVENT.typeLabel],
                    ["Premi", `${FEATURED_EVENT.awards.length} voci`],
                  ].map(([label, value]) => (
                    <div className="bg-tbe-black/40 px-5 py-[18px]" key={label}>
                      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">
                        {label}
                      </span>
                      <strong className="block font-display text-[clamp(22px,3vw,34px)] font-extrabold italic uppercase leading-none">
                        {value}
                      </strong>
                    </div>
                  ))}
                </div>
                <span className="inline-flex items-center gap-2.5 bg-accent px-8 py-4 font-display text-base font-extrabold italic uppercase tracking-[0.1em] text-tbe-white transition-[background,transform] duration-200 [clip-path:polygon(6%_0,100%_0,94%_100%,0_100%)] group-hover:translate-x-1 group-hover:bg-tbe-amber">
                  Vai all&apos;evento
                  <ButtonArrow />
                </span>
              </div>

              <figure className="m-0 w-[min(100%,380px)] justify-self-start min-[801px]:justify-self-end">
                <Image
                  src={FEATURED_EVENT.poster}
                  alt={FEATURED_EVENT.posterAlt}
                  width={FEATURED_EVENT.posterSize.width}
                  height={FEATURED_EVENT.posterSize.height}
                  sizes="(max-width: 800px) 82vw, 360px"
                  className="h-auto w-full object-contain"
                  priority
                />
              </figure>
            </div>
          </Link>
        </div>
      </section>

      <section className="bg-tbe-ink py-[clamp(60px,8vw,100px)]">
        <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--gutter)]">
          <SectionLabel light>Calendario</SectionLabel>
          <div>
            {EVENTS.map((event) => (
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
                </div>
                <div className="font-mono text-xs uppercase tracking-[0.1em] opacity-70 max-[900px]:col-start-2">
                  {event.location}
                </div>
                <div className="flex items-center justify-end gap-2 text-right font-display text-[13px] font-extrabold italic uppercase tracking-[0.1em] text-accent transition-colors group-hover:text-white max-[900px]:col-start-2 max-[900px]:justify-start">
                  {event.preRegistration.available ? "Pre-iscriviti" : "Dettagli"}
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
