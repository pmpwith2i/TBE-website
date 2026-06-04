import Image from "next/image";
import { BtnLink } from "@/components/site/buttons";

const GLASS_BTN: React.CSSProperties = {
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  color: "white",
  border: "1px solid rgba(255,255,255,0.3)",
};

export function HomeHero() {
  return (
    <header className="hero">
      <div className="hero-bg">
        <Image
          src="/assets/sunset-rider.jpg"
          alt="Ciclista TBE al tramonto sulle colline di Teramo"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="hero-vignette" />

      <div className="hero-meta">
        <span>Stagione 2026</span>
        <span className="big">42°39&apos;N 13°42&apos;E</span>
      </div>

      <div className="hero-inner">
        <div
          className="eyebrow"
          style={{ color: "rgba(255,255,255,0.7)", marginBottom: 28 }}
        >
          <span className="num">/01</span> Teramo · Italia
        </div>

        <h1>
          Una squadra
          <br />
          <span className="accent">di amici,</span>
          <br />
          <span className="outline">a Teramo.</span>
        </h1>

        <div className="hero-sub">
          <p>
            Una squadra di ciclismo nata a Teramo, ai piedi del Gran Sasso. Un
            gruppo di amici uniti dalla passione per la bici: usciamo insieme
            ogni settimana e ogni tanto partecipiamo a qualche gara. Dal mare
            alla montagna in un&apos;ora di pedalata.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <BtnLink href="/vision" className="btn btn-primary">
              Scopri la nostra Vision
            </BtnLink>
            <BtnLink href="/team" className="btn" arrow={false} style={GLASS_BTN}>
              Conosci il team
            </BtnLink>
          </div>
        </div>
      </div>

      <div className="scroll-cue">
        <span>Scroll</span>
        <span className="line" />
      </div>
    </header>
  );
}
