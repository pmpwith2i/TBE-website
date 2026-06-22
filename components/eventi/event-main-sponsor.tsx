import Image from "next/image";
import type { EventSponsor } from "@/constants/events";
import { cn } from "@/lib/utils";

type EventMainSponsorProps = {
  sponsor: EventSponsor;
  variant?: "featured" | "compact";
  className?: string;
};

export function EventMainSponsor({
  sponsor,
  variant = "featured",
  className,
}: EventMainSponsorProps) {
  const isCompact = variant === "compact";

  return (
    <div
      className={cn(
        "inline-flex max-w-full items-center gap-3 bg-white px-4 py-3 text-tbe-black shadow-[0_18px_44px_-34px_rgba(0,0,0,0.65)]",
        isCompact ? "px-3 py-2" : "border border-white/20",
        className,
      )}
      aria-label={`Main sponsor: ${sponsor.name}`}
    >
      <Image
        src={sponsor.logo}
        alt={sponsor.logoAlt}
        width={sponsor.logoSize.width}
        height={sponsor.logoSize.height}
        sizes={isCompact ? "130px" : "(max-width: 800px) 56vw, 260px"}
        className={cn(
          "h-auto object-contain",
          isCompact ? "w-[130px]" : "w-[clamp(170px,22vw,260px)]",
        )}
      />
    </div>
  );
}
