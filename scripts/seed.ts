/**
 * Seeds the Sanity dataset from the local `data/*.ts` sample content.
 *
 * Usage:
 *   1. Create a write token (role: Editor) at
 *      https://www.sanity.io/manage/project/cxr8q1di/api/tokens
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

import { articles } from "../data/articles.ts";
import { clients } from "../data/clients.ts";
import { expertiseList, expertiseNav } from "../data/expertise.ts";
import { projects, workCategories } from "../data/projects.ts";
import { services } from "../data/services.ts";
import { siteConfig } from "../data/site.ts";

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
  const rows: { _id: string; originalFilename: string | null }[] =
    await client.fetch(`*[_type == "sanity.imageAsset"]{ _id, originalFilename }`);
  for (const row of rows) {
    if (row.originalFilename) existingAssets.set(row.originalFilename, row._id);
  }
}

function uploadImage(publicPath: string): Promise<string | null> {
  const filename = basename(publicPath);
  const cached = assetCache.get(publicPath);
  if (cached) return cached;

  const task = (async () => {
    const reused = existingAssets.get(filename);
    if (reused) return reused;
    let buffer: Buffer;
    try {
      buffer = await readFile(
        join(ROOT, "public", publicPath.replace(/^\//, "")),
      );
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

async function imageRef(publicPath: string) {
  const ref = await uploadImage(publicPath);
  if (!ref) return undefined;
  return {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: ref },
  };
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function buildDocuments() {
  const docs: Record<string, unknown>[] = [];

  // --- Authors (derived from articles) ---
  const authorByName = new Map<string, string>();
  for (const article of articles) {
    if (authorByName.has(article.author.name)) continue;
    const id = `author-${slugify(article.author.name)}`;
    authorByName.set(article.author.name, id);
    docs.push({
      _id: id,
      _type: "author",
      name: article.author.name,
      avatar: await imageRef(article.author.avatar),
    });
  }

  // --- Projects ---
  for (const [i, p] of projects.entries()) {
    docs.push({
      _id: `project-${p.slug}`,
      _type: "project",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      category: p.category,
      year: p.year,
      layout: p.layout,
      aspectRatio: p.aspectRatio,
      image: await imageRef(p.image),
      description: p.description,
      tags: p.tags,
      featured: Boolean(p.featured),
      textColor: p.textColor ?? "white",
      order: (i + 1) * 10,
    });
  }

  // --- Articles ---
  for (const [i, a] of articles.entries()) {
    const parsed = new Date(a.date);
    const publishedAt = Number.isNaN(parsed.getTime())
      ? new Date(Date.now() - i * 86_400_000).toISOString()
      : parsed.toISOString();
    docs.push({
      _id: `article-${a.slug}`,
      _type: "article",
      title: a.title,
      slug: { _type: "slug", current: a.slug },
      excerpt: a.excerpt,
      category: a.category,
      date: a.date,
      readTime: a.readTime,
      publishedAt,
      author: {
        _type: "reference",
        _ref: authorByName.get(a.author.name),
      },
      image: await imageRef(a.image),
    });
  }

  // --- Expertise ---
  for (const [i, e] of expertiseList.entries()) {
    docs.push({
      _id: `expertise-${e.slug}`,
      _type: "expertise",
      title: e.title,
      slug: { _type: "slug", current: e.slug },
      subtitle: e.subtitle,
      description: e.description,
      features: e.features.map((f) => ({
        _key: slugify(f.title),
        title: f.title,
        description: f.description,
      })),
      image: await imageRef(e.image),
      order: (i + 1) * 10,
      ...(e.relatedSlug
        ? { related: { _type: "reference", _ref: `expertise-${e.relatedSlug}` } }
        : {}),
    });
  }

  // --- Clients ---
  for (const [i, c] of clients.entries()) {
    docs.push({
      _id: `client-${c.id}`,
      _type: "client",
      name: c.name,
      slug: { _type: "slug", current: c.id },
      logo: await imageRef(c.logo),
      width: c.width,
      height: c.height,
      order: (i + 1) * 10,
    });
  }

  // --- Services ---
  for (const [i, s] of services.entries()) {
    docs.push({
      _id: `service-${slugify(s.title)}`,
      _type: "service",
      title: s.title,
      items: s.items,
      order: (i + 1) * 10,
    });
  }

  // --- Site settings (singleton) ---
  docs.push({
    _id: "siteSettings",
    _type: "siteSettings",
    name: siteConfig.name,
    tagline: siteConfig.tagline,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    introStatement: siteConfig.introStatement,
    aboutHeading: siteConfig.aboutHeading,
    aboutCopy: siteConfig.aboutCopy,
    aboutImage: await imageRef("/images/about-teaser.svg"),
    aboutLink: siteConfig.aboutLink,
    stats: siteConfig.stats.map((s) => ({ _key: slugify(s.label), ...s })),
    footerCtaLine1: siteConfig.footer.ctaLine1,
    footerCtaLine2: siteConfig.footer.ctaLine2,
    footerTickerWords: siteConfig.footer.tickerWords,
    footerCopyright: siteConfig.footer.copyright,
    nav: siteConfig.nav.map((n, i) => ({
      _key: `nav-${i}`,
      _type: "navLink",
      ...n,
    })),
    workCategories: workCategories.map((c) => ({ _key: c.slug, ...c })),
    expertiseMenu: expertiseNav.groups.map((g) => ({
      _key: slugify(g.heading),
      _type: "expertiseGroup",
      heading: g.heading,
      links: g.links.map((l, i) => ({
        _key: `${slugify(g.heading)}-${i}`,
        _type: "navLink",
        ...l,
      })),
    })),
    locations: siteConfig.locations.map((l) => ({ _key: slugify(l.city), ...l })),
    social: siteConfig.social,
  });

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
