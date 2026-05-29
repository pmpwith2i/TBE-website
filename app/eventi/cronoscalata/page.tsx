import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { SectionLabel } from "@/components/site/section-label";
import { DisplayTitle } from "@/components/site/display-title";
import { Altimetry } from "@/components/events/altimetry";
import { RegistrationForm } from "@/components/events/registration-form";
import { CRONOSCALATA } from "@/constants/events";

const C = CRONOSCALATA;

export const metadata: Metadata = {
  title: C.meta.title,
  description: C.hero.lead,
};

const ACCENT_BORDER: Record<"red" | "amber", string> = {
  red: "var(--accent)",
  amber: "var(--tbe-amber)",
};
const ACCENT_TEXT: Record<"red" | "amber", string> = {
  red: "var(--accent)",
  amber: "var(--tbe-amber)",
};

export default function CronoscalataPage() {
  return (
    <SiteShell
      theme="dark"
      navCta={{ label: "Iscriviti", href: "#iscrizione" }}
    >
      {/* HERO */}
      <section
        style={{
          padding: "140px var(--gutter) 60px",
          background: "var(--tbe-red-deep)",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('${C.hero.bgImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.22,
            filter: "contrast(1.1) saturate(1.1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, var(--tbe-red-deep) 0%, rgba(74,4,16,0.92) 60%, var(--tbe-red-deep) 100%)",
          }}
        />

        <div className="container" style={{ position: "relative" }}>
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/eventi">Eventi</Link>
            <span className="sep">/</span>
            <span style={{ color: "white" }}>{C.meta.breadcrumb}</span>
          </div>

          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              marginBottom: 28,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                background: "white",
                color: "var(--tbe-red)",
                padding: "6px 14px",
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 900,
                fontSize: 12,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              {C.hero.status}
            </span>
            <span className="caption" style={{ color: "rgba(255,255,255,0.85)" }}>
              {C.hero.date}
            </span>
          </div>

          <h1
            className="display"
            style={{
              fontSize: "clamp(56px, 11vw, 180px)",
              lineHeight: 0.82,
              marginBottom: 32,
            }}
          >
            {C.hero.titlePrefix}
            <span
              style={{ WebkitTextStroke: "2px white", color: "transparent" }}
            >
              {C.hero.titleOutline}
            </span>
            <br />
            {C.hero.titleSecond}
          </h1>

          <p
            className="lede"
            style={{ opacity: 0.92, maxWidth: "65ch", marginBottom: 40 }}
          >
            {C.hero.lead}
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a
              href={C.hero.ctaPrimary.href}
              className="btn"
              style={{ background: "white", color: "var(--tbe-red)" }}
            >
              {C.hero.ctaPrimary.label}{" "}
              <span className="arrow" aria-hidden>
                →
              </span>
            </a>
            <a
              href={C.hero.ctaSecondary.href}
              className="btn"
              style={{
                background: "transparent",
                color: "white",
                border: "1px solid white",
              }}
            >
              {C.hero.ctaSecondary.label}
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section
        style={{
          background: "var(--tbe-black)",
          padding: "0 var(--gutter)",
          marginTop: -60,
          position: "relative",
          zIndex: 5,
        }}
      >
        <div className="container">
          <div className="detail-stats">
            {C.stats.map((s) => (
              <div key={s.label}>
                <div className="label">{s.label}</div>
                <div
                  className="value"
                  style={s.accent ? { color: "var(--accent)" } : undefined}
                >
                  {s.value}
                  {s.unit ? <span className="unit">{s.unit}</span> : null}
                </div>
                <div style={{ marginTop: 4, fontSize: 13, opacity: 0.7 }}>
                  {s.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESCRIZIONE + ALTIMETRIA */}
      <section
        id="percorso"
        className="section"
        style={{ background: "var(--tbe-black)" }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr",
              gap: "clamp(40px, 6vw, 100px)",
              alignItems: "start",
            }}
            className="crono-route-grid"
          >
            <div>
              <SectionLabel light>{C.route.label}</SectionLabel>
              <DisplayTitle
                lines={C.route.titleLines}
                className="display display-m"
                style={{ marginBottom: 24 }}
              />
              {C.route.paragraphs.map((para, i) => (
                <p key={i} style={{ opacity: 0.85, marginBottom: 20 }}>
                  {para}
                </p>
              ))}
              <p style={{ opacity: 0.85 }}>
                {C.route.recon.before}
                <strong>{C.route.recon.strong}</strong>
                {C.route.recon.after}
              </p>
            </div>

            <div
              style={{
                background: "var(--tbe-ink)",
                padding: 32,
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="caption"
                style={{ marginBottom: 16, color: "rgba(255,255,255,0.6)" }}
              >
                {C.route.profileLabel}
              </div>
              <Altimetry />
            </div>
          </div>
        </div>
      </section>

      {/* INFO PRATICHE */}
      <section
        className="section"
        style={{
          background: "var(--tbe-ink)",
          paddingBlock: "clamp(60px, 8vw, 100px)",
        }}
      >
        <div className="container">
          <SectionLabel light>{C.info.label}</SectionLabel>
          <h2 className="display display-m" style={{ marginBottom: 48 }}>
            {C.info.title}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 20,
            }}
            className="crono-info-grid"
          >
            {C.info.cards.map((card) => (
              <div
                key={card.title}
                style={{
                  background: "var(--tbe-black)",
                  padding: 28,
                  borderTop: `3px solid ${ACCENT_BORDER[card.accent]}`,
                }}
              >
                <div
                  className="caption"
                  style={{ color: ACCENT_TEXT[card.accent], marginBottom: 10 }}
                >
                  {card.title}
                </div>
                <p style={{ fontSize: 14, opacity: 0.85 }}>{card.text}</p>
              </div>
            ))}
          </div>

          {/* Programma */}
          <h3
            className="display display-m"
            style={{ marginTop: 80, marginBottom: 32 }}
          >
            {C.info.programTitle}
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr",
              gap: 24,
              maxWidth: 800,
            }}
          >
            {C.info.program.map((item, i) => {
              const last = i === C.info.program.length - 1;
              return (
                <div key={item.time} style={{ display: "contents" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      fontWeight: 900,
                      fontSize: 28,
                      color: "var(--accent)",
                      lineHeight: 1,
                    }}
                  >
                    {item.time}
                  </div>
                  <div
                    style={{
                      paddingBottom: last ? 0 : 20,
                      borderBottom: last
                        ? undefined
                        : "1px solid rgba(255,255,255,0.1)",
                      opacity: 0.9,
                    }}
                  >
                    {item.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ISCRIZIONE FORM */}
      <section
        id="iscrizione"
        style={{
          background: "var(--tbe-black)",
          padding: "var(--section) var(--gutter)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.6fr",
              gap: "clamp(40px, 6vw, 100px)",
            }}
            className="crono-form-grid"
          >
            {/* Sidebar */}
            <div style={{ position: "sticky", top: 100, alignSelf: "start" }}>
              <SectionLabel light>{C.registration.label}</SectionLabel>
              <DisplayTitle
                lines={C.registration.titleLines}
                className="display display-l"
                style={{ marginBottom: 24 }}
              />
              <p style={{ opacity: 0.85, marginBottom: 32, maxWidth: "38ch" }}>
                {C.registration.intro}
              </p>

              <div
                style={{
                  background: "var(--tbe-ink)",
                  padding: 24,
                  borderLeft: "3px solid var(--accent)",
                }}
              >
                <div
                  className="caption"
                  style={{ color: "var(--accent)", marginBottom: 16 }}
                >
                  {C.registration.summaryTitle}
                </div>
                {C.registration.summary.map((row, i) => (
                  <div
                    key={row.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom:
                        i < C.registration.summary.length - 1
                          ? "1px solid rgba(255,255,255,0.08)"
                          : undefined,
                    }}
                  >
                    <span style={{ opacity: 0.7, fontSize: 14 }}>
                      {row.label}
                    </span>
                    <span
                      style={{ fontFamily: "var(--font-mono)", fontSize: 14 }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 24,
                  padding: 16,
                  background: "rgba(243,156,18,0.1)",
                  border: "1px solid rgba(243,156,18,0.3)",
                  fontSize: 13,
                }}
              >
                <strong style={{ color: "var(--tbe-amber)" }}>
                  {C.registration.warning.title}
                </strong>
                <br />
                <span style={{ opacity: 0.85 }}>
                  {C.registration.warning.before}
                  <strong>{C.registration.warning.strong}</strong>
                  {C.registration.warning.after}
                </span>
              </div>
            </div>

            <RegistrationForm />
          </div>
        </div>
      </section>

      {/* PARTNER */}
      <section
        style={{ background: "var(--tbe-ink)", padding: "80px var(--gutter)" }}
      >
        <div className="container">
          <div
            className="caption"
            style={{
              color: "rgba(255,255,255,0.6)",
              textAlign: "center",
              marginBottom: 24,
            }}
          >
            {C.partnersLabel}
          </div>
          <div className="partners">
            {C.partners.map((p) => (
              <div key={p.name}>
                {p.name}
                <small>{p.detail}</small>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
