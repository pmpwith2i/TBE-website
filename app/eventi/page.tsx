import { SiteShell } from "@/components/site/site-shell";
import { pageSeo } from "@/lib/seo";
import { Eyebrow, SectionLabel } from "@/components/site/section-label";
import { BtnLink } from "@/components/site/buttons";

export const metadata = pageSeo({
  title: "Eventi e uscite",
  description:
    "Le uscite di Teramo Bike Experience: pedalate social di gruppo ogni settimana, aperte a tutti, e qualche gara del calendario CSI. Vieni a pedalare con noi.",
  path: "/eventi",
  keywords: [
    "uscite ciclismo Teramo",
    "eventi ciclismo Teramo",
    "pedalate di gruppo Teramo",
    "gare ciclismo CSI Teramo",
  ],
});

const ATTIVITA = [
  {
    title: "Uscite social",
    text: "Il cuore della squadra. Ci troviamo ogni settimana e usciamo in gruppo, a un passo adatto a tutti. Aperte a chiunque abbia una bici.",
  },
  {
    title: "Qualche gara",
    text: "Alcuni di noi ogni tanto partecipano a una gara del calendario CSI. Si va per divertirsi, senza pressioni.",
  },
  {
    title: "Eventi nostri",
    text: "Ogni tanto ci piace organizzare qualcosa di aperto al territorio. Quando ci sarà una data, la trovi qui e sui nostri social.",
  },
];

export default function EventiPage() {
  return (
    <SiteShell theme="dark">
      {/* HEADER */}
      <section
        style={{
          padding: "180px var(--gutter) 80px",
          background: "var(--tbe-black)",
          color: "var(--tbe-paper)",
        }}
      >
        <div className="container">
          <Eyebrow num="/04" light style={{ marginBottom: 28 }}>
            Le uscite
          </Eyebrow>
          <h1
            className="display"
            style={{ fontSize: "clamp(56px, 11vw, 180px)", lineHeight: 0.85 }}
          >
            Pedaliamo
            <br />
            <span style={{ color: "var(--accent)" }}>insieme.</span>
          </h1>
          <p
            className="lede"
            style={{ marginTop: 32, opacity: 0.8, maxWidth: "60ch" }}
          >
            Il nostro appuntamento fisso è l&apos;uscita di gruppo: si pedala
            insieme, al passo di tutti, per il piacere di stare in compagnia.
            Tutto il resto viene dopo.
          </p>
        </div>
      </section>

      {/* COSA FACCIAMO */}
      <section
        className="section"
        style={{
          background: "var(--tbe-ink)",
          paddingBlock: "clamp(60px, 8vw, 100px)",
        }}
      >
        <div className="container">
          <SectionLabel light>Cosa facciamo</SectionLabel>
          <h2
            className="display display-l"
            style={{ marginBottom: 56, maxWidth: "16ch" }}
          >
            Soprattutto,
            <br />
            <span style={{ color: "var(--accent)" }}>stare insieme.</span>
          </h2>
          <div className="grid-3">
            {ATTIVITA.map((a) => (
              <div
                key={a.title}
                style={{
                  background: "var(--tbe-black)",
                  padding: 32,
                  borderTop: "3px solid var(--accent)",
                }}
              >
                <h3 className="display display-m" style={{ marginBottom: 12 }}>
                  {a.title}
                </h3>
                <p style={{ opacity: 0.8, fontSize: 15 }}>{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "var(--tbe-black)",
          padding: "var(--section) var(--gutter)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 className="display display-l" style={{ marginBottom: 20 }}>
            Vuoi venire a
            <br />
            <span style={{ color: "var(--accent)" }}>un&apos;uscita?</span>
          </h2>
          <p
            className="lede"
            style={{ margin: "0 auto 32px", maxWidth: "50ch", opacity: 0.85 }}
          >
            Scrivici sui social o qui dal sito: ti diciamo dove e quando ci
            troviamo per la prossima pedalata.
          </p>
          <BtnLink href="/contatti" className="btn btn-primary">
            Unisciti a noi
          </BtnLink>
        </div>
      </section>
    </SiteShell>
  );
}
