import { BRAND_LOCKUP } from "@/constants/site";

/**
 * The stacked "Teramo / Bike / Experience" lockup used in the footer,
 * where the middle word carries the red underline bar.
 */
export function BrandMark({ className = "brand-mark" }: { className?: string }) {
  return (
    <div className={className}>
      {BRAND_LOCKUP.map((word, i) => (
        <div key={word} className={i === 1 ? "red-bar" : undefined}>
          {word}
        </div>
      ))}
    </div>
  );
}
