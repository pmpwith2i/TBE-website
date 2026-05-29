import Link from "next/link";
import type { ReactNode } from "react";

function isInternal(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

/**
 * Clip-path action button with the animated arrow, matching `.btn`.
 * Internal hrefs route through next/link; mail/tel/hash use a plain anchor.
 */
export function BtnLink({
  href,
  children,
  className = "btn btn-primary",
  arrow = true,
  style,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  arrow?: boolean;
  style?: React.CSSProperties;
}) {
  const content = (
    <>
      {children}
      {arrow ? (
        <span className="arrow" aria-hidden>
          →
        </span>
      ) : null}
    </>
  );

  if (isInternal(href)) {
    return (
      <Link href={href} className={className} style={style}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={className} style={style}>
      {content}
    </a>
  );
}
