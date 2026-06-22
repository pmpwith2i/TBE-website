import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "dark" | "light" | "ghost" | "glass";

const BASE_BUTTON =
  "group inline-flex cursor-pointer items-center gap-2.5 border-0 px-8 py-4 font-display text-base font-extrabold italic uppercase tracking-[0.1em] text-tbe-white transition-[background,transform,color] duration-200 [clip-path:polygon(6%_0,100%_0,94%_100%,0_100%)] hover:translate-x-1";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-accent hover:bg-tbe-amber",
  dark: "bg-tbe-black hover:bg-tbe-graphite",
  light: "bg-tbe-white text-tbe-red hover:bg-tbe-paper",
  ghost:
    "border-b-2 border-accent bg-transparent px-0 py-2 text-current [clip-path:none] hover:translate-x-0 hover:text-accent",
  glass:
    "border border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/15",
};

function isInternal(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

export function BtnLink({
  href,
  children,
  className,
  variant = "primary",
  arrow = true,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  arrow?: boolean;
}) {
  const mergedClassName = cn(BASE_BUTTON, VARIANT_CLASSES[variant], className);
  const content = (
    <>
      {children}
      {arrow ? (
        <span
          className="inline-block transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden
        >
          →
        </span>
      ) : null}
    </>
  );

  if (isInternal(href)) {
    return (
      <Link href={href} className={mergedClassName}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={mergedClassName}>
      {content}
    </a>
  );
}

export function ButtonArrow() {
  return (
    <span
      className="inline-block transition-transform duration-200 group-hover:translate-x-1"
      aria-hidden
    >
      →
    </span>
  );
}
