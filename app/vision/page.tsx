import Image from "next/image";
import { pageSeo } from "@/lib/seo";
import { SiteShell } from "@/components/site/site-shell";
import { Reveal } from "@/components/site/reveal";
import { SectionLabel, Eyebrow } from "@/components/site/section-label";
import { BtnLink } from "@/components/site/buttons";

export const metadata = pageSeo({
  title: "Vision",
  description:
    "La vision di Teramo Bike Experience: una squadra di ciclismo aperta a tutti, dove si pedala in gruppo al passo di ognuno. Chi vuole gareggiare può farlo, senza rinunciare al piacere di pedalare in compagnia.",
  path: "/vision",
  keywords: [
    "vision squadra ciclismo",
    "ciclismo aperto a tutti",
    "comunità ciclistica Teramo",
    "valori squadra bici",
  ],
});

const POINTS = [
  {
    kicker: "01 / Insieme",
    title: "Si pedala in gruppo.",
    text: "Le uscite di gruppo sono il cuore della squadra. Si va insieme, a un ritmo adatto a tutti: nessuno parte per primo, nessuno resta indietro.",
  },
  {
    kicker: "02 / Aperti a tutti",
    title: "Nessun livello richiesto.",
    text: "Non serve essere allenati o avere la bici giusta. Chi inizia da zero è il benvenuto come chi pedala da una vita.",
  },
  {
    kicker: "03 / Chi vuole, gareggia",
    title: "C'è spazio anche per quello.",
    text: "Chi ha voglia di mettersi alla prova corre una gara del calendario FCI o CSI. È parte della squadra come le uscite in tranquillità: nessuna delle due esclude l'altra.",
  },
];

export default function VisionPage() {
  return (
    <SiteShell theme="dark">
      <section className="relative overflow-hidden bg-tbe-black px-[var(--gutter)] pb-20 pt-[200px] text-tbe-paper">
        <div className="absolute right-0 top-0 h-full w-[60%] opacity-20 [mask-image:linear-gradient(to_left,black,transparent)] [-webkit-mask-image:linear-gradient(to_left,black,transparent)]">
          <Image
            src="/assets/sunset-rider.jpg"
            alt=""
            fill
            sizes="60vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="relative mx-auto w-full max-w-[var(--maxw)]">
          <Eyebrow num="/00" light className="mb-8">
            La nostra Vision
          </Eyebrow>
          <h1 className="max-w-[13ch] font-display text-[clamp(60px,12vw,200px)] font-black italic uppercase leading-[0.85] tracking-[-0.01em]">
            Prima di tutto,
            <br />
            <span className="text-accent">insieme.</span>
          </h1>
          <p className="mt-10 max-w-[60ch] text-[clamp(18px,1.4vw,22px)] leading-[1.5] opacity-80">
            Teramo Bike Experience è una squadra di ciclismo nata da un gruppo
            di amici, per il piacere di pedalare insieme. Si esce in gruppo, a
            un passo adatto a tutti; chi vuole gareggiare lo fa, e si pedala in
            tranquillità senza che le due cose si escludano.
          </p>
        </div>
      </section>

      <section className="bg-tbe-ink py-[var(--section)]">
        <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--gutter)]">
          <div className="grid gap-[clamp(40px,8vw,120px)] min-[901px]:grid-cols-2">
            <Reveal>
              <SectionLabel light>/01 — Cosa conta per noi</SectionLabel>
              <h2 className="font-display text-[clamp(36px,5vw,76px)] font-black italic uppercase leading-[0.88] tracking-[-0.01em]">
                Tre cose
                <br />
                <span className="text-accent">semplici.</span>
              </h2>
            </Reveal>
            <div className="flex flex-col gap-12">
              {POINTS.map((point, i) => (
                <Reveal
                  key={point.kicker}
                  delay={i * 80}
                  className="border-t-2 border-accent pt-5"
                >
                  <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                    {point.kicker}
                  </div>
                  <h3 className="mb-3 font-display text-[clamp(28px,3.4vw,48px)] font-black italic uppercase leading-[0.88] tracking-[-0.01em]">
                    {point.title}
                  </h3>
                  <p className="max-w-[56ch] opacity-80">{point.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-tbe-black py-[var(--section)]">
        <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--gutter)]">
          <SectionLabel light>/02 — Come siamo nati</SectionLabel>
          <h2 className="mb-10 max-w-[18ch] font-display text-[clamp(36px,5vw,76px)] font-black italic uppercase leading-[0.88] tracking-[-0.01em]">
            Da un gruppo di amici
            <br />
            <span className="text-accent">a una squadra.</span>
          </h2>
          <p className="mb-5 max-w-[62ch] text-[clamp(18px,1.4vw,22px)] leading-[1.5] opacity-80">
            Siamo partiti come un gruppo di amici che si trovava per pedalare
            insieme, senza niente di organizzato. Col tempo siamo cresciuti, ci
            siamo dati una maglia e siamo diventati una ASD affiliata FCI e
            CSI.
          </p>
          <p className="max-w-[62ch] text-[clamp(18px,1.4vw,22px)] leading-[1.5] opacity-80">
            È cambiata la struttura, non lo spirito: usciamo in bici insieme,
            come il primo giorno.
          </p>
        </div>
      </section>

      <section className="bg-accent px-[var(--gutter)] py-20 text-center text-white">
        <div className="mx-auto max-w-[900px]">
          <h2 className="mb-5 font-display text-[clamp(36px,5vw,76px)] font-black italic uppercase leading-[0.88] tracking-[-0.01em]">
            Ti va di pedalare
            <br />
            con noi?
          </h2>
          <p className="mx-auto mb-8 max-w-[50ch] text-[clamp(18px,1.4vw,22px)] leading-[1.5]">
            Scrivici: ci fa piacere conoscerti e dirti dove ci troviamo per la
            prossima uscita.
          </p>
          <BtnLink href="/contatti" variant="light">
            Unisciti a noi
          </BtnLink>
        </div>
      </section>
    </SiteShell>
  );
}
