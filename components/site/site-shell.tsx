import type { ReactNode } from "react";
import { Nav } from "./nav";
import { Footer } from "./footer";

/**
 * Wraps a page in the TBE design context: applies the theme to the `.tbe`
 * root (so the bespoke CSS scoping works), renders the fixed nav and the
 * shared footer. Use `navVariant="transparent"` when the nav sits over a
 * full-bleed hero, otherwise it gets a solid dark bar.
 */
export function SiteShell({
  children,
  theme = "dark",
  navVariant = "solid",
}: {
  children: ReactNode;
  theme?: "dark" | "light";
  navVariant?: "solid" | "transparent";
}) {
  return (
    <div className={theme === "dark" ? "tbe dark" : "tbe"}>
      <Nav variant={navVariant} />
      {children}
      <Footer />
    </div>
  );
}
