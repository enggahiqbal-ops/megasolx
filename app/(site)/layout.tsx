import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
import FooterReveal from "@/components/FooterReveal/FooterReveal";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import Cursor from "@/components/Cursor/Cursor";
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
    <SmoothScroll>
      <Navigation
        nav={settings?.nav ?? []}
        expertiseMenu={settings?.expertiseMenu ?? []}
      />
      <FooterReveal footer={<Footer settings={settings} />}>
        {children}
      </FooterReveal>
      <Cursor />
      <SanityLive />
      {isDraft && (
        <>
          <VisualEditing />
          <DisableDraftMode />
        </>
      )}
    </SmoothScroll>
  );
}
