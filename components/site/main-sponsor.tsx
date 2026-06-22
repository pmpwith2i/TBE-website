import Image from "next/image";
import { MAIN_SPONSOR } from "@/constants/sponsors";

export function MainSponsor() {
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
        Main Sponsor
      </span>
      <div className="flex items-center justify-center border border-black/10 bg-white px-[clamp(36px,7vw,72px)] py-[clamp(28px,5vw,48px)] shadow-[0_18px_44px_-30px_rgba(0,0,0,0.5)]">
        {MAIN_SPONSOR.logo ? (
          <Image
            src={MAIN_SPONSOR.logo}
            alt={`${MAIN_SPONSOR.name} — ${MAIN_SPONSOR.detail}`}
            width={510}
            height={167}
            className="h-auto w-[clamp(220px,38vw,340px)]"
          />
        ) : (
          <span className="font-display text-[32px] font-extrabold italic uppercase text-tbe-graphite">
            {MAIN_SPONSOR.name}
          </span>
        )}
      </div>
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-60">
        {MAIN_SPONSOR.name} · {MAIN_SPONSOR.detail}
      </span>
    </div>
  );
}
