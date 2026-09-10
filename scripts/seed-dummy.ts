/**
 * Generates a fuller set of placeholder content for every page so the site
 * doesn't look empty during development:
 *
 *   - 8 projects (with case-study bodies)      -> /work, /work/[slug], homepage
 *   - 8 articles (with bodies + 3 authors)     -> /thinking, /thinking/[slug]
 *   - 20 expertise entries (every menu item)   -> /expertise/[slug]
 *   - refreshed siteSettings / clients / services
 *
 * Idempotent: stable _ids + createOrReplace, image assets reused by filename.
 *
 * Usage: npm run seed:dummy   (needs SANITY_API_WRITE_TOKEN in .env.local)
 */
import { createClient } from "@sanity/client";

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

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

let keyN = 0;
const key = () => `k${(keyN++).toString(36)}`;

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Very small markdown-ish -> Portable Text. `## x` heading, `> x` quote. */
function body(lines: string[]) {
  return lines.map((line) => {
    let style = "normal";
    let text = line;
    if (line.startsWith("## ")) {
      style = "h2";
      text = line.slice(3);
    } else if (line.startsWith("### ")) {
      style = "h3";
      text = line.slice(4);
    } else if (line.startsWith("> ")) {
      style = "blockquote";
      text = line.slice(2);
    }
    return {
      _key: key(),
      _type: "block",
      style,
      markDefs: [],
      children: [{ _key: key(), _type: "span", text, marks: [] }],
    };
  });
}

const PALETTE = [
  ["#7360e4", "#ffffff"],
  ["#90f188", "#0f1d07"],
  ["#12032a", "#90f188"],
  ["#0f1d07", "#f3f3e9"],
  ["#23bb16", "#ffffff"],
  ["#f3f3e9", "#0f1d07"],
];

const assetIdByName = new Map<string, string>();

async function primeAssets() {
  const rows: { _id: string; originalFilename: string | null }[] =
    await client.fetch(`*[_type=="sanity.imageAsset"]{_id, originalFilename}`);
  for (const r of rows)
    if (r.originalFilename) assetIdByName.set(r.originalFilename, r._id);
}

