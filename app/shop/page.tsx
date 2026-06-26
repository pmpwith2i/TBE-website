import { SiteShell } from "@/components/site/site-shell";
import { pageSeo } from "@/lib/seo";
import { Eyebrow } from "@/components/site/section-label";
import { BtnLink } from "@/components/site/buttons";
import { FeaturedKit } from "@/components/shop/featured-kit";

export const metadata = pageSeo({
  title: "Shop",
  description:
    "Il kit ufficiale di Teramo Bike Experience, prodotto in Italia: maglia e salopette della squadra. Scrivici per prezzi, taglie e disponibilità.",
  path: "/shop",
  keywords: [
    "maglia ciclismo Teramo",
    "kit ciclismo Teramo",
    "abbigliamento ciclismo Made in Italy",
    "completo ciclismo squadra",
  ],
});

export default function ShopPage() {
  return (
    <SiteShell theme="dark">
      <section className="relative overflow-hidden bg-tbe-black px-[var(--gutter)] pb-20 pt-[180px] text-tbe-paper">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -right-10 font-display text-[clamp(180px,30vw,460px)] font-black italic leading-[0.7] tracking-[-0.02em] text-tbe-red opacity-10"
        >
          SHOP
        </div>
        <div className="relative mx-auto w-full max-w-[var(--maxw)]">
          <Eyebrow num="/05" light className="mb-8">
            Kit Ufficiale
          </Eyebrow>
          <div className="grid items-end gap-[60px] min-[901px]:grid-cols-[1.5fr_1fr]">
            <h1 className="font-display text-[clamp(40px,6.5vw,96px)] font-black italic uppercase leading-[0.9] tracking-[-0.01em]">
              Acquista il nostro{" "}
              <span className="text-accent">Kit</span> ufficiale.
            </h1>
            <p className="max-w-[60ch] text-[clamp(18px,1.4vw,22px)] leading-[1.5] opacity-85">
              Il kit della stagione 2026, prodotto in Italia. Per ordinare,
              scrivici un messaggio: ti diciamo taglie, disponibilità e modi di
              ritiro o spedizione.
            </p>
          </div>
        </div>
      </section>

      <FeaturedKit />

      <section className="bg-tbe-ink px-[var(--gutter)] py-[var(--section)] text-center">
        <div className="mx-auto max-w-[760px]">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            Come si ordina
          </div>
          <h2 className="mb-5 font-display text-[clamp(36px,5vw,76px)] font-black italic uppercase leading-[0.88] tracking-[-0.01em]">
            Ti interessa? <span className="text-accent">Scrivici.</span>
          </h2>
          <p className="mx-auto mb-8 max-w-[54ch] text-[clamp(18px,1.4vw,22px)] leading-[1.5] opacity-85">
            Per ora gli acquisti si gestiscono direttamente con noi. Mandaci un
            messaggio con quello che ti serve e ti rispondiamo il prima
            possibile.
          </p>
          <BtnLink href="/contatti">Contattaci</BtnLink>
        </div>
      </section>
    </SiteShell>
  );
}
