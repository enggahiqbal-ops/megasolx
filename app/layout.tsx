import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "@/styles/globals.css";
import { sanityFetch } from "@/sanity/lib/live";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: SETTINGS_QUERY,
    stega: false,
  });

  const name = settings?.name ?? "MEGASOLX";
  const tagline = settings?.tagline ?? "Extraordinary Digital Experiences";
  const description =
    settings?.description ??
    "We design, build and ship world-class digital products for forward-thinking brands.";
  const url = settings?.url ?? "https://example.com";

  return {
    title: { default: `${name} | ${tagline}`, template: `%s | ${name}` },
    description,
    metadataBase: new URL(url),
    openGraph: {
      title: name,
      description,
      url,
      siteName: name,
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
