import { defineQuery } from "next-sanity";

const imageUrl = `"image": image.asset->url`;

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    name,
    tagline,
    description,
    url,
    "logo": logo.asset->url,
    ctaLabel,
    ctaHref,
    footerCopyright,
    footerHeading,
    newsletter,
    nav[]{ label, href },
    email,
    contact,
    social,
    ctaBanner,
    trustSection,
    trustStat,
    highlightCta
  }
`);

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0]{
    hero,
    coreServices
  }
`);

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage"][0]{
    tagline,
    heroStatement,
    secondaryStatement,
    statsHeading,
    stats
  }
`);

export const CONTACT_PAGE_QUERY = defineQuery(`
  *[_type == "contactPage"][0]{
    heading,
    body,
    faqs
  }
`);

export const PRICING_PAGE_QUERY = defineQuery(`
  *[_type == "pricingPage"][0]{
    heading,
    body,
    faqs
  }
`);

export const TEAM_QUERY = defineQuery(`
  *[_type == "teamMember"]|order(order asc){
    name,
    role,
    "photo": photo.asset->url,
    socials
  }
`);

export const CLIENTS_QUERY = defineQuery(`
  *[_type == "client"]|order(order asc){
    "id": slug.current,
    name,
    "logo": logo.asset->url,
    width,
    height
  }
`);

export const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial"]|order(order asc){
    quote,
    name,
    role,
    "avatar": avatar.asset->url
  }
`);

export const PRICING_PLANS_QUERY = defineQuery(`
  *[_type == "pricingPlan"]|order(order asc){
    name,
    price,
    billingLabel,
    description,
    features,
    highlighted,
    ctaLabel
  }
`);

const projectFields = `
  "slug": slug.current,
  title,
  tags,
  "coverImage": coverImage.asset->url,
  workBlurb,
  heroVideoId,
  featured,
  order
`;

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"]|order(order asc){ ${projectFields} }
`);

export const FEATURED_PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && featured == true]|order(order asc){ ${projectFields} }
`);

export const PROJECT_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    ${projectFields},
    client,
    category,
    location,
    duration,
    deliveryFormat,
    roleItems,
    about[]{ ..., _type == "image" => { ..., "url": asset->url } },
    behindTheScenes[]{ ..., _type == "image" => { ..., "url": asset->url } },
    creativeDirection[]{ ..., _type == "image" => { ..., "url": asset->url } },
    results,
    gallery[]{ ..., "url": asset->url }
  }
`);

export const PROJECT_SLUGS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)]{ "slug": slug.current }
`);

const serviceFields = `
  "slug": slug.current,
  title,
  shortDescription,
  tags,
  heroVideoId,
  order
`;

export const SERVICES_QUERY = defineQuery(`
  *[_type == "service"]|order(order asc){ ${serviceFields} }
`);

export const SERVICE_QUERY = defineQuery(`
  *[_type == "service" && slug.current == $slug][0]{
    ${serviceFields},
    intro[]{ ..., _type == "image" => { ..., "url": asset->url } },
    whatsIncluded,
    whyChooseUs{ body, bullets, "image": image.asset->url },
    idealFor{ items, "image": image.asset->url }
  }
`);

export const SERVICE_SLUGS_QUERY = defineQuery(`
  *[_type == "service" && defined(slug.current)]{ "slug": slug.current }
`);

const articleFields = `
  "slug": slug.current,
  title,
  excerpt,
  category,
  tags,
  date,
  readTime,
  publishedAt,
  "author": author->{ name, "avatar": avatar.asset->url },
  ${imageUrl}
`;

export const ARTICLES_QUERY = defineQuery(`
  *[_type == "article"]|order(publishedAt desc){ ${articleFields} }
`);

export const ARTICLE_QUERY = defineQuery(`
  *[_type == "article" && slug.current == $slug][0]{
    ${articleFields},
    body[]{
      ...,
      _type == "image" => { ..., "url": asset->url }
    }
  }
`);

export const ARTICLE_SLUGS_QUERY = defineQuery(`
  *[_type == "article" && defined(slug.current)]{ "slug": slug.current }
`);
