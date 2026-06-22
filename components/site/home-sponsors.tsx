import { MainSponsor } from "@/components/site/main-sponsor";
import { SponsorMarquee } from "@/components/site/sponsor-marquee";

/**
 * Home-page sponsors section: the main sponsor up front, then a scrolling
 * band with every partner. The band sits outside the container so it runs
 * edge to edge.
 */
export function HomeSponsors() {
  return (
    <section className="border-y border-black/10 bg-tbe-bone py-14">
      <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--gutter)]">
        <div className="mb-10 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-tbe-smoke">
          — Sostenuti da chi crede nel territorio —
        </div>
        <MainSponsor />
      </div>
      <SponsorMarquee />
    </section>
  );
}
