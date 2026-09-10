import { defineLive } from "next-sanity/live";

import { client } from "@/sanity/lib/client";

const token = process.env.SANITY_API_READ_TOKEN;

/**
 * `sanityFetch` + `<SanityLive />` connect the app to Sanity's Live Content API,
 * so published pages refresh on content changes and — with draft mode on — the
 * Presentation tool can drive live visual editing.
 *
 * The read token is optional: without it published content still goes live, but
 * draft previews from the Studio will not resolve.
 */
const live = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});

export const SanityLive = live.SanityLive;

type FetchResult = Awaited<ReturnType<typeof live.sanityFetch>>;

/**
 * Wrap `sanityFetch` so a transient network failure (DNS blip, offline, Sanity
 * hiccup) degrades to `{ data: null }` and the page renders its fallbacks
 * instead of throwing a runtime error. Every consumer already handles null.
 */
export const sanityFetch = (async (options: Parameters<typeof live.sanityFetch>[0]) => {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      return await live.sanityFetch(options);
    } catch (err) {
      if (attempt === 1) {
        await new Promise((r) => setTimeout(r, 400));
        continue;
      }
      console.warn(
        "[sanity] query failed, rendering fallback content:",
        err instanceof Error ? err.message : err,
      );
      return { data: null } as FetchResult;
    }
  }
  return { data: null } as FetchResult;
}) as typeof live.sanityFetch;
