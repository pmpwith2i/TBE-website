import Image from "next/image";
import Link from "next/link";
import type { AgendaCard as AgendaCardData } from "@/constants/home";

const TAG_BG: Record<AgendaCardData["tagColor"], string | undefined> = {
  red: undefined, // default accent
  amber: "var(--tbe-amber)",
  italian: "var(--tbe-italian)",
};

export function AgendaCard({ card }: { card: AgendaCardData }) {
  return (
    <article className="card">
      <div className="media" style={{ aspectRatio: "4 / 3" }}>
        <span className="tag" style={{ background: TAG_BG[card.tagColor] }}>
          {card.tag}
        </span>
        <Image
          src={card.image}
          alt={card.imageAlt}
          width={1200}
          height={900}
          sizes="(max-width: 900px) 100vw, 33vw"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="card-body">
        <div className="caption">{card.date}</div>
        <h3 className="card-title">
          {card.titleLines.map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </h3>
        <p style={{ color: "var(--tbe-smoke)" }}>{card.text}</p>
        <Link
          href={card.href}
          className="btn-ghost italic uppercase"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            letterSpacing: "0.08em",
            alignSelf: "flex-start",
            marginTop: 8,
          }}
        >
          {card.cta}
        </Link>
      </div>
    </article>
  );
}
