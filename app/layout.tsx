import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "./fonts";
import { Providers } from "./providers";
import { SITE } from "@/constants/site";

const SITE_DESCRIPTION =
  "Una squadra di ciclismo nata a Teramo. Un gruppo di amici uniti dalla passione per la bici.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Una squadra di amici`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE.name} — Una squadra di amici`,
    description: SITE_DESCRIPTION,
    locale: "it_IT",
    type: "website",
    siteName: SITE.name,
  },
  icons: { icon: SITE.logos.badge },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={fontVariables} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
