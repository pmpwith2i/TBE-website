"use client";

import Image from "next/image";
import { DisplayTitle } from "@/components/site/display-title";
import { FEATURED_KIT } from "@/constants/shop";
import { useCart } from "@/lib/cart";

export function FeaturedKit() {
  const { add } = useCart();

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
            src={FEATURED_KIT.image}
            alt={FEATURED_KIT.imageAlt}
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
            {FEATURED_KIT.badges.map((badge, i) => (
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

          <DisplayTitle
            lines={FEATURED_KIT.titleLines}
            className="display"
            style={{
              fontSize: "clamp(56px, 9vw, 130px)",
              lineHeight: 0.82,
              marginBottom: 24,
            }}
          />

          <p className="lede" style={{ opacity: 0.85, marginBottom: 32 }}>
            {FEATURED_KIT.lead}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
              padding: "24px 0",
              borderBlock: "1px solid rgba(255,255,255,0.15)",
              marginBottom: 32,
            }}
          >
            {FEATURED_KIT.stats.map((s) => (
              <div key={s.label}>
                <div className="caption" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {s.label}
                </div>
                {s.small ? (
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 14,
                      letterSpacing: "0.1em",
                      marginTop: 14,
                    }}
                  >
                    {s.value}
                  </div>
                ) : (
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      fontWeight: 900,
                      fontSize: 36,
                      color: s.accent ? "var(--accent)" : undefined,
                    }}
                  >
                    {s.value}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            className="btn btn-primary"
            style={{ alignSelf: "flex-start" }}
            onClick={() => add(FEATURED_KIT.cartItem)}
          >
            {FEATURED_KIT.cta}{" "}
            <span className="arrow" aria-hidden>
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
