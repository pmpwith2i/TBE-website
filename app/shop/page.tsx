import type { Metadata } from "next";
import { SiteShell } from "@/components/site/site-shell";
import { Eyebrow } from "@/components/site/section-label";
import { DisplayTitle } from "@/components/site/display-title";
import { FeaturedKit } from "@/components/shop/featured-kit";
import { SHOP_HERO, SHOP_INFO } from "@/constants/shop";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <SiteShell
      theme="light"
      navVariant="transparent"
      invertLogo={false}
      navCart
    >
      {/* HERO */}
      <section className="shop-hero">
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
            opacity: 0.08,
            lineHeight: 0.7,
            letterSpacing: "-0.02em",
            pointerEvents: "none",
          }}
        >
          {SHOP_HERO.watermark}
        </div>
        <div className="container" style={{ position: "relative" }}>
          <Eyebrow num={SHOP_HERO.eyebrowNum} style={{ marginBottom: 32 }}>
            {SHOP_HERO.eyebrowText}
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
            <DisplayTitle
              as="h1"
              lines={SHOP_HERO.titleLines}
              className="display"
              style={{ fontSize: "clamp(40px, 6.5vw, 96px)", lineHeight: 0.9 }}
            />
            <p className="lede">
              {SHOP_HERO.leadBefore}
              <strong>{SHOP_HERO.leadStrong}</strong>
            </p>
          </div>
        </div>
      </section>

      <FeaturedKit />

      {/* INFO STRIP */}
      <section
        style={{
          background: "var(--tbe-bone)",
          padding: "56px var(--gutter)",
          borderBlock: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div className="container">
          <div className="grid-3" style={{ gap: 32 }}>
            {SHOP_INFO.map((info) => (
              <div key={info.icon}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontWeight: 900,
                    fontSize: 32,
                    color: "var(--accent)",
                    marginBottom: 8,
                  }}
                >
                  {info.icon}
                </div>
                <div className="caption">{info.title}</div>
                <p
                  style={{
                    fontSize: 14,
                    marginTop: 8,
                    color: "var(--tbe-smoke)",
                  }}
                >
                  {info.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
