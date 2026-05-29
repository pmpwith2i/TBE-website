import type { Metadata } from "next";
import { SiteShell } from "@/components/site/site-shell";
import { Eyebrow, SectionLabel } from "@/components/site/section-label";
import { DisplayTitle } from "@/components/site/display-title";
import { BtnLink } from "@/components/site/buttons";
import { JoinForm } from "@/components/contatti/join-form";
import { RegionMap } from "@/components/contatti/region-map";
import { SocialIcon } from "@/components/site/social-icons";
import {
  CONTATTI_HERO,
  CHANNELS,
  JOIN_FORM,
  SPONSOR_SECTION,
} from "@/constants/contatti";

export const metadata: Metadata = { title: "Contatti" };

const TIER_BORDER: Record<"red" | "amber", string> = {
  red: "var(--accent)",
  amber: "var(--tbe-amber)",
};

export default function ContattiPage() {
  return (
    <SiteShell theme="dark" navCta={{ label: "Scrivici", href: "#form" }}>
      {/* HEADER */}
      <section
        style={{
          padding: "180px var(--gutter) 60px",
          background: "var(--tbe-black)",
          color: "var(--tbe-paper)",
        }}
      >
        <div className="container">
          <Eyebrow
            num={CONTATTI_HERO.eyebrowNum}
            light
            style={{ marginBottom: 32 }}
          >
            {CONTATTI_HERO.eyebrowText}
          </Eyebrow>
          <DisplayTitle
            as="h1"
            lines={CONTATTI_HERO.titleLines}
            className="display"
            style={{ fontSize: "clamp(60px, 12vw, 200px)", lineHeight: 0.85 }}
          />
          <p
            className="lede"
            style={{ marginTop: 32, opacity: 0.8, maxWidth: "60ch" }}
          >
            {CONTATTI_HERO.lead}
          </p>
        </div>
      </section>

      {/* CHANNELS */}
      <section
        style={{ background: "var(--tbe-black)", padding: "0 var(--gutter) 80px" }}
      >
        <div className="container">
          <div className="channels">
            {CHANNELS.map((ch) => (
              <a
                key={ch.platform}
                href={ch.href}
                target="_blank"
                rel="noopener noreferrer"
                className="channel"
              >
                <div className="icon">
                  <SocialIcon platform={ch.platform} size={40} />
                </div>
                <div className="label">{ch.label}</div>
                <div className="value">{ch.handle}</div>
                <div className="note">{ch.note}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN FORM */}
      <section
        id="form"
        style={{
          background: "var(--tbe-ink)",
          padding: "var(--section) var(--gutter)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr",
              gap: "clamp(40px, 8vw, 100px)",
            }}
            className="contatti-form-grid"
          >
            <div>
              <SectionLabel light>{JOIN_FORM.label}</SectionLabel>
              <DisplayTitle
                lines={JOIN_FORM.titleLines}
                className="display display-l"
                style={{ marginBottom: 32 }}
              />
              <p
                className="lede"
                style={{ opacity: 0.8, marginBottom: 32, maxWidth: "40ch" }}
              >
                {JOIN_FORM.lead}
              </p>

              <div
                className="caption"
                style={{ color: "rgba(255,255,255,0.5)", marginBottom: 8 }}
              >
                {JOIN_FORM.companyLabel}
              </div>
              <BtnLink
                href={JOIN_FORM.companyLink.href}
                className="btn-ghost italic uppercase"
                arrow={false}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  color: "white",
                }}
              >
                {JOIN_FORM.companyLink.label}
              </BtnLink>
            </div>

            <JoinForm />
          </div>
        </div>
      </section>

      {/* SPONSOR */}
      <section
        id={SPONSOR_SECTION.id}
        style={{
          background: "var(--tbe-black)",
          padding: "var(--section) var(--gutter)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(40px, 8vw, 100px)",
              alignItems: "center",
            }}
            className="contatti-sponsor-grid"
          >
            <div>
              <SectionLabel light>{SPONSOR_SECTION.label}</SectionLabel>
              <DisplayTitle
                lines={SPONSOR_SECTION.titleLines}
                className="display display-l"
                style={{ marginBottom: 32 }}
              />
              <p className="lede" style={{ opacity: 0.8, marginBottom: 32 }}>
                {SPONSOR_SECTION.lead}
              </p>
              <BtnLink
                href={SPONSOR_SECTION.cta.href}
                className="btn btn-primary"
              >
                {SPONSOR_SECTION.cta.label}
              </BtnLink>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 20,
              }}
            >
              {SPONSOR_SECTION.tiers.map((tier) => (
                <div
                  key={tier.mark}
                  style={{
                    background: "var(--tbe-ink)",
                    padding: 28,
                    borderTop: `3px solid ${TIER_BORDER[tier.accent]}`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      fontWeight: 900,
                      fontSize: 56,
                      color: TIER_BORDER[tier.accent],
                      lineHeight: 1,
                    }}
                  >
                    {tier.mark}
                  </div>
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      fontSize: 22,
                      margin: "8px 0 12px",
                    }}
                  >
                    {tier.title}
                  </h4>
                  <p style={{ fontSize: 14, opacity: 0.75 }}>{tier.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </SiteShell>
  );
}
