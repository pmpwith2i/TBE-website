import { MainSponsor } from "@/components/site/main-sponsor";
import { SponsorMarquee } from "@/components/site/sponsor-marquee";

/**
 * Home-page sponsors section: the main sponsor up front, then a scrolling
 * band with every partner. The band sits outside the container so it runs
 * edge to edge.
 */
export function HomeSponsors() {
  return (
    <section className="sponsors">
      <div className="container">
        <div
          className="caption"
          style={{ textAlign: "center", marginBottom: 40 }}
        >
          — Sostenuti da chi crede nel territorio —
        </div>
        <MainSponsor />
      </div>
      <SponsorMarquee />
    </section>
  );
}
