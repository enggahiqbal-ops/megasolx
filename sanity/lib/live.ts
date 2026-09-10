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
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});
