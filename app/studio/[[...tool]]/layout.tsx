/**
 * The Studio route renders outside the marketing site's `(site)` layout, so it
 * gets no global navigation, smooth-scroll, or cursor — just the Studio.
 */
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
