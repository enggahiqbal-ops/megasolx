import { defineQuery } from "next-sanity";

const imageUrl = `"image": image.asset->url`;

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    name,
    tagline,
    description,
    url,
    introStatement,
    aboutHeading,
    aboutCopy,
    "aboutImage": aboutImage.asset->url,
    aboutLink,
    stats,
    "footer": {
      "ctaLine1": footerCtaLine1,
      "ctaLine2": footerCtaLine2,
      "tickerWords": footerTickerWords,
      "copyright": footerCopyright
    },
    email,
    locations,
    social,
    nav[]{ label, href },
    workCategories[]{ label, href, slug },
    expertiseMenu[]{ heading, links[]{ label, href } }
  }
`);

const projectFields = `
  "slug": slug.current,
  title,
  category,
  year,
  layout,
  aspectRatio,
  ${imageUrl},
  "video": video.asset->url,
  "poster": poster.asset->url,
  description,
  tags,
  featured,
  textColor
`;

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"]|order(order asc, year desc){ ${projectFields} }
`);

export const FEATURED_PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && featured == true]|order(order asc, year desc){ ${projectFields} }
`);

export const PROJECT_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    ${projectFields},
    body[]{
      ...,
      _type == "image" => { ..., "url": asset->url }
    }
  }
`);

export const PROJECT_SLUGS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)]{ "slug": slug.current }
`);

const articleFields = `
  "slug": slug.current,
  title,
  excerpt,
  category,
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

const expertiseFields = `
  "slug": slug.current,
  title,
  subtitle,
  description,
  features[]{ title, description },
  ${imageUrl},
  "relatedSlug": related->slug.current
`;

export const EXPERTISE_LIST_QUERY = defineQuery(`
  *[_type == "expertise"]|order(order asc){ ${expertiseFields} }
`);

export const EXPERTISE_QUERY = defineQuery(`
  *[_type == "expertise" && slug.current == $slug][0]{ ${expertiseFields} }
`);

export const EXPERTISE_SLUGS_QUERY = defineQuery(`
  *[_type == "expertise" && defined(slug.current)]{ "slug": slug.current }
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

export const SERVICES_QUERY = defineQuery(`
  *[_type == "service"]|order(order asc){ title, items }
`);
