/**
 * Seeds the Sanity dataset with Montra Studio's placeholder content from
 * `data/montra.ts`.
 *
 * Usage:
 *   1. Create a write token (role: Editor) at
 *      https://www.sanity.io/manage/project/<project-id>/api/tokens
 *   2. Put it in .env.local as SANITY_API_WRITE_TOKEN
 *   3. npm run seed
 *
 * The script is idempotent for documents (createOrReplace with stable _ids).
 * Image assets are de-duplicated within a run and re-used by filename across
 * runs, so re-seeding will not pile up duplicate uploads.
 */
import { readFile } from "node:fs/promises";
import { basename, join } from "node:path";

import { createClient } from "@sanity/client";

import {
  aboutPage,
  articles,
  clients,
  contactPage,
  homePage,
  pricingPage,
  pricingPlans,
  projects,
  services,
  siteConfig,
  team,
  testimonials,
} from "../data/montra.ts";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing env. Need NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-10-01",
  useCdn: false,
});

const ROOT = join(import.meta.dirname, "..");
const assetCache = new Map<string, Promise<string | null>>();
const existingAssets = new Map<string, string>();

async function primeExistingAssets() {
  const rows: { _id: string; originalFilename: string | null }[] = await client.fetch(
    `*[_type == "sanity.imageAsset"]{ _id, originalFilename }`,
  );
  for (const row of rows) {
    if (row.originalFilename) existingAssets.set(row.originalFilename, row._id);
  }
}

