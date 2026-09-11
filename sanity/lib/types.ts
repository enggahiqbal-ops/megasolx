/**
 * App-facing content types, derived from the generated GROQ result types in
 * `sanity.types.ts` (run `npm run typegen` after changing a schema or query).
 */
import type {
  ARTICLES_QUERY_RESULT,
  CLIENTS_QUERY_RESULT,
  EXPERTISE_LIST_QUERY_RESULT,
  PROJECTS_QUERY_RESULT,
  SETTINGS_QUERY_RESULT,
} from "@/sanity.types";

export type SiteSettings = NonNullable<SETTINGS_QUERY_RESULT>;
export type NavLink = NonNullable<SiteSettings["nav"]>[number];
export type ExpertiseMenuGroup = NonNullable<SiteSettings["expertiseMenu"]>[number];

export type Project = PROJECTS_QUERY_RESULT[number];
export type Article = ARTICLES_QUERY_RESULT[number];
export type ClientLogo = CLIENTS_QUERY_RESULT[number];
export type Expertise = EXPERTISE_LIST_QUERY_RESULT[number];
export type ServiceGroup = { title: string; items: string[] };
