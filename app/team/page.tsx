import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "@/components/site/site-shell";
import { Eyebrow, SectionLabel } from "@/components/site/section-label";
import { DisplayTitle } from "@/components/site/display-title";
import { TEAM_HERO, RIDERS, STAFF_SECTION, STAFF } from "@/constants/team";

export const metadata: Metadata = { title: "Team" };

export default function TeamPage() {
  return (
    <SiteShell theme="dark">
      {/* HEADER */}
      <section
        style={{
          padding: "180px var(--gutter) 60px",
          background: "var(--tbe-black)",
          color: "var(--tbe-paper)",
        }}
      >
        <div className="container">
          <Eyebrow num={TEAM_HERO.eyebrowNum} light style={{ marginBottom: 32 }}>
            {TEAM_HERO.eyebrowText}
          </Eyebrow>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.5fr 1fr",
              gap: 60,
              alignItems: "end",
            }}
            className="team-head-grid"
          >
            <DisplayTitle
              as="h1"
              lines={TEAM_HERO.titleLines}
              className="display"
              style={{ fontSize: "clamp(60px, 11vw, 180px)", lineHeight: 0.85 }}
            />
            <p className="lede" style={{ opacity: 0.8 }}>
              {TEAM_HERO.lead}
            </p>
          </div>

          <div
            style={{
              marginTop: 56,
              display: "flex",
              alignItems: "baseline",
              gap: 16,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 900,
                fontSize: 72,
                color: "var(--accent)",
                lineHeight: 1,
              }}
            >
              {RIDERS.length}
            </span>
            <span className="caption" style={{ color: "rgba(255,255,255,0.6)" }}>
              {TEAM_HERO.counterLabel}
            </span>
          </div>
        </div>
      </section>

      {/* ROSTER GRID */}
      <section style={{ background: "var(--tbe-black)", paddingBottom: 40 }}>
        <div className="roster-grid">
          {RIDERS.map((rider) => (
            <article className="rider" key={rider.n}>
              <Image
                src={rider.img}
                alt={`${rider.first} ${rider.last}`}
                fill
                sizes="(max-width: 700px) 50vw, (max-width: 1000px) 33vw, 25vw"
                style={{ objectFit: "cover" }}
              />
              <div className="overlay" />
              <div className="num">#{String(rider.n).padStart(2, "0")}</div>
              <div className="meta">
                <div className="role">{rider.town}</div>
                <div className="name">
                  {rider.first}{" "}
                  <span className="surname">{rider.last}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* STAFF */}
      <section className="section" style={{ background: "var(--tbe-ink)" }}>
        <div className="container">
          <SectionLabel light>{STAFF_SECTION.label}</SectionLabel>
          <DisplayTitle
            lines={STAFF_SECTION.titleLines}
            className="display display-l"
            style={{ marginBottom: 56 }}
          />

          <div className="grid-3">
            {STAFF.map((member) => (
              <article
                key={member.name}
                style={{
                  background: "var(--tbe-black)",
                  padding: 32,
                  borderTop: "3px solid var(--accent)",
                }}
              >
                <div
                  style={{
                    aspectRatio: "1",
                    overflow: "hidden",
                    margin: "-32px -32px 24px",
                    position: "relative",
                  }}
                >
                  <Image
                    src={member.img}
                    alt={member.role}
                    fill
                    sizes="(max-width: 900px) 100vw, 33vw"
                    style={{
                      objectFit: "cover",
                      filter: "grayscale(0.4) contrast(1.1)",
                    }}
                  />
                </div>
                <div className="caption" style={{ color: "var(--accent)" }}>
                  {member.role}
                </div>
                <h3 className="display display-m" style={{ margin: "8px 0 16px" }}>
                  {member.name}
                </h3>
                <p style={{ opacity: 0.75, fontSize: 15 }}>{member.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
