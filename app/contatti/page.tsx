import { SiteShell } from "@/components/site/site-shell";
import { pageSeo } from "@/lib/seo";
import { Eyebrow, SectionLabel } from "@/components/site/section-label";
import { SocialIcon } from "@/components/site/social-icons";
import { MainSponsor } from "@/components/site/main-sponsor";
import { JoinForm } from "@/components/contatti/join-form";
import { SOCIALS } from "@/constants/site";

export const metadata = pageSeo({
  title: "Contatti",
  description:
    "Vuoi pedalare con noi o sostenere la squadra? Contatta Teramo Bike Experience su Instagram, Facebook o dal form: ti rispondiamo presto.",
  path: "/contatti",
  keywords: [
    "contatti Teramo Bike Experience",
    "unirsi squadra ciclismo Teramo",
    "iscriversi squadra bici Teramo",
    "diventare sponsor ciclismo Teramo",
  ],
});

const CHANNEL_NOTE: Record<
  "instagram" | "facebook",
  { handle: string; note: string }
> = {
  instagram: {
    handle: "@teramobikeexperience",
    note: "Foto e racconti delle nostre uscite",
  },
  facebook: {
    handle: "Teramo Bike Experience",
    note: "Aggiornamenti ed eventi della squadra",
  },
};

export default function ContattiPage() {
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
          <Eyebrow num="/06" light style={{ marginBottom: 32 }}>
            Contatti
          </Eyebrow>
          <h1
            className="display"
            style={{ fontSize: "clamp(60px, 12vw, 200px)", lineHeight: 0.85 }}
          >
            Seguici
            <br />
            <span style={{ color: "var(--accent)" }}>sui social.</span>
          </h1>
          <p
            className="lede"
            style={{ marginTop: 32, opacity: 0.8, maxWidth: "60ch" }}
          >
            Il modo migliore per restare in contatto è sui social: ci trovi su
            Instagram e Facebook, scrivici un messaggio quando vuoi. Oppure
            compila il form qui sotto.
          </p>
        </div>
      </section>

      {/* SOCIAL CHANNELS */}
      <section
        style={{ background: "var(--tbe-black)", padding: "0 var(--gutter) 80px" }}
      >
        <div className="container">
          <div className="channels">
            {SOCIALS.map((s) => {
              const meta = CHANNEL_NOTE[s.platform];
              return (
                <a
                  key={s.platform}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel"
                >
                  <div className="icon">
                    <SocialIcon platform={s.platform} size={40} />
                  </div>
                  <div className="label">{s.label}</div>
                  <div className="value">{meta.handle}</div>
                  <div className="note">{meta.note}</div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* MAIN SPONSOR */}
      <section
        style={{ background: "var(--tbe-black)", padding: "0 var(--gutter) 100px" }}
      >
        <div className="container">
          <div
            className="contatti-sponsor-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(40px, 8vw, 100px)",
              alignItems: "center",
            }}
          >
            <div>
              <SectionLabel light>Chi ci sostiene</SectionLabel>
              <h2 className="display display-l" style={{ marginBottom: 24 }}>
                Dietro la squadra,
                <br />
                <span style={{ color: "var(--accent)" }}>il territorio.</span>
              </h2>
              <p
                className="lede"
                style={{ opacity: 0.8, maxWidth: "42ch" }}
              >
                
              </p>
            </div>

            <MainSponsor />
          </div>
        </div>
      </section>

      {/* FORM — one form for both joining the team and becoming a sponsor */}
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
              <SectionLabel light>Scrivici</SectionLabel>
              <h2 className="display display-l" style={{ marginBottom: 32 }}>
                Unisciti a noi
                <br />
                <span style={{ color: "var(--accent)" }}>
                  o diventa sponsor.
                </span>
              </h2>
              <p
                className="lede"
                style={{ opacity: 0.8, marginBottom: 32, maxWidth: "42ch" }}
              >
                Che tu voglia correre con noi o sostenere la squadra come
                sponsor, compila il form: ti ricontattiamo il prima possibile.
              </p>
            </div>

            <JoinForm />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
