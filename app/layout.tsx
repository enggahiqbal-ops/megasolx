import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "@/styles/globals.css";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
import FooterReveal from "@/components/FooterReveal/FooterReveal";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import Cursor from "@/components/Cursor/Cursor";
import { siteConfig } from "@/data/site";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full`}>
      <body className="min-h-full antialiased">
        <SmoothScroll>
          <Navigation />
          <FooterReveal footer={<Footer />}>{children}</FooterReveal>
          <Cursor />
        </SmoothScroll>
      </body>
    </html>
  );
}
