import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "@/components/site/site-shell";
import { Reveal } from "@/components/site/reveal";
import { SectionLabel, Eyebrow } from "@/components/site/section-label";
import { BtnLink } from "@/components/site/buttons";

export const metadata: Metadata = { title: "Vision" };

const POINTS = [
  {
    kicker: "01 / Insieme",
    title: "Si pedala in gruppo.",
    text: "Le uscite social sono il cuore della squadra. Si va insieme, a un ritmo adatto a tutti: nessuno parte per primo, nessuno resta indietro.",
  },
  {
    kicker: "02 / Aperti a tutti",
    title: "Nessun livello richiesto.",
    text: "Non serve essere allenati o avere la bici giusta. Chi inizia da zero è il benvenuto come chi pedala da una vita.",
  },
  {
    kicker: "03 / Qualcuno gareggia",
    title: "La gara è solo una parte.",
    text: "Alcuni di noi ogni tanto corrono una gara del calendario CSI. Fa parte della squadra, ma non è il motivo per cui ci troviamo.",
  },
];

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
            src="/assets/sunset-rider.jpg"
            alt=""
            fill
            sizes="60vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="container" style={{ position: "relative" }}>
          <Eyebrow num="/00" light style={{ marginBottom: 32 }}>
            La nostra Vision
          </Eyebrow>
          <h1
            className="display"
            style={{
              fontSize: "clamp(60px, 12vw, 200px)",
              lineHeight: 0.85,
              maxWidth: "13ch",
            }}
          >
            Prima di tutto,
            <br />
            <span style={{ color: "var(--accent)" }}>insieme.</span>
          </h1>
          <p
            className="lede"
            style={{ marginTop: 40, opacity: 0.8, maxWidth: "60ch" }}
          >
            Teramo Bike Experience è una squadra social: un gruppo di amici che
            esce in bici per il piacere di stare insieme. Non ci interessa
            vincere, ci interessa ritrovarsi e pedalare in compagnia. Alcuni di
            noi corrono qualche gara, ma resta una parte, non il cuore.
          </p>
        </div>
      </section>

      {/* TRE COSE SEMPLICI */}
      <section className="section" style={{ background: "var(--tbe-ink)" }}>
        <div className="container">
          <div className="grid-2" style={{ gap: "clamp(40px, 8vw, 120px)" }}>
            <Reveal>
              <SectionLabel light>/01 — Cosa conta per noi</SectionLabel>
              <h2 className="display display-l">
                Tre cose
                <br />
                <span style={{ color: "var(--accent)" }}>semplici.</span>
              </h2>
            </Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
              {POINTS.map((point, i) => (
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

      {/* COME SIAMO NATI */}
      <section className="section" style={{ background: "var(--tbe-black)" }}>
        <div className="container">
          <SectionLabel light>/02 — Come siamo nati</SectionLabel>
          <h2
            className="display display-l"
            style={{ maxWidth: "18ch", marginBottom: 40 }}
          >
            Da un gruppo di amici
            <br />
            <span style={{ color: "var(--accent)" }}>a una squadra.</span>
          </h2>
          <p
            className="lede"
            style={{ opacity: 0.8, maxWidth: "62ch", marginBottom: 20 }}
          >
            Siamo partiti come un gruppo di amici che si trovava per pedalare
            insieme, senza niente di organizzato. Col tempo siamo cresciuti, ci
            siamo dati una maglia e siamo diventati una ASD affiliata CSI.
          </p>
          <p className="lede" style={{ opacity: 0.8, maxWidth: "62ch" }}>
            È cambiata la struttura, non lo spirito: usciamo in bici insieme,
            come il primo giorno.
          </p>
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
          <h2 className="display display-l" style={{ marginBottom: 20 }}>
            Ti va di pedalare
            <br />
            con noi?
          </h2>
          <p className="lede" style={{ margin: "0 auto 32px", maxWidth: "50ch" }}>
            Scrivici: ci fa piacere conoscerti e dirti dove ci troviamo per la
            prossima uscita.
          </p>
          <BtnLink
            href="/contatti"
            className="btn"
            style={{ background: "white", color: "var(--tbe-red)" }}
          >
            Unisciti a noi
          </BtnLink>
        </div>
      </section>
    </SiteShell>
  );
}
