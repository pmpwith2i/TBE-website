import Image from "next/image";
import { SiteShell } from "@/components/site/site-shell";
import { Reveal } from "@/components/site/reveal";
import { SectionLabel } from "@/components/site/section-label";
import { BtnLink } from "@/components/site/buttons";
import { HomeSponsors } from "@/components/site/home-sponsors";
import { HomeHero } from "@/components/home/hero";
import { pageSeo, DEFAULT_DESCRIPTION } from "@/lib/seo";

export const metadata = pageSeo({
  description: DEFAULT_DESCRIPTION,
  path: "/",
  keywords: [
    "squadra bici Teramo",
    "ciclismo amatoriale Teramo",
    "uscite in bici di gruppo",
    "pedalare in gruppo Teramo",
    "associazione ciclistica Teramo",
  ],
});


export default function HomePage() {
  return (
    <SiteShell theme="light" navVariant="transparent">
      <HomeHero />

      <section className="py-[var(--section)]">
        <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--gutter)]">
          <div className="grid items-end gap-[clamp(24px,4vw,80px)] min-[901px]:grid-cols-2">
            <Reveal>
              <SectionLabel>/02 — Chi siamo</SectionLabel>
              <h2 className="font-display text-[clamp(36px,5vw,76px)] font-black italic uppercase leading-[0.88] tracking-[-0.01em]">
                Una squadra
                <br />
                di ciclismo, nata
                <br />a <em className="text-accent">Teramo</em>.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mb-6 max-w-[60ch] text-[clamp(18px,1.4vw,22px)] leading-[1.5]">
                Siamo una squadra di ciclismo nata a Teramo da un gruppo di
                amici. Le uscite di gruppo sono il cuore della squadra: ci
                troviamo, pedaliamo insieme e ci divertiamo.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-tbe-black py-[clamp(80px,10vw,140px)] text-tbe-paper">
        <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--gutter)]">
          <div className="grid items-stretch gap-0 min-[901px]:grid-cols-2">
            <Reveal className="min-[901px]:pr-[clamp(0px,4vw,60px)]">
              <SectionLabel light>/03 — Le nostre uscite</SectionLabel>
              <h2 className="mb-8 font-display text-[clamp(56px,11vw,180px)] font-black italic uppercase leading-[0.9] tracking-[-0.01em]">
                Ci vediamo
                <br />
                <span className="text-accent">la domenica.</span>
              </h2>
              <p className="mb-8 max-w-[60ch] text-[clamp(18px,1.4vw,22px)] leading-[1.5] opacity-85">
                Ci troviamo ogni settimana per un&apos;uscita insieme, aperta a
                chiunque abbia una bici e voglia di pedalare. Si va al passo del
                gruppo, nessuno resta indietro. Dal mare alle montagne del
                teramano, e ritorno con calma.
              </p>
              <BtnLink href="/eventi">Scopri le uscite</BtnLink>
            </Reveal>

            <Reveal
              className="group relative aspect-[3/4] min-h-[600px] overflow-hidden bg-tbe-graphite"
              delay={120}
            >
              <Image
                src="/assets/sunset-rider.jpg"
                alt="Un'uscita della squadra al tramonto"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,var(--tbe-paper)_0%,var(--tbe-bone)_100%)] py-[var(--section)]">
        <div className="relative mx-auto w-full max-w-[var(--maxw)] px-[var(--gutter)]">
          <div className="grid items-center gap-[clamp(24px,4vw,80px)] min-[901px]:grid-cols-2">
            <Reveal className="relative aspect-[3/4] max-h-[800px]">
              <Image
                src="/assets/maglia-front.jpg"
                alt="Kit ufficiale TBE 2026 — vista frontale"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="object-contain"
              />
              <div className="absolute left-0 top-0 font-mono text-[11px] uppercase tracking-[0.2em] text-tbe-smoke">
                KIT 2026
              </div>
            </Reveal>

            <Reveal delay={100}>
              <SectionLabel>/04 — Lo shop</SectionLabel>
              <h2 className="mb-6 font-display text-[clamp(56px,11vw,180px)] font-black italic uppercase leading-[0.88] tracking-[-0.01em]">
                La maglia
                <br />
                <span className="text-accent">della squadra.</span>
              </h2>
              <p className="mb-8 max-w-[60ch] text-[clamp(18px,1.4vw,22px)] leading-[1.5]">
                Il kit ufficiale della stagione 2026, prodotto in Italia da
                Alpic. Un disegno pensato da noi.
              </p>
              <BtnLink href="/shop">Vai allo shop</BtnLink>
            </Reveal>
          </div>
        </div>
      </section>

      <HomeSponsors />

      <section className="relative overflow-hidden bg-tbe-red px-[var(--gutter)] py-20 text-center text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(-75deg,transparent_0_80px,rgba(255,255,255,0.04)_80px_82px)]"
        />
        <div className="relative mx-auto max-w-[900px]">
          <h2 className="mb-5 font-display text-[clamp(36px,5vw,76px)] font-black italic uppercase leading-[0.88] tracking-[-0.01em]">
            Hai una bici?
            <br />
            <span className="text-transparent [-webkit-text-stroke:2px_white]">
              Pedala con noi.
            </span>
          </h2>
          <p className="mx-auto mb-8 max-w-[56ch] text-[clamp(18px,1.4vw,22px)] leading-[1.5]">
            Siamo aperti a ciclisti di tutte le età e livelli. Quello che conta è
            la voglia di pedalare insieme, una domenica mattina.
          </p>
          <BtnLink href="/contatti">
            Unisciti a noi
          </BtnLink>
        </div>
      </section>
    </SiteShell>
  );
}
