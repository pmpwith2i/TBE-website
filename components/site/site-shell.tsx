import type { ReactNode } from "react";
import { Nav } from "./nav";
import { Footer } from "./footer";
import { cn } from "@/lib/utils";

/**
 * Wraps a page in the TBE design context and shared chrome.
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
    <div
      className={cn(
        "min-h-screen overflow-x-clip font-body text-[17px] leading-[1.55] antialiased [text-rendering:optimizeLegibility] [&_img]:block [&_img]:max-w-full",
        theme === "dark"
          ? "bg-tbe-black text-tbe-paper"
          : "bg-tbe-paper text-tbe-black"
      )}
    >
      <Nav variant={navVariant} />
      {children}
      <Footer />
    </div>
  );
}
