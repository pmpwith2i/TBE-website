import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { BtnLink } from "@/components/site/buttons";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Evento in preparazione",
  description:
    "Stiamo organizzando un evento aperto al territorio. Ancora nessuna data: seguici su Instagram e Facebook per gli aggiornamenti.",
  path: "/eventi/cronoscalata",
  index: false,
});

export default function CronoscalataPage() {
  return (
    <SiteShell theme="dark">
      <section
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          padding: "180px var(--gutter) 100px",
          background: "var(--tbe-black)",
          color: "var(--tbe-paper)",
        }}
      >
        <div className="container">
          <div
            className="caption"
            style={{ color: "var(--accent)", marginBottom: 16 }}
          >
            In preparazione
          </div>
          <h1
            className="display"
            style={{
              fontSize: "clamp(48px, 9vw, 130px)",
              lineHeight: 0.9,
              marginBottom: 24,
            }}
          >
            Stiamo
            <br />
            <span style={{ color: "var(--accent)" }}>organizzando.</span>
          </h1>
          <p
            className="lede"
            style={{ opacity: 0.8, maxWidth: "55ch", marginBottom: 32 }}
          >
            Ci piacerebbe organizzare un nostro evento aperto al territorio. Non
            c&apos;è ancora una data: quando ci sarà, la trovi qui e sui nostri
            social.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <BtnLink href="/eventi" className="btn btn-primary">
              Torna alle uscite
            </BtnLink>
            <Link
              href="/contatti"
              className="btn"
              style={{
                background: "transparent",
                color: "white",
                border: "1px solid white",
              }}
            >
              Scrivici
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
