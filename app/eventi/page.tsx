import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { Eyebrow, SectionLabel } from "@/components/site/section-label";
import { DisplayTitle } from "@/components/site/display-title";
import { BtnLink } from "@/components/site/buttons";
import { Countdown } from "@/components/events/countdown";
import { EventCalendar } from "@/components/events/event-calendar";
import {
  EVENTS_HERO,
  NEXT_EVENT,
  CALENDAR_HEADER,
  EVENTS_PROPOSE,
} from "@/constants/events";

export const metadata: Metadata = { title: "Eventi" };

export default function EventiPage() {
  return (
    <SiteShell theme="dark">
      {/* HEADER + NEXT EVENT */}
      <section
        style={{
          padding: "180px var(--gutter) 80px",
          background: "var(--tbe-black)",
          color: "var(--tbe-paper)",
        }}
      >
        <div className="container">
          <Eyebrow
            num={EVENTS_HERO.eyebrowNum}
            light
            style={{ marginBottom: 28 }}
          >
            {EVENTS_HERO.eyebrowText}
          </Eyebrow>
          <DisplayTitle
            as="h1"
            lines={EVENTS_HERO.titleLines}
            className="display"
            style={{ fontSize: "clamp(56px, 11vw, 180px)", lineHeight: 0.85 }}
          />

          {/* NEXT EVENT CARD */}
          <Link
            href={NEXT_EVENT.href}
            className="next-event"
            style={{ display: "block", marginTop: 64 }}
          >
            <div className="next-event-bg" />
            <div className="next-event-overlay" />
            <div className="next-event-inner">
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    marginBottom: 24,
                    flexWrap: "wrap",
                  }}
                >
                  <span className="next-event-tag">
                    <span className="pulse" /> {NEXT_EVENT.tag}
                  </span>
                  <span
                    className="caption"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    {NEXT_EVENT.status}
                  </span>
                </div>
                <div
                  className="caption"
                  style={{ color: "rgba(255,255,255,0.8)", marginBottom: 8 }}
                >
                  {NEXT_EVENT.date}
                </div>
                <h2
                  className="display"
                  style={{
                    fontSize: "clamp(40px, 6vw, 88px)",
                    lineHeight: 0.85,
                    marginBottom: 16,
                  }}
                >
                  {NEXT_EVENT.titleLines.map((line, i) => (
                    <span key={i}>
                      {i > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </h2>
                <p
                  style={{
                    opacity: 0.9,
                    maxWidth: "50ch",
                    marginBottom: 4,
                    fontSize: 17,
                  }}
                >
                  {NEXT_EVENT.lead}
                </p>

                <Countdown />

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    fontSize: 17,
                    letterSpacing: "0.08em",
                  }}
                >
                  {NEXT_EVENT.ctaInline}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                {NEXT_EVENT.stats.map((s) => (
                  <div
                    key={s.label}
                    style={{
                      padding: 20,
                      background: "rgba(0,0,0,0.25)",
                      backdropFilter: "blur(6px)",
                      WebkitBackdropFilter: "blur(6px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <div
                      className="caption"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {s.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontStyle: "italic",
                        fontWeight: 900,
                        fontSize: 38,
                        marginTop: 6,
                      }}
                    >
                      {s.value}{" "}
                      <span style={{ fontSize: 16, opacity: 0.7 }}>{s.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* CALENDAR LIST */}
      <section
        className="section"
        style={{
          background: "var(--tbe-ink)",
          paddingBlock: "clamp(60px, 8vw, 100px)",
        }}
      >
        <div className="container">
          <EventCalendar
            header={
              <div>
                <SectionLabel light>{CALENDAR_HEADER.label}</SectionLabel>
                <DisplayTitle
                  lines={CALENDAR_HEADER.titleLines}
                  className="display display-l"
                  style={{ maxWidth: "14ch" }}
                />
              </div>
            }
          />
        </div>
      </section>

      {/* PROPOSE */}
      <section
        style={{
          background: "var(--tbe-black)",
          padding: "var(--section) var(--gutter)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div
            className="caption"
            style={{ color: "var(--accent)", marginBottom: 16 }}
          >
            {EVENTS_PROPOSE.kicker}
          </div>
          <DisplayTitle
            lines={EVENTS_PROPOSE.titleLines}
            className="display display-l"
            style={{ marginBottom: 20 }}
          />
          <p
            className="lede"
            style={{ margin: "0 auto 32px", maxWidth: "50ch", opacity: 0.85 }}
          >
            {EVENTS_PROPOSE.lead}
          </p>
          <BtnLink href={EVENTS_PROPOSE.cta.href} className="btn btn-primary">
            {EVENTS_PROPOSE.cta.label}
          </BtnLink>
        </div>
      </section>
    </SiteShell>
  );
}
