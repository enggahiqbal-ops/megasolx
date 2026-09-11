"use client";

import { useIsPresentationTool } from "next-sanity/hooks";

/**
 * "Exit preview" badge shown while draft mode is on for a standalone browser
 * session. Hidden inside the Studio's Presentation iframe, which has its own
 * controls.
 */
export default function DisableDraftMode() {
  const isPresentation = useIsPresentationTool();

  if (isPresentation !== false) {
    return null;
  }

  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-4 left-4 z-[300] rounded-full bg-[var(--color-secondary)] px-4 py-2 text-xs font-medium text-white shadow-lg"
    >
      Exit preview
    </a>
  );
}
