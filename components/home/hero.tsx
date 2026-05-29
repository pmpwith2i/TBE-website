import Image from "next/image";
import { HOME_HERO } from "@/constants/home";
import { BtnLink } from "@/components/site/buttons";

const GLASS_BTN: React.CSSProperties = {
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  color: "white",
  border: "1px solid rgba(255,255,255,0.3)",
};

export function HomeHero() {
  return (
    <header className="hero">
      <div className="hero-bg">
        <Image
          src={HOME_HERO.bgImage}
          alt={HOME_HERO.bgAlt}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="hero-vignette" />

      <div className="hero-meta">
        <span>{HOME_HERO.metaTop}</span>
        <span className="big">{HOME_HERO.metaBig}</span>
      </div>

      <div className="hero-inner">
        <div
          className="eyebrow"
          style={{ color: "rgba(255,255,255,0.7)", marginBottom: 28 }}
        >
          <span className="num">{HOME_HERO.eyebrowNum}</span>{" "}
          {HOME_HERO.eyebrowText}
        </div>

        <h1>
          {HOME_HERO.title.map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line.variant === "accent" ? (
                <span className="accent">{line.text}</span>
              ) : line.variant === "outline" ? (
                <span className="outline">{line.text}</span>
              ) : (
                line.text
              )}
            </span>
          ))}
        </h1>

        <div className="hero-sub">
          <p>{HOME_HERO.paragraph}</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <BtnLink href={HOME_HERO.ctas[0].href} className="btn btn-primary">
              {HOME_HERO.ctas[0].label}
            </BtnLink>
            <BtnLink
              href={HOME_HERO.ctas[1].href}
              className="btn"
              arrow={false}
              style={GLASS_BTN}
            >
              {HOME_HERO.ctas[1].label}
            </BtnLink>
          </div>
        </div>
      </div>

      <div className="scroll-cue">
        <span>{HOME_HERO.scrollLabel}</span>
        <span className="line" />
      </div>
    </header>
  );
}
