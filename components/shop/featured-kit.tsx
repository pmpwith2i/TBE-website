import Image from "next/image";
import { BtnLink } from "@/components/site/buttons";
import { KIT } from "@/constants/shop";

/**
 * The official kit showcase. No cart for now — we invite people to write us
 * to order. Product data comes from constants/shop.ts; copy is inline here.
 */
export function FeaturedKit() {
  return (
    <section style={{ background: "var(--tbe-black)", color: "white", padding: 0 }}>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}
        className="featured-kit-grid"
      >
        <div
          style={{
            aspectRatio: "4 / 5",
            background: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image
            src={KIT.image}
            alt={KIT.imageAlt}
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
            style={{ objectFit: "contain" }}
          />
        </div>

        <div
          style={{
            padding: "clamp(40px, 6vw, 80px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
            {KIT.badges.map((badge, i) => (
              <span
                key={badge}
                style={{
                  background: i === 0 ? "var(--accent)" : "transparent",
                  border: i === 0 ? undefined : "1px solid white",
                  padding: "6px 14px",
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontWeight: 800,
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {badge}
              </span>
            ))}
          </div>

          <h2
            className="display"
            style={{
              fontSize: "clamp(56px, 9vw, 130px)",
              lineHeight: 0.82,
              marginBottom: 24,
            }}
          >
            Il Kit
            <br />
            <span style={{ color: "var(--accent)" }}>Ufficiale &apos;26</span>
          </h2>

          <p className="lede" style={{ opacity: 0.85, marginBottom: 32 }}>
            Maglia e salopette in tessuto leggero e traspirante, perfetti per
            ogni uscita. Un disegno pensato dalla squadra, prodotto in Italia da
            Alpic.
          </p>

          <p
            style={{
              opacity: 0.75,
              fontSize: 15,
              padding: "24px 0",
              borderTop: "1px solid rgba(255,255,255,0.15)",
              marginBottom: 32,
            }}
          >
            Disponibile nelle taglie XS–XXXL, in versione estiva, gravel e
            invernale. Per prezzi e disponibilità scrivici: te lo prepariamo
            noi.
          </p>

          <BtnLink href="/contatti" className="btn btn-primary">
            Scrivici per il kit
          </BtnLink>
        </div>
      </div>
    </section>
  );
}
