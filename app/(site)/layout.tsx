import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import DisableDraftMode from "@/components/DraftMode/DisableDraftMode";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraft } = await draftMode();
  const { data: settings } = await sanityFetch({
    query: SETTINGS_QUERY,
    stega: false,
  });

  return (
    <>
      <Header settings={settings} />
      {children}
      <Footer settings={settings} />
      <SanityLive />
      {isDraft && (
        <>
          <VisualEditing />
          <DisableDraftMode />
        </>
      )}
    </>
  );
}
