import Image from "next/image";
import { SiteShell } from "@/components/site/site-shell";
import { Marquee } from "@/components/site/marquee";
import { Reveal } from "@/components/site/reveal";
import { SectionLabel } from "@/components/site/section-label";
import { DisplayTitle } from "@/components/site/display-title";
import { BtnLink } from "@/components/site/buttons";
import { SponsorWall } from "@/components/site/sponsor-wall";
import { HomeHero } from "@/components/home/hero";
import { AgendaCard } from "@/components/home/agenda-card";
import {
  HOME_MARQUEE,
  HOME_INTRO,
  HOME_FEATURED,
  HOME_AGENDA,
  HOME_KIT,
  HOME_CTA,
} from "@/constants/home";

export default function HomePage() {
  return (
    <SiteShell theme="light" navVariant="transparent" invertLogo={false}>
      <HomeHero />
      <Marquee items={HOME_MARQUEE} />

      {/* INTRO / VISION TEASER */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: "end" }}>
            <Reveal>
              <SectionLabel>{HOME_INTRO.label}</SectionLabel>
              <h2 className="display display-l">
                Siamo una squadra
                <br />
                di amici nata
                <br />
                a <em style={{ color: "var(--accent)" }}>Teramo</em>.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="lede" style={{ marginBottom: 24 }}>
                {HOME_INTRO.leadBefore}
                <strong>{HOME_INTRO.leadStrong}</strong>
                {HOME_INTRO.leadAfter}
              </p>
              <BtnLink
                href={HOME_INTRO.link.href}
                className="btn-ghost italic uppercase"
                arrow={false}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                }}
              >
                {HOME_INTRO.link.label}
              </BtnLink>
            </Reveal>
          </div>

          <div className="grid-4" style={{ marginTop: 96 }}>
            {HOME_INTRO.stats.map((stat, i) => (
              <Reveal as="div" className="stat" key={stat.label} delay={i * 80}>
                <div className="num">{stat.num}</div>
                <div className="label">{stat.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED — CRONOSCALATA */}
      <section
        className="section"
        style={{
          background: "var(--tbe-black)",
          color: "var(--tbe-paper)",
          paddingBlock: "clamp(80px, 10vw, 140px)",
        }}
      >
        <div className="container">
          <div className="grid-2" style={{ alignItems: "stretch", gap: 0 }}>
            <Reveal style={{ paddingRight: "clamp(0px, 4vw, 60px)" }}>
              <SectionLabel light>{HOME_FEATURED.label}</SectionLabel>
              <div
                className="caption"
                style={{ color: "var(--accent)", marginBottom: 14 }}
              >
                {HOME_FEATURED.date}
              </div>
              <DisplayTitle
                lines={HOME_FEATURED.titleLines}
                className="display display-hero"
                style={{ lineHeight: 0.82, marginBottom: 32 }}
              />
              <p className="lede" style={{ opacity: 0.85, marginBottom: 32 }}>
                {HOME_FEATURED.lead}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 32,
                  padding: "24px 0",
                  borderBlock: "1px solid rgba(255,255,255,0.15)",
                  marginBottom: 32,
                  flexWrap: "wrap",
                }}
              >
                {HOME_FEATURED.stats.map((s) => (
                  <div key={s.label}>
                    <div
                      className="caption"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {s.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontStyle: "italic",
                        fontWeight: 900,
                        fontSize: 32,
                        color: "var(--accent)",
                      }}
                    >
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
              <BtnLink href={HOME_FEATURED.cta.href} className="btn btn-primary">
                {HOME_FEATURED.cta.label}
              </BtnLink>
            </Reveal>

            <Reveal
              className="media"
              delay={120}
              style={{ aspectRatio: "3 / 4", minHeight: 600 }}
            >
              <span className="tag">{HOME_FEATURED.tag}</span>
              <Image
                src={HOME_FEATURED.image}
                alt={HOME_FEATURED.imageAlt}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* EDITORIAL — AGENDA CARDS */}
      <section className="section">
        <div className="container">
          <SectionLabel>{HOME_AGENDA.label}</SectionLabel>
          <DisplayTitle
            lines={HOME_AGENDA.titleLines}
            className="display display-l"
            style={{ marginBottom: 56, maxWidth: "16ch" }}
          />
          <div className="grid-3">
            {HOME_AGENDA.cards.map((card, i) => (
              <Reveal key={card.titleLines.join("")} delay={i * 90}>
                <AgendaCard card={card} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* KIT / SHOP TEASER */}
      <section
        style={{
          position: "relative",
          padding: "var(--section) 0",
          background:
            "linear-gradient(180deg, var(--tbe-paper) 0%, var(--tbe-bone) 100%)",
          overflow: "hidden",
        }}
      >
        <div className="container" style={{ position: "relative" }}>
          <div className="grid-2" style={{ alignItems: "center" }}>
            <Reveal
              style={{
                position: "relative",
                aspectRatio: "3 / 4",
                maxHeight: 800,
              }}
            >
              <Image
                src={HOME_KIT.image}
                alt={HOME_KIT.imageAlt}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "contain" }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  color: "var(--tbe-smoke)",
                  textTransform: "uppercase",
                }}
              >
                {HOME_KIT.overlayTop}
              </div>
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontWeight: 900,
                  fontSize: "clamp(80px, 14vw, 240px)",
                  color: "var(--tbe-red)",
                  opacity: 0.08,
                  lineHeight: 0.8,
                  pointerEvents: "none",
                }}
              >
                {HOME_KIT.overlayBig}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <SectionLabel>{HOME_KIT.label}</SectionLabel>
              <DisplayTitle
                lines={HOME_KIT.titleLines}
                className="display display-hero"
                style={{ marginBottom: 24 }}
              />
              <p className="lede" style={{ marginBottom: 32 }}>
                {HOME_KIT.lead}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginBottom: 32,
                  flexWrap: "wrap",
                }}
              >
                {HOME_KIT.chips.map((chip) => (
                  <span
                    key={chip}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      padding: "8px 14px",
                      border: "1px solid var(--tbe-black)",
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <BtnLink href={HOME_KIT.cta.href} className="btn btn-primary">
                {HOME_KIT.cta.label}
              </BtnLink>
            </Reveal>
          </div>
        </div>
      </section>

      <SponsorWall />

      {/* CTA STRIP */}
      <section
        style={{
          background: "var(--tbe-red)",
          color: "white",
          padding: "80px var(--gutter)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(-75deg, transparent 0 80px, rgba(255,255,255,0.04) 80px 82px)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
          <h2 className="display display-l" style={{ marginBottom: 20 }}>
            Hai una bici?
            <br />
            <span
              className="outline"
              style={{ WebkitTextStroke: "2px white", color: "transparent" }}
            >
              Pedala con noi.
            </span>
          </h2>
          <p className="lede" style={{ margin: "0 auto 32px", maxWidth: "56ch" }}>
            {HOME_CTA.lead}
          </p>
          <BtnLink
            href={HOME_CTA.cta.href}
            className="btn"
            style={{ background: "white", color: "var(--tbe-red)" }}
          >
            {HOME_CTA.cta.label}
          </BtnLink>
        </div>
      </section>
    </SiteShell>
  );
}
