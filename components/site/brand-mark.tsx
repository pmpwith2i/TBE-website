import { BRAND_LOCKUP } from "@/constants/site";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "mb-4 font-display text-4xl font-black italic uppercase leading-[0.9]",
        className
      )}
    >
      {BRAND_LOCKUP.map((word, i) => (
        <div
          key={word}
          className={i === 1 ? "inline-block border-b-[3px] border-accent" : undefined}
        >
          {word}
        </div>
      ))}
    </div>
  );
}
