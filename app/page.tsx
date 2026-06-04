import Image from "next/image";
import { SiteShell } from "@/components/site/site-shell";
import { Marquee } from "@/components/site/marquee";
import { Reveal } from "@/components/site/reveal";
import { SectionLabel } from "@/components/site/section-label";
import { BtnLink } from "@/components/site/buttons";
import { SponsorWall } from "@/components/site/sponsor-wall";
import { HomeHero } from "@/components/home/hero";

const MARQUEE = [
  "Teramo Bike Experience",
  "Stagione 2026",
  "Strade di Teramo",
  "Pedalare insieme",
  "Made in Teramo",
];

const KIT_CHIPS = ["Made in Italy", "Estiva · Gravel · Invernale", "Taglie XS–XXXL"];

export default function HomePage() {
  return (
    <SiteShell theme="light" navVariant="transparent">
      <HomeHero />
      <Marquee items={MARQUEE} />

      {/* INTRO / VISION TEASER */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: "end" }}>
            <Reveal>
              <SectionLabel>/02 — Chi siamo</SectionLabel>
              <h2 className="display display-l">
                Una squadra
                <br />
                social, nata
                <br />
                a <em style={{ color: "var(--accent)" }}>Teramo</em>.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="lede" style={{ marginBottom: 24 }}>
                Siamo un gruppo di amici di Teramo che esce in bici insieme. Le
                uscite social sono il cuore della squadra: ci troviamo,
                pedaliamo in gruppo e teniamo un passo adatto a tutti.{" "}
                <strong>
                  Qualcuno di noi ogni tanto fa una gara, ma il senso è stare
                  insieme sui pedali.
                </strong>
              </p>
              <BtnLink
                href="/vision"
                className="btn-ghost italic uppercase"
                arrow={false}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                }}
              >
                Leggi la nostra Vision →
              </BtnLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* LE NOSTRE USCITE */}
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
              <SectionLabel light>/03 — Le nostre uscite</SectionLabel>
              <h2
                className="display display-hero"
                style={{ lineHeight: 0.9, marginBottom: 32 }}
              >
                Ci vediamo
                <br />
                <span style={{ color: "var(--accent)" }}>la domenica.</span>
              </h2>
              <p className="lede" style={{ opacity: 0.85, marginBottom: 32 }}>
                Ci troviamo ogni settimana per un&apos;uscita insieme, aperta a
                chiunque abbia una bici e voglia di pedalare. Si va al passo del
                gruppo, nessuno resta indietro. Dal mare alle montagne del
                teramano, e ritorno con calma.
              </p>
              <BtnLink href="/eventi" className="btn btn-primary">
                Scopri le uscite
              </BtnLink>
            </Reveal>

            <Reveal
              className="media"
              delay={120}
              style={{ aspectRatio: "3 / 4", minHeight: 600 }}
            >
              <Image
                src="/assets/sunset-rider.jpg"
                alt="Un'uscita della squadra al tramonto"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </Reveal>
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
                src="/assets/maglia-front.jpg"
                alt="Kit ufficiale TBE 2026 — vista frontale"
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
                KIT 2026
              </div>
            </Reveal>

            <Reveal delay={100}>
              <SectionLabel>/04 — Lo shop</SectionLabel>
              <h2 className="display display-hero" style={{ marginBottom: 24 }}>
                La maglia
                <br />
                <span style={{ color: "var(--accent)" }}>della squadra.</span>
              </h2>
              <p className="lede" style={{ marginBottom: 32 }}>
                Il kit ufficiale della stagione 2026, prodotto in Italia da
                Alpic. Un disegno pensato da noi. Disponibile in versione
                estiva, gravel e invernale.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginBottom: 32,
                  flexWrap: "wrap",
                }}
              >
                {KIT_CHIPS.map((chip) => (
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
              <BtnLink href="/shop" className="btn btn-primary">
                Vai allo shop
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
            Siamo aperti a ciclisti di tutte le età e livelli. Quello che conta è
            la voglia di pedalare insieme, una domenica mattina.
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
