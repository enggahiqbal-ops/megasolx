import type { Metadata } from "next";
import "@/styles/globals.css";
import { sanityFetch } from "@/sanity/lib/live";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: SETTINGS_QUERY,
    stega: false,
  });

  const name = settings?.name ?? "Megasolx";
  const tagline = settings?.tagline ?? "Film & Video Production";
  const description =
    settings?.description ??
    "Megasolx is a film and video production agency crafting cinematic stories for brands.";
  const url = settings?.url ?? "https://www.megasolx.com";

  return {
    title: {
      default: `${name} | ${tagline}`,
      template: `%s | ${name}`,
    },
    description,
    metadataBase: new URL(url),
    openGraph: {
      title: `${name} – ${tagline}`,
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
    <html lang="en">
      <body>
        {/*
          Montra theme CSS, in the same load order as the original template's
          _document.js. These are plain <link> tags (not CSS imports) because
          the files are served from /public — React 19 hoists rel="stylesheet"
          links to <head> and dedupes them regardless of where they're rendered.
        */}
        <link rel="stylesheet" href="/assets/montra/css/vendor/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/montra/css/vendor/fontawesome.css" />
        <link rel="stylesheet" href="/assets/montra/css/vendor/solid.css" />
        <link rel="stylesheet" href="/assets/montra/css/vendor/regular.css" />
        <link rel="stylesheet" href="/assets/montra/css/vendor/brands.css" />
        <link rel="stylesheet" href="/assets/montra/css/vendor/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/assets/montra/css/main.css" />
        <link rel="stylesheet" href="/assets/montra/css/responsive.css" />
        {children}
      </body>
    </html>
  );
}
