import Image from "next/image";
import { pageSeo } from "@/lib/seo";
import { SiteShell } from "@/components/site/site-shell";
import { Eyebrow, SectionLabel } from "@/components/site/section-label";
import { RIDERS, STAFF } from "@/constants/team";

export const metadata = pageSeo({
  title: "Team",
  description:
    "Il team di Teramo Bike Experience: ciclisti di tutte le età e livelli, uniti dalla voglia di pedalare insieme sulle strade del teramano.",
  path: "/team",
  keywords: [
    "ciclisti Teramo",
    "squadra ciclistica Teramo",
    "membri squadra bici Teramo",
    "staff ciclismo Teramo",
  ],
});

export default function TeamPage() {
  return (
    <SiteShell theme="dark">
      <section className="bg-tbe-black px-[var(--gutter)] pb-[60px] pt-[180px] text-tbe-paper">
        <div className="mx-auto w-full max-w-[var(--maxw)]">
          <Eyebrow num="/02" light className="mb-8">
            La squadra · Stagione 2026
          </Eyebrow>
          <div className="grid items-end gap-[60px] min-[901px]:grid-cols-[1.5fr_1fr]">
            <h1 className="font-display text-[clamp(60px,11vw,180px)] font-black italic uppercase leading-[0.85] tracking-[-0.01em]">
              Stessa
              <br />
              <span className="text-accent">strada.</span>
              <br />
              Stessa <em>maglia</em>.
            </h1>
            <p className="max-w-[60ch] text-[clamp(18px,1.4vw,22px)] leading-[1.5] opacity-80">
              Dai veterani che hanno cominciato negli anni &apos;90 ai
              venti­enni di oggi. Tutti teramani, tutti diversi, tutti con la
              stessa voglia di pedalare insieme.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-tbe-black pb-10">
        <div className="grid gap-1 bg-tbe-black min-[701px]:grid-cols-2 min-[1001px]:grid-cols-4">
          {RIDERS.map((rider) => (
            <article
              className="group relative aspect-[3/4] cursor-pointer overflow-hidden bg-tbe-ink"
              key={rider.n}
            >
              <Image
                src={rider.img}
                alt={`${rider.first} ${rider.last}`}
                fill
                sizes="(max-width: 700px) 50vw, (max-width: 1000px) 33vw, 25vw"
                className="object-cover brightness-[0.92] contrast-[1.05] grayscale-[0.35] transition-[filter,transform] duration-500 group-hover:scale-[1.04] group-hover:brightness-100 group-hover:contrast-[1.1] group-hover:grayscale-0"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(0,0,0,0.85)_100%)]" />
              <div className="absolute right-3.5 top-3.5 font-display text-[32px] font-black italic leading-none text-accent drop-shadow">
                #{String(rider.n).padStart(2, "0")}
              </div>
              <div className="absolute bottom-[18px] left-[18px] right-[18px] text-white">
                <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.2em] opacity-85">
                  {rider.town}
                </div>
                <div className="font-display text-2xl font-extrabold italic uppercase leading-none tracking-[0.01em]">
                  {rider.first} <span className="text-accent">{rider.last}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-tbe-ink py-[var(--section)]">
        <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--gutter)]">
          <SectionLabel light>/03 — Staff</SectionLabel>
          <h2 className="mb-14 font-display text-[clamp(36px,5vw,76px)] font-black italic uppercase leading-[0.88] tracking-[-0.01em]">
            Chi ci dà
            <br />
            <span className="text-accent">una mano.</span>
          </h2>

          <div className="grid gap-6 min-[901px]:grid-cols-3">
            {STAFF.map((member) => (
              <article
                key={member.name}
                className="border-t-[3px] border-accent bg-tbe-black p-8"
              >
                <div className="relative -mx-8 -mt-8 mb-6 aspect-square overflow-hidden">
                  <Image
                    src={member.img}
                    alt={member.role}
                    fill
                    sizes="(max-width: 900px) 100vw, 33vw"
                    className="object-cover contrast-[1.1] grayscale-[0.4]"
                  />
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  {member.role}
                </div>
                <h3 className="mb-4 mt-2 font-display text-[clamp(28px,3.4vw,48px)] font-black italic uppercase leading-[0.88] tracking-[-0.01em]">
                  {member.name}
                </h3>
                <p className="text-[15px] opacity-75">{member.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