function uploadImage(publicPath?: string): Promise<string | null> {
  if (!publicPath) return Promise.resolve(null);
  const filename = basename(publicPath);
  const cached = assetCache.get(publicPath);
  if (cached) return cached;

  const task = (async () => {
    const reused = existingAssets.get(filename);
    if (reused) return reused;
    let buffer: Buffer;
    try {
      buffer = await readFile(join(ROOT, "public", publicPath.replace(/^\//, "")));
    } catch {
      console.warn(`  ! skipping missing asset ${publicPath}`);
      return null;
    }
    const asset = await client.assets.upload("image", buffer, { filename });
    existingAssets.set(filename, asset._id);
    return asset._id;
  })();

  assetCache.set(publicPath, task);
  return task;
}

async function imageRef(publicPath?: string) {
  const ref = await uploadImage(publicPath);
  if (!ref) return undefined;
  return { _type: "image" as const, asset: { _type: "reference" as const, _ref: ref } };
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toBlocks(text?: string) {
  if (!text) return undefined;
  return text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => ({
      _type: "block" as const,
      _key: slugify(paragraph.slice(0, 40)) || Math.random().toString(36).slice(2),
      style: "normal" as const,
      children: [
        {
          _type: "span" as const,
          _key: `${slugify(paragraph.slice(0, 20)) || "span"}-0`,
          text: paragraph,
        },
      ],
    }));
}

function keyed<T extends Record<string, unknown>>(items: T[]) {
  return items.map((item, i) => ({ _key: `item-${i}`, ...item }));
}

async function buildDocuments() {
  const docs: Record<string, unknown>[] = [];

  // --- Site settings (singleton) ---
  docs.push({
    _id: "siteSettings",
    _type: "siteSettings",
    name: siteConfig.name,
    tagline: siteConfig.tagline,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: await imageRef(siteConfig.logo),
    ctaLabel: siteConfig.ctaLabel,
    ctaHref: siteConfig.ctaHref,
    circleLogoText: siteConfig.circleLogoText,
    footerHeading: siteConfig.footerHeading,
    footerCopyright: siteConfig.footerCopyright,
    newsletter: siteConfig.newsletter,
    nav: siteConfig.nav.map((n, i) => ({ _key: `nav-${i}`, _type: "navLink", ...n })),
    email: siteConfig.email,
    contact: siteConfig.contact,
    social: siteConfig.social,
    ctaBanner: siteConfig.ctaBanner,
    trustSection: {
      heading: siteConfig.trustSection.heading,
      points: keyed(siteConfig.trustSection.points),
    },
    trustStat: siteConfig.trustStat,
    highlightCta: siteConfig.highlightCta,
  });

  // --- Home page (singleton) ---
  docs.push({
    _id: "homePage",
    _type: "homePage",
    hero: homePage.hero,
    coreServices: {
      heading: homePage.coreServices.heading,
      intro: homePage.coreServices.intro,
      image: await imageRef(homePage.coreServices.image),
      items: keyed(homePage.coreServices.items),
    },
  });

  // --- About page (singleton) ---
  docs.push({
    _id: "aboutPage",
    _type: "aboutPage",
    tagline: aboutPage.tagline,
    heroStatement: aboutPage.heroStatement,
    secondaryStatement: aboutPage.secondaryStatement,
    stats: keyed(aboutPage.stats),
  });

  // --- Contact page (singleton) ---
  docs.push({
    _id: "contactPage",
    _type: "contactPage",
    heading: contactPage.heading,
    body: contactPage.body,
    faqs: keyed(contactPage.faqs),
  });

  // --- Pricing page (singleton) ---
  docs.push({
    _id: "pricingPage",
    _type: "pricingPage",
    heading: pricingPage.heading,
    body: pricingPage.body,
    faqs: keyed(pricingPage.faqs),
  });

  // --- Services ---
  for (const s of services) {
    docs.push({
      _id: `service-${s.slug}`,
      _type: "service",
      title: s.title,
      slug: { _type: "slug", current: s.slug },
      shortDescription: s.shortDescription,
      tags: s.tags,
      heroVideoId: s.heroVideoId,
      intro: toBlocks(s.intro),
      whatsIncluded: s.whatsIncluded ? keyed(s.whatsIncluded) : undefined,
      whyChooseUs: s.whyChooseUs
        ? { body: s.whyChooseUs.body, bullets: s.whyChooseUs.bullets, image: await imageRef(s.whyChooseUs.image) }
        : undefined,
      idealFor: s.idealFor ? { items: s.idealFor.items, image: await imageRef(s.idealFor.image) } : undefined,
      order: s.order,
    });
  }

  // --- Projects ---
  for (const p of projects) {
    docs.push({
      _id: `project-${p.slug}`,
      _type: "project",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      coverImage: await imageRef(p.coverImage),
      tags: p.tags,
      workBlurb: p.workBlurb,
      heroVideoId: p.heroVideoId,
      client: p.client,
      category: p.category,
      location: p.location,
      duration: p.duration,
      deliveryFormat: p.deliveryFormat,
      roleItems: p.roleItems,
      about: toBlocks(p.about),
      behindTheScenes: toBlocks(p.behindTheScenes),
      creativeDirection: toBlocks(p.creativeDirection),
      results: p.results ? keyed(p.results) : undefined,
      gallery: p.gallery ? await Promise.all(p.gallery.map(async (src) => await imageRef(src))) : undefined,
      featured: p.featured,
      order: p.order,
    });
  }

  // --- Team ---
  for (const m of team) {
    docs.push({
      _id: `team-${slugify(m.name)}`,
      _type: "teamMember",
      name: m.name,
      role: m.role,
      photo: await imageRef(m.photo),
      socials: m.socials,
      order: m.order,
    });
  }

  // --- Clients ---
  for (const c of clients) {
    docs.push({
      _id: `client-${c.id}`,
      _type: "client",
      name: c.name,
      slug: { _type: "slug", current: c.id },
      logo: await imageRef(c.logo),
      width: c.width,
      height: c.height,
      order: c.order,
    });
  }

  // --- Testimonials ---
  for (const t of testimonials) {
    docs.push({
      _id: `testimonial-${slugify(t.name)}`,
      _type: "testimonial",
      quote: t.quote,
      name: t.name,
      role: t.role,
      avatar: await imageRef(t.avatar),
      order: t.order,
    });
  }

  // --- Pricing plans ---
  for (const p of pricingPlans) {
    docs.push({
      _id: `pricingPlan-${slugify(p.name)}`,
      _type: "pricingPlan",
      name: p.name,
      price: p.price,
      billingLabel: p.billingLabel,
      description: p.description,
      features: p.features,
      highlighted: p.highlighted,
      ctaLabel: p.ctaLabel,
      order: p.order,
    });
  }

  // --- Articles (blog) ---
  for (const a of articles) {
    docs.push({
      _id: `article-${a.slug}`,
      _type: "article",
      title: a.title,
      slug: { _type: "slug", current: a.slug },
      excerpt: a.excerpt,
      category: a.category,
      tags: a.tags,
      publishedAt: new Date("2025-07-19").toISOString(),
      date: a.date,
      readTime: a.readTime,
      image: await imageRef(a.image),
      body: toBlocks(a.body),
    });
  }

  return docs;
}

async function main() {
  console.log(`Seeding ${projectId}/${dataset} ...`);
  await primeExistingAssets();
  const docs = await buildDocuments();

  const tx = client.transaction();
  for (const doc of docs) tx.createOrReplace(doc as never);
  await tx.commit();

  console.log(`Done. Wrote ${docs.length} documents.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
