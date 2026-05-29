import type { ReactNode } from "react";
import { Nav } from "./nav";
import { Footer } from "./footer";
import type { NavCta } from "@/constants/site";

/**
 * Wraps a page in the TBE design context: applies the theme to the
 * `.tbe` root (so the bespoke CSS scoping works), renders the fixed nav
 * and the shared footer. Use `theme="dark"` for the dark-bodied pages.
 */
export function SiteShell({
  children,
  theme = "dark",
  navVariant = "solid",
  navCta,
  navCart = false,
  invertLogo = true,
}: {
  children: ReactNode;
  theme?: "dark" | "light";
  navVariant?: "solid" | "transparent";
  navCta?: NavCta;
  navCart?: boolean;
  invertLogo?: boolean;
}) {
  return (
    <div className={theme === "dark" ? "tbe dark" : "tbe"}>
      <Nav
        variant={navVariant}
        cta={navCta}
        cart={navCart}
        invertLogo={invertLogo}
      />
      {children}
      <Footer />
    </div>
  );
}
