import { ALL_SPONSORS } from "@/constants/sponsors";

function Run({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex items-center" aria-hidden={hidden || undefined}>
      {ALL_SPONSORS.map((s, i) => (
        <span
          className="inline-flex items-baseline gap-2.5 whitespace-nowrap px-[clamp(28px,4vw,52px)] text-tbe-graphite opacity-70 transition hover:text-accent hover:opacity-100"
          key={i}
        >
          <strong className="font-display text-[clamp(18px,2.4vw,24px)] font-extrabold italic uppercase tracking-[0.04em]">
            {s.name}
          </strong>
          <small className="font-mono text-[9px] uppercase tracking-[0.16em] opacity-80">
            {s.detail}
          </small>
        </span>
      ))}
    </div>
  );
}

export function SponsorMarquee() {
  return (
    <div className="mt-[clamp(40px,6vw,64px)] max-w-full overflow-hidden border-t border-black/10 py-[22px] [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="flex w-max [animation:marquee_38s_linear_infinite] motion-reduce:animate-none">
        <Run />
        <Run hidden />
      </div>
    </div>
  );
}