async function placeholder(name: string, label: string, tone: number) {
  const filename = `${name}.svg`;
  const existing = assetIdByName.get(filename);
  if (existing) return existing;

  const [bg, fg] = PALETTE[tone % PALETTE.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
<rect width="1600" height="1000" fill="${bg}"/>
<text x="80" y="900" font-family="system-ui, sans-serif" font-size="64" font-weight="600" fill="${fg}">${label.replace(/&/g, "&amp;")}</text>
</svg>`;
  const asset = await client.assets.upload("image", Buffer.from(svg), {
    filename,
    contentType: "image/svg+xml",
  });
  assetIdByName.set(filename, asset._id);
  return asset._id;
}

const imageRef = (assetId: string) => ({
  _type: "image" as const,
  asset: { _type: "reference" as const, _ref: assetId },
});

// ---------------------------------------------------------------------------
// content
// ---------------------------------------------------------------------------

const PROJECTS = [
  { title: "Aurora Health Platform", category: "Digital Health", tags: ["Websites", "UX Design", "React.js"] },
  { title: "Meridian Bank", category: "Financial Services", tags: ["Software", "Design Systems", "Accessibility"] },
  { title: "Northwind Commerce", category: "Retail & eCommerce", tags: ["eCommerce", "Headless", "Shopify"] },
  { title: "Atlas Museum", category: "Arts & Culture", tags: ["Websites", "Prototyping", "Motion"] },
  { title: "Verde Energy", category: "Sustainability", tags: ["Data Visualisation", "Websites", "UX Design"] },
  { title: "Summit Learning", category: "Education", tags: ["Web Applications", "Design Systems"] },
  { title: "Orbit Logistics", category: "Enterprise", tags: ["Software", "Platform Integrations", "React.js"] },
  { title: "Lumen Studio", category: "Media & Entertainment", tags: ["Websites", "UI Design", "Headless"] },
];

const ARTICLE_TITLES = [
  { title: "Craft in a post-AI world", category: ["Opinion", "Design"], read: "6 min read" },
  { title: "What does a good website cost?", category: ["Opinion"], read: "7 min read" },
  { title: "Understanding WCAG 2.2", category: ["Accessibility", "Development"], read: "8 min read" },
  { title: "Turning insight into impact", category: ["Design", "User Experience"], read: "5 min read" },
  { title: "Designing for performance from day one", category: ["Development", "Performance"], read: "6 min read" },
  { title: "The case for design systems", category: ["Design Systems"], read: "9 min read" },
  { title: "Headless CMS: when and why", category: ["Technology", "Headless"], read: "7 min read" },
  { title: "Motion that means something", category: ["Design", "Motion"], read: "4 min read" },
];

const AUTHORS = [
  { name: "Alex Morgan" },
  { name: "Sam Lee" },
  { name: "Priya Nair" },
];

const EXPERTISE = [
  ["Websites", "websites", "World-class websites for forward-thinking brands"],
  ["Web Applications", "web-applications", "Complex software with consumer-grade polish"],
  ["Mobile Apps", "mobile-apps", "Native-feeling apps for iOS and Android"],
  ["eCommerce", "ecommerce", "Storefronts built to convert and scale"],
  ["Data Visualisation", "data-visualisation", "Turning dense data into clear stories"],
  ["User Research & Validation", "user-research-validation", "Evidence before pixels"],
  ["User Experience Design", "user-experience-design", "Engage, empower, delight"],
  ["User Interface Design", "user-interface-design", "Interfaces with craft in every detail"],
  ["Prototyping", "prototyping", "Test the idea before you build it"],
  ["Design Systems", "design-systems", "One source of truth for product teams"],
  ["Headless", "headless", "Faster, better, stronger headless development"],
  ["React.js", "react-js", "Rich, resilient interfaces at scale"],
  ["Payload CMS", "payload-cms", "TypeScript-native content infrastructure"],
  ["Laravel", "laravel", "Robust back ends and APIs"],
  ["AI & Automation", "ai-automation", "Practical automation across your stack"],
  ["Commercial", "commercial", "Digital products that move the business"],
  ["Not for Profit", "not-for-profit", "Mission-driven work, measurable outcomes"],
  ["Innovation & Startups", "innovation-startups", "From zero to launch with a small team"],
  ["Education", "education", "Learning experiences that stick"],
  ["Community", "community", "Platforms that bring people together"],
] as const;

const FEATURE_SETS = [
  ["Idea to Execution", "End-to-end delivery from strategy to launch, all in-house."],
  ["Full Stack", "UI, interaction, CMS and engineering under one roof."],
  ["Technology Neutral", "We recommend the optimal stack for your problem."],
  ["Integrated", "Secure APIs and automated solutions across your ecosystem."],
  ["Evidence Based", "Research and validation baked into the process."],
  ["Performance First", "Fast by default — accessibility and Core Web Vitals."],
  ["Future-proof", "Continuous improvement independent of the back end."],
  ["Single Source of Truth", "Content reused across every platform from one place."],
];

// ---------------------------------------------------------------------------
// build + commit
// ---------------------------------------------------------------------------

const MANAGED_TYPES = ["project", "article", "author", "expertise", "client", "service"];

async function main() {
  console.log(`Seeding dummy content into ${projectId}/${dataset} ...`);

  // Clean slate for the content types this script owns (keeps siteSettings,
  // which is replaced below, and leaves uploaded image assets in place).
  await client.delete({ query: `*[_type in $types]`, params: { types: MANAGED_TYPES } });
  console.log("  cleared existing content documents");

  await primeAssets();

  const docs: Record<string, unknown>[] = [];

  // Authors
  const authorIds: string[] = [];
  for (const [i, a] of AUTHORS.entries()) {
    const id = `author-${slugify(a.name)}`;
    authorIds.push(id);
    docs.push({
      _id: id,
      _type: "author",
      name: a.name,
      avatar: imageRef(await placeholder(`author-${slugify(a.name)}`, a.name, i + 2)),
    });
  }

  // Projects
  for (const [i, p] of PROJECTS.entries()) {
    const slug = slugify(p.title);
    docs.push({
      _id: `project-${slug}`,
      _type: "project",
      title: p.title,
      slug: { _type: "slug", current: slug },
      category: p.category,
      year: `${2026 - (i % 3)}`,
      layout: i % 3 === 0 ? "landscape" : "portrait",
      aspectRatio: i % 3 === 0 ? "1452/890" : "710/890",
      image: imageRef(await placeholder(`project-${slug}`, p.title, i)),
      poster: imageRef(await placeholder(`project-${slug}-poster`, p.title, i + 1)),
      description: `${p.title} is a ${p.category.toLowerCase()} project delivered end to end — strategy, design, and engineering.`,
      tags: p.tags,
      textColor: i % 2 === 0 ? "white" : "black",
      featured: i < 5,
      order: (i + 1) * 10,
      body: body([
        `## The brief`,
        `${p.title} came to us needing a digital presence that matched the ambition of the business. The existing product was slow, hard to maintain, and inconsistent across devices.`,
        `## What we did`,
        `We ran a discovery sprint, rebuilt the design system from first principles, and shipped a new front end on a headless architecture. Every screen was measured against clear performance and accessibility budgets.`,
        `> The result feels effortless — which is exactly the point.`,
        `## Outcome`,
        `Conversion improved, support tickets dropped, and the team now ships new pages in hours instead of weeks. The platform is built to grow with them.`,
      ]),
    });
  }

  // Articles
  for (const [i, a] of ARTICLE_TITLES.entries()) {
    const slug = slugify(a.title);
    const d = new Date(2026, 8 - i, 28 - i * 2);
    docs.push({
      _id: `article-${slug}`,
      _type: "article",
      title: a.title,
      slug: { _type: "slug", current: slug },
      excerpt: `${a.title}: a short, practical take on what actually matters and how we apply it on client work.`,
      category: a.category,
      publishedAt: d.toISOString(),
      date: d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      readTime: a.read,
      author: { _type: "reference", _ref: authorIds[i % authorIds.length] },
      image: imageRef(await placeholder(`article-${slug}`, a.title, i + 1)),
      body: body([
        `Every project we take on eventually runs into this question in some form. Here's how we think about it.`,
        `## The short version`,
        `Good decisions compound. The cost of getting the foundations right is almost always lower than the cost of retrofitting them later.`,
        `## In practice`,
        `We start with the smallest thing that proves the idea, measure it honestly, and only then invest in scale. That keeps risk low and learning fast.`,
        `> Quality is a feature, not a phase.`,
        `If you're weighing this up on your own work, start by writing down what "done well" means — then design the process backwards from there.`,
      ]),
    });
  }

  // Expertise (every mega-menu item)
  for (const [i, [title, slug, subtitle]] of EXPERTISE.entries()) {
    docs.push({
      _id: `expertise-${slug}`,
      _type: "expertise",
      title,
      slug: { _type: "slug", current: slug },
      subtitle,
      description: `Our ${title} practice blends innovative design, current technology and strategic content to deliver outcomes that command attention and stand the test of time.`,
      features: [0, 1, 2, 3].map((n) => {
        const [t, d] = FEATURE_SETS[(i + n) % FEATURE_SETS.length];
        return { _key: key(), title: t, description: d };
      }),
      image: imageRef(await placeholder(`expertise-${slug}`, title, i)),
      order: (i + 1) * 10,
      ...(i > 0
        ? { related: { _type: "reference", _ref: `expertise-${EXPERTISE[i - 1][1]}` } }
        : {}),
    });
  }

  // Clients
  const CLIENTS = ["Northwind Labs", "Atlas Collective", "Verde Health", "Summit Education", "Orbit Finance", "Lumen Studio", "Meridian Bank", "Aurora Care"];
  for (const [i, name] of CLIENTS.entries()) {
    const slug = slugify(name);
    docs.push({
      _id: `client-${slug}`,
      _type: "client",
      name,
      slug: { _type: "slug", current: slug },
      logo: imageRef(await placeholder(`client-${slug}`, name, i)),
      width: 160,
      height: 40,
      order: (i + 1) * 10,
    });
  }

  // Services
  const SERVICES = [
    ["Strategy & UX", ["Digital Strategy", "User Research", "Journey Mapping", "Information Architecture", "Wireframing"]],
    ["Design", ["Interaction Design", "UI Design", "Design Systems", "Prototyping & Animation", "Accessibility"]],
    ["Development", ["Websites", "eCommerce", "Web Applications", "Mobile Apps", "Platform Integrations"]],
    ["Technology", ["React & Next.js", "Headless CMS", "Sanity", "Laravel", "AI & Automation"]],
  ] as const;
  for (const [i, [title, items]] of SERVICES.entries()) {
    docs.push({
      _id: `service-${slugify(title)}`,
      _type: "service",
      title,
      items: [...items],
      order: (i + 1) * 10,
    });
  }

  // Site settings
  const navLink = (label: string, href: string) => ({ _key: key(), _type: "navLink", label, href });
  docs.push({
    _id: "siteSettings",
    _type: "siteSettings",
    name: "MEGASOLX",
    tagline: "Extraordinary Digital Experiences",
    description: "We design, build and ship world-class digital products for forward-thinking brands.",
    url: "https://megasolx.example.com",
    email: "hello@megasolx.example.com",
    introStatement: "We design, build and ship world-class digital products for forward-thinking brands.",
    aboutHeading: "Great work for great people.",
    aboutCopy: [
      "We put people first, understanding that a well-crafted product significantly impacts the lives of those who use it. By empowering users, we solve unique problems and unlock potential for our clients.",
      "Our independent spirit drives our creative energy and approach to technology, allowing us to ensure quality and consistently deliver outstanding outcomes.",
    ],
    aboutImage: imageRef(await placeholder("about-teaser", "Our studio", 0)),
    aboutLink: { label: "About us", href: "/about" },
    stats: [
      { _key: key(), value: "100%", label: "In-house & independent" },
      { _key: key(), value: "14+", label: "Years crafting digital products" },
      { _key: key(), value: "80+", label: "Awards globally" },
    ],
    footerCtaLine1: "Let's make",
    footerCtaLine2: "something",
    footerTickerWords: ["epic", "innovative", "delightful", "robust", "extraordinary", "original", "intelligent", "engaging", "beautiful", "secure", "world-class"],
    footerCopyright: `© ${new Date().getFullYear()} Megasolx. All rights reserved.`,
    nav: [
      navLink("Home", "/"),
      navLink("About", "/about"),
      navLink("Work", "/work"),
      navLink("Thinking", "/thinking"),
      navLink("Contact", "/contact"),
    ],
    workCategories: [
      { _key: key(), label: "Featured", href: "/work", slug: "featured" },
      { _key: key(), label: "Commercial", href: "/work", slug: "commercial" },
      { _key: key(), label: "Community & Purpose", href: "/work", slug: "community-purpose" },
      { _key: key(), label: "Education", href: "/work", slug: "education" },
      { _key: key(), label: "Innovation", href: "/work", slug: "innovation" },
      { _key: key(), label: "Not for Profit", href: "/work", slug: "not-for-profit" },
      { _key: key(), label: "UI & UX", href: "/work", slug: "ui-ux" },
    ],
    expertiseMenu: [
      { heading: "What We Do", slugs: ["websites", "web-applications", "mobile-apps", "ecommerce", "data-visualisation"] },
      { heading: "Design & UX", slugs: ["user-research-validation", "user-experience-design", "user-interface-design", "prototyping", "design-systems"] },
      { heading: "Technology", slugs: ["headless", "react-js", "payload-cms", "laravel", "ai-automation"] },
      { heading: "Experience", slugs: ["commercial", "not-for-profit", "innovation-startups", "education", "community"] },
    ].map((g) => ({
      _key: key(),
      _type: "expertiseGroup",
      heading: g.heading,
      links: g.slugs.map((s) => {
        const item = EXPERTISE.find((e) => e[1] === s)!;
        return navLink(item[0], `/expertise/${s}`);
      }),
    })),
    locations: [
      { _key: key(), city: "Perth", country: "Australia", email: "perth@megasolx.example.com" },
      { _key: key(), city: "Melbourne", country: "Australia", email: "melbourne@megasolx.example.com" },
      { _key: key(), city: "Los Angeles", country: "USA", email: "la@megasolx.example.com" },
    ],
    social: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      x: "https://x.com",
    },
  });

  // Commit in batches (transactions cap around a few hundred mutations).
  const size = 40;
  for (let i = 0; i < docs.length; i += size) {
    const tx = client.transaction();
    for (const doc of docs.slice(i, i + size)) tx.createOrReplace(doc as never);
    await tx.commit();
    console.log(`  committed ${Math.min(i + size, docs.length)}/${docs.length}`);
  }

  console.log(`Done. Wrote ${docs.length} documents.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
