/**
 * App-facing content types, derived from the generated GROQ result types in
 * `sanity.types.ts` (run `npm run typegen` after changing a schema or query).
 */
import type {
  ABOUT_PAGE_QUERY_RESULT,
  ARTICLES_QUERY_RESULT,
  ARTICLE_QUERY_RESULT,
  CLIENTS_QUERY_RESULT,
  CONTACT_PAGE_QUERY_RESULT,
  HOME_PAGE_QUERY_RESULT,
  PRICING_PAGE_QUERY_RESULT,
  PRICING_PLANS_QUERY_RESULT,
  PROJECTS_QUERY_RESULT,
  PROJECT_QUERY_RESULT,
  SERVICES_QUERY_RESULT,
  SERVICE_QUERY_RESULT,
  SETTINGS_QUERY_RESULT,
  TEAM_QUERY_RESULT,
  TESTIMONIALS_QUERY_RESULT,
} from "@/sanity.types";

export type SiteSettings = NonNullable<SETTINGS_QUERY_RESULT>;
export type NavLink = NonNullable<SiteSettings["nav"]>[number];

export type HomePage = NonNullable<HOME_PAGE_QUERY_RESULT>;
export type AboutPage = NonNullable<ABOUT_PAGE_QUERY_RESULT>;
export type ContactPage = NonNullable<CONTACT_PAGE_QUERY_RESULT>;
export type PricingPage = NonNullable<PRICING_PAGE_QUERY_RESULT>;

export type TeamMember = TEAM_QUERY_RESULT[number];
export type ClientLogo = CLIENTS_QUERY_RESULT[number];
export type Testimonial = TESTIMONIALS_QUERY_RESULT[number];
export type PricingPlan = PRICING_PLANS_QUERY_RESULT[number];

export type Project = PROJECTS_QUERY_RESULT[number];
export type ProjectDetail = NonNullable<PROJECT_QUERY_RESULT>;

export type Service = SERVICES_QUERY_RESULT[number];
export type ServiceDetail = NonNullable<SERVICE_QUERY_RESULT>;

export type Article = ARTICLES_QUERY_RESULT[number];
export type ArticleDetail = NonNullable<ARTICLE_QUERY_RESULT>;
