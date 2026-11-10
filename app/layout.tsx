import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { ConsentDefaults, ConsentManager } from "@/components/Consent";
import { JsonLd } from "@/components/JsonLd";
import { orgLd } from "@/lib/seo";
import { site } from "@/content/site";

const display = Montserrat({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Local Lion | Websites, Local SEO & Google Ads for UK Trades", template: "%s | Local Lion" },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: { siteName: site.name, locale: "en_GB", type: "website" },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/brand/logo-mark.svg" },
};

export const viewport: Viewport = { themeColor: "#FAF8F4", colorScheme: "light" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${sans.variable}`}>
      <head>
        <ConsentDefaults />
      </head>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
        <ConsentManager />
        <JsonLd data={orgLd} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
