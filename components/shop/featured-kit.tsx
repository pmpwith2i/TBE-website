import Image from "next/image";
import { BtnLink } from "@/components/site/buttons";
import { KIT } from "@/constants/shop";

export function FeaturedKit() {
  return (
    <section className="bg-tbe-black p-0 text-white">
      <div className="grid gap-0 min-[801px]:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden bg-white">
          <Image
            src={KIT.image}
            alt={KIT.imageAlt}
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
            className="object-contain"
          />
        </div>

        <div className="flex flex-col justify-center p-[clamp(40px,6vw,80px)]">
          <div className="mb-6 flex flex-wrap gap-2.5">
            {KIT.badges.map((badge, i) => (
              <span
                key={badge}
                className={
                  i === 0
                    ? "bg-accent px-3.5 py-1.5 font-display text-xs font-extrabold italic uppercase tracking-[0.1em]"
                    : "border border-white px-3.5 py-1.5 font-display text-xs font-extrabold italic uppercase tracking-[0.1em]"
                }
              >
                {badge}
              </span>
            ))}
          </div>

          <h2 className="mb-6 font-display text-[clamp(56px,9vw,130px)] font-black italic uppercase leading-[0.82] tracking-[-0.01em]">
            Il Kit
            <br />
            <span className="text-accent">Ufficiale &apos;26</span>
          </h2>

          <p className="mb-8 max-w-[60ch] text-[clamp(18px,1.4vw,22px)] leading-[1.5] opacity-85">
            Maglia e salopette in tessuto leggero e traspirante, perfetti per
            ogni uscita. Un disegno pensato dalla squadra, prodotto in Italia da
            Alpic.
          </p>

          <p className="mb-8 border-t border-white/15 py-6 text-[15px] opacity-75">
            Disponibile nelle taglie XS–XXXL, in versione estiva, gravel e
            invernale. Per prezzi e disponibilità scrivici: te lo prepariamo
            noi.
          </p>

          <BtnLink href="/contatti">Scrivici per il kit</BtnLink>
        </div>
      </div>
    </section>
  );
}
