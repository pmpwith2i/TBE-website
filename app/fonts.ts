import { Barlow_Condensed, Space_Grotesk, JetBrains_Mono } from "next/font/google";

/**
 * Display face — bold, condensed, italic. Drives every heading / logotype.
 * Matches the original `--font-display: "Barlow Condensed"` stack.
 */
export const fontDisplay = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-barlow",
  display: "swap",
});

/** Body face — `--font-body: "Space Grotesk"`. */
export const fontBody = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

/** Mono face — labels, captions, data — `--font-mono: "JetBrains Mono"`. */
export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const fontVariables = `${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`;
