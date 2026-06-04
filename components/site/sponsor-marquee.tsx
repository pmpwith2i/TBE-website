import { ALL_SPONSORS } from "@/constants/sponsors";

/**
 * A continuously scrolling band of every sponsor — the logo-wall marquee
 * you see on startup sites. The track holds two identical runs so the CSS
 * `translateX(-50%)` loop is seamless; the duplicate is hidden from screen
 * readers so the names are announced only once.
 */
function Run({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="sponsor-marquee__run" aria-hidden={hidden || undefined}>
      {ALL_SPONSORS.map((s, i) => (
        <span className="sponsor-marquee__item" key={i}>
          <strong>{s.name}</strong>
          <small>{s.detail}</small>
        </span>
      ))}
    </div>
  );
}

export function SponsorMarquee() {
  return (
    <div className="sponsor-marquee">
      <div className="sponsor-marquee__track">
        <Run />
        <Run hidden />
      </div>
    </div>
  );
}
