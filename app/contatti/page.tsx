import type { Metadata } from "next";
import { SiteShell } from "@/components/site/site-shell";
import { Eyebrow, SectionLabel } from "@/components/site/section-label";
import { DisplayTitle } from "@/components/site/display-title";
import { BtnLink } from "@/components/site/buttons";
import { JoinForm } from "@/components/contatti/join-form";
import { RegionMap } from "@/components/contatti/region-map";
import {
  CONTATTI_HERO,
  CHANNELS,
  JOIN_FORM,
  SPONSOR_SECTION,
  LOCATION,
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
          <div className="grid-4" style={{ gap: 4 }}>
            {CHANNELS.map((ch) => (
              <a key={ch.label} href={ch.href} className="channel">
                <div className="icon">{ch.icon}</div>
                <div className="label">{ch.label}</div>
                <div className="value">
                  {ch.value.map((line, i) => (
                    <span key={i}>
                      {i > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </div>
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
              <p className="lede" style={{ opacity: 0.8, marginBottom: 32 }}>
                {JOIN_FORM.lead}
              </p>

              <div
                style={{
                  padding: "24px 0",
                  borderBlock: "1px solid rgba(255,255,255,0.1)",
                  marginBottom: 32,
                }}
              >
                <div
                  className="caption"
                  style={{ color: "var(--accent)", marginBottom: 12 }}
                >
                  {JOIN_FORM.requirementsLabel}
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    fontSize: 15,
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {JOIN_FORM.requirements.map((req) => (
                    <li key={req}>{req}</li>
                  ))}
                </ul>
              </div>

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

      {/* MAP / SEDE */}
      <section
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
              gap: 60,
              alignItems: "stretch",
            }}
            className="contatti-map-grid"
          >
            <div>
              <SectionLabel light>{LOCATION.label}</SectionLabel>
              <DisplayTitle
                lines={LOCATION.titleLines}
                className="display display-l"
                style={{ marginBottom: 24 }}
              />
              <p style={{ opacity: 0.85, maxWidth: "40ch", marginBottom: 32 }}>
                {LOCATION.text}
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  paddingTop: 24,
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div>
                  <div
                    className="caption"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    Indirizzo
                  </div>
                  <div style={{ marginTop: 4 }}>
                    {LOCATION.address.map((line, i) => (
                      <span key={i}>
                        {i > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div
                    className="caption"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    Orari
                  </div>
                  <div style={{ marginTop: 4 }}>
                    {LOCATION.hours.map((line, i) => (
                      <span key={i}>
                        {i > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <RegionMap />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
