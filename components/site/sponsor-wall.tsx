import { SPONSORS } from "@/constants/site";

/** The home-page sponsor grid ("Sostenuti da chi crede nel territorio"). */
export function SponsorWall() {
  return (
    <section className="sponsors">
      <div className="container">
        <div className="caption" style={{ textAlign: "center", marginBottom: 32 }}>
          — Sostenuti da chi crede nel territorio —
        </div>
        <div className="sponsor-row">
          {SPONSORS.map((s) => (
            <div className="sponsor" key={s.name}>
              {s.name}
              <small>{s.detail}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
