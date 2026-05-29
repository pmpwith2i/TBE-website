import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "@/components/site/site-shell";
import { Reveal } from "@/components/site/reveal";
import { SectionLabel, Eyebrow } from "@/components/site/section-label";
import { DisplayTitle } from "@/components/site/display-title";
import { BtnLink } from "@/components/site/buttons";
import {
  VISION_HERO,
  VISION_MANIFESTO,
  VISION_QUOTE,
  VISION_STORY,
  VISION_VALUES,
  VISION_CTA,
} from "@/constants/vision";

export const metadata: Metadata = { title: "Vision" };

export default function VisionPage() {
  return (
    <SiteShell theme="dark">
      {/* HERO */}
      <section
        style={{
          padding: "200px var(--gutter) 80px",
          background: "var(--tbe-black)",
          color: "var(--tbe-paper)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "60%",
            height: "100%",
            opacity: 0.18,
            maskImage: "linear-gradient(to left, black, transparent)",
            WebkitMaskImage: "linear-gradient(to left, black, transparent)",
          }}
        >
          <Image
            src={VISION_HERO.bgImage}
            alt=""
            fill
            sizes="60vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="container" style={{ position: "relative" }}>
          <Eyebrow num={VISION_HERO.eyebrowNum} light style={{ marginBottom: 32 }}>
            {VISION_HERO.eyebrowText}
          </Eyebrow>
          <DisplayTitle
            as="h1"
            lines={VISION_HERO.titleLines}
            className="display"
            style={{
              fontSize: "clamp(60px, 12vw, 200px)",
              lineHeight: 0.85,
              maxWidth: "13ch",
            }}
          />
          <p
            className="lede"
            style={{ marginTop: 40, opacity: 0.8, maxWidth: "60ch" }}
          >
            {VISION_HERO.lead}
          </p>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="section" style={{ background: "var(--tbe-ink)" }}>
        <div className="container">
          <div className="grid-2" style={{ gap: "clamp(40px, 8vw, 120px)" }}>
            <Reveal>
              <SectionLabel light>{VISION_MANIFESTO.label}</SectionLabel>
              <DisplayTitle
                lines={VISION_MANIFESTO.titleLines}
                className="display display-l"
              />
            </Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
              {VISION_MANIFESTO.points.map((point, i) => (
                <Reveal
                  key={point.kicker}
                  delay={i * 80}
                  style={{
                    borderLeft: "3px solid var(--accent)",
                    paddingLeft: 28,
                  }}
                >
                  <div
                    className="caption"
                    style={{ color: "var(--accent)", marginBottom: 8 }}
                  >
                    {point.kicker}
                  </div>
                  <h3 className="display display-m" style={{ marginBottom: 12 }}>
                    {point.title}
                  </h3>
                  <p style={{ opacity: 0.8, maxWidth: "56ch" }}>{point.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BIG QUOTE */}
      <section
        style={{
          background: "var(--accent)",
          color: "white",
          padding: "clamp(80px, 12vw, 160px) var(--gutter)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(-75deg, transparent 0 80px, rgba(0,0,0,0.06) 80px 82px)",
            pointerEvents: "none",
          }}
        />
        <div className="container" style={{ position: "relative" }}>
          <div
            aria-hidden
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 900,
              fontSize: 180,
              lineHeight: 0.7,
              opacity: 0.15,
              position: "absolute",
              top: -20,
              left: -10,
            }}
          >
            &ldquo;
          </div>
          <blockquote
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "clamp(36px, 5vw, 80px)",
              lineHeight: 1,
              maxWidth: "22ch",
              textTransform: "uppercase",
              letterSpacing: "-0.005em",
              margin: 0,
            }}
          >
            {VISION_QUOTE.lines.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line.outline ? (
                  <span
                    style={{
                      WebkitTextStroke: "2px white",
                      color: "transparent",
                    }}
                  >
                    {line.text}
                  </span>
                ) : (
                  line.text
                )}
              </span>
            ))}
          </blockquote>
          <div
            style={{
              marginTop: 40,
              display: "flex",
              gap: 16,
              alignItems: "center",
            }}
          >
            <span className="it-flag">
              <span />
              <span />
              <span />
            </span>
            <span className="caption" style={{ color: "rgba(255,255,255,0.8)" }}>
              {VISION_QUOTE.attribution}
            </span>
          </div>
        </div>
      </section>

      {/* STORIA */}
      <section className="section" style={{ background: "var(--tbe-black)" }}>
        <div className="container">
          <SectionLabel light>{VISION_STORY.label}</SectionLabel>
          <DisplayTitle
            lines={VISION_STORY.titleLines}
            className="display display-l"
            style={{ maxWidth: "16ch", marginBottom: 80 }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr",
              gap: "clamp(24px, 4vw, 80px)",
              maxWidth: 1000,
            }}
          >
            {VISION_STORY.timeline.map((item, i) => {
              const last = i === VISION_STORY.timeline.length - 1;
              return (
                <Reveal
                  as="div"
                  key={item.year}
                  delay={i * 70}
                  style={{ display: "contents" }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      fontWeight: 900,
                      fontSize: 56,
                      color: "var(--accent)",
                      lineHeight: 1,
                    }}
                  >
                    {item.year}
                  </div>
                  <div
                    style={{
                      paddingBottom: last ? 0 : 56,
                      borderBottom: last
                        ? undefined
                        : "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <h3 className="display display-m" style={{ marginBottom: 12 }}>
                      {item.title}
                    </h3>
                    <p style={{ opacity: 0.8, maxWidth: "60ch" }}>
                      {item.textEm ? (
                        <>
                          {item.textBefore}
                          <em>{item.textEm}</em>
                          {item.textAfter}
                        </>
                      ) : (
                        item.text
                      )}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* VALORI */}
      <section className="section" style={{ background: "var(--tbe-ink)" }}>
        <div className="container">
          <SectionLabel light>{VISION_VALUES.label}</SectionLabel>
          <DisplayTitle
            lines={VISION_VALUES.titleLines}
            className="display display-l"
            style={{ marginBottom: 64 }}
          />
          <div className="grid-4" style={{ gap: 20 }}>
            {VISION_VALUES.cards.map((card, i) => (
              <Reveal
                as="div"
                key={card.num}
                delay={i * 70}
                style={{
                  background: "var(--tbe-black)",
                  padding: 32,
                  borderTop: "3px solid var(--accent)",
                }}
              >
                <div
                  className="caption"
                  style={{ color: "var(--accent)", marginBottom: 16 }}
                >
                  {card.num}
                </div>
                <h3 className="display display-m" style={{ marginBottom: 12 }}>
                  {card.title}
                </h3>
                <p style={{ opacity: 0.75, fontSize: 15 }}>{card.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "var(--accent)",
          color: "white",
          padding: "80px var(--gutter)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <DisplayTitle
            lines={VISION_CTA.titleLines}
            className="display display-l"
            style={{ marginBottom: 20 }}
          />
          <p className="lede" style={{ margin: "0 auto 32px", maxWidth: "50ch" }}>
            {VISION_CTA.lead}
          </p>
          <BtnLink
            href={VISION_CTA.cta.href}
            className="btn"
            style={{ background: "white", color: "var(--tbe-red)" }}
          >
            {VISION_CTA.cta.label}
          </BtnLink>
        </div>
      </section>
    </SiteShell>
  );
}
