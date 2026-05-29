import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "./fonts";
import { Providers } from "./providers";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Pedaliamo l'Abruzzo`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} — Pedaliamo l'Abruzzo`,
    description: SITE.description,
    locale: "it_IT",
    type: "website",
    siteName: SITE.name,
  },
  icons: { icon: SITE.logos.mark },
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
