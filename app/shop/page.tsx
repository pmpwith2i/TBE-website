import type { Metadata } from "next";
import { SiteShell } from "@/components/site/site-shell";
import { Eyebrow } from "@/components/site/section-label";
import { BtnLink } from "@/components/site/buttons";
import { FeaturedKit } from "@/components/shop/featured-kit";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <SiteShell theme="dark">
      {/* HERO — dark so the type stays legible under the fixed nav */}
      <section
        style={{
          position: "relative",
          padding: "180px var(--gutter) 80px",
          background: "var(--tbe-black)",
          color: "var(--tbe-paper)",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: -40,
            right: -40,
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 900,
            fontSize: "clamp(180px, 30vw, 460px)",
            color: "var(--tbe-red)",
            opacity: 0.12,
            lineHeight: 0.7,
            letterSpacing: "-0.02em",
            pointerEvents: "none",
          }}
        >
          SHOP
        </div>
        <div className="container" style={{ position: "relative" }}>
          <Eyebrow num="/05" light style={{ marginBottom: 32 }}>
            Merchandising Ufficiale
          </Eyebrow>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.5fr 1fr",
              gap: 60,
              alignItems: "end",
            }}
            className="shop-head-grid"
          >
            <h1
              className="display"
              style={{ fontSize: "clamp(40px, 6.5vw, 96px)", lineHeight: 0.9 }}
            >
              Acquista il nostro{" "}
              <span style={{ color: "var(--accent)" }}>merchandising</span>{" "}
              ufficiale.
            </h1>
            <p className="lede" style={{ opacity: 0.85 }}>
              Il kit della stagione 2026, prodotto in Italia. Per ordinare,
              scrivici un messaggio: ti diciamo taglie, disponibilità e modi di
              ritiro o spedizione.
            </p>
          </div>
        </div>
      </section>

      <FeaturedKit />

      {/* CONTACT CTA — no cart for now */}
      <section
        style={{
          background: "var(--tbe-ink)",
          padding: "var(--section) var(--gutter)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div
            className="caption"
            style={{ color: "var(--accent)", marginBottom: 16 }}
          >
            Come si ordina
          </div>
          <h2 className="display display-l" style={{ marginBottom: 20 }}>
            Ti interessa?{" "}
            <span style={{ color: "var(--accent)" }}>Scrivici.</span>
          </h2>
          <p
            className="lede"
            style={{ margin: "0 auto 32px", maxWidth: "54ch", opacity: 0.85 }}
          >
            Per ora gli acquisti si gestiscono direttamente con noi. Mandaci un
            messaggio con quello che ti serve e ti rispondiamo il prima
            possibile.
          </p>
          <BtnLink href="/contatti" className="btn btn-primary">
            Contattaci
          </BtnLink>
        </div>
      </section>
    </SiteShell>
  );
}
