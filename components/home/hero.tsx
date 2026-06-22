import Image from "next/image";
import { BtnLink } from "@/components/site/buttons";
import { Eyebrow } from "@/components/site/section-label";

export function HomeHero() {
  return (
    <header className="relative flex min-h-screen items-end overflow-hidden bg-tbe-black text-tbe-paper">
      <div className="absolute inset-0">
        <Image
          src="/assets/sunset-rider.jpg"
          alt="Ciclista TBE al tramonto sulle colline di Teramo"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.5)_0%,rgba(10,10,10,0)_30%,rgba(10,10,10,0)_50%,rgba(10,10,10,0.85)_100%),radial-gradient(ellipse_at_80%_50%,rgba(200,16,46,0.18),transparent_60%)]" />

      <div className="absolute right-[var(--gutter)] top-[24%] z-10 hidden text-right font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 min-[801px]:block">
        <span>Stagione 2026</span>
        <span className="mt-1 block font-display text-[28px] font-black italic tracking-[0.02em] text-tbe-paper">
          42°39&apos;N 13°42&apos;E
        </span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[var(--maxw)] px-[var(--gutter)] pb-[clamp(40px,8vw,96px)]">
        <Eyebrow light num="/01" className="mb-7">
          Teramo · Italia
        </Eyebrow>

        <h1 className="mb-6 font-display text-[clamp(56px,13vw,220px)] font-black italic uppercase leading-[0.85] tracking-[-0.01em]">
          Una squadra
          <br />
          <span className="text-accent">di amici,</span>
          <br />
          <span className="text-transparent [-webkit-text-stroke:2px_var(--tbe-paper)]">
            a Teramo.
          </span>
        </h1>

        <div className="mt-8 grid items-end gap-10 min-[801px]:grid-cols-2">
          <p className="max-w-[46ch] text-[17px] leading-[1.55] opacity-85">
            Una squadra di ciclismo nata a Teramo, ai piedi del Gran Sasso. Un
            gruppo di amici uniti dalla passione per la bici: usciamo insieme
            ogni settimana e ogni tanto partecipiamo a qualche gara. Dal mare
            alla montagna in un&apos;ora di pedalata.
          </p>
          <div className="flex flex-wrap gap-4">
            <BtnLink href="/vision">Scopri la nostra Vision</BtnLink>
            <BtnLink href="/team" variant="glass" arrow={false}>
              Conosci il team
            </BtnLink>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-[var(--gutter)] z-20 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
        <span>Scroll</span>
        <span className="relative inline-block h-px w-10 overflow-hidden bg-accent after:absolute after:inset-0 after:bg-white/80 after:[animation:scroll-pulse_2.4s_ease-in-out_infinite] after:content-[''] motion-reduce:after:animate-none" />
      </div>
    </header>
  );
}
