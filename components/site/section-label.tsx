import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  light = false,
  className,
}: {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-[18px] flex items-baseline gap-3.5 font-mono text-xs uppercase tracking-[0.22em] text-tbe-smoke",
        light && "text-white/70",
        className
      )}
    >
      <span className="-translate-y-[3px] h-0.5 w-16 shrink-0 bg-accent" />
      <span>{children}</span>
    </div>
  );
}

export function Eyebrow({
  num,
  children,
  light = false,
  className,
}: {
  num?: string;
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.22em] text-tbe-smoke before:h-px before:w-8 before:bg-accent before:content-['']",
        light && "text-white/70",
        className
      )}
    >
      {num ? <span className="font-bold text-accent">{num}</span> : null}
      {children}
    </div>
  );
}
