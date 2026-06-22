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

      </div>
    </header>
  );
}
