/**
 * Fills the dataset with a believable, image-rich set of placeholder content
 * for every page:
 *
 *   - 8 projects (real photos + written case studies)  -> /work, /work/[slug], home
 *   - 8 articles (real photos + written bodies) + 3 authors (real avatars)
 *   - 20 expertise entries (every mega-menu link)      -> /expertise/[slug]
 *   - 8 client logos (generated wordmarks)
 *   - services + site settings
 *
 * Photos are fetched from picsum.photos and avatars from pravatar.cc at seed
 * time and uploaded into Sanity, so the running site only ever loads them from
 * the Sanity CDN. Deterministic seeds → re-running reuses the same assets.
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

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function download(url: string): Promise<Buffer> {
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(url, { redirect: "follow" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return Buffer.from(await res.arrayBuffer());
    } catch (err) {
      if (attempt === 4) throw err;
      await sleep(attempt * 800);
    }
  }
  throw new Error("unreachable");
}

/** Small markdown-ish -> Portable Text. `## x` heading, `### x`, `> x` quote. */
function body(lines: string[]) {
  return lines.map((line) => {
    let style = "normal";
    let text = line;
    if (line.startsWith("## ")) [style, text] = ["h2", line.slice(3)];
    else if (line.startsWith("### ")) [style, text] = ["h3", line.slice(4)];
    else if (line.startsWith("> ")) [style, text] = ["blockquote", line.slice(2)];
    return {
      _key: key(),
      _type: "block",
      style,
      markDefs: [],
      children: [{ _key: key(), _type: "span", text, marks: [] }],
    };
  });
}

const assetIdByName = new Map<string, string>();

async function primeAssets() {
  const rows: { _id: string; originalFilename: string | null }[] =
    await client.fetch(`*[_type=="sanity.imageAsset"]{_id, originalFilename}`);
  for (const r of rows)
    if (r.originalFilename) assetIdByName.set(r.originalFilename, r._id);
}

async function uploadOnce(
  filename: string,
  contentType: string,
  make: () => Promise<Buffer> | Buffer,
) {
  const existing = assetIdByName.get(filename);
  if (existing) return existing;
  const buffer = await make();
  const asset = await client.assets.upload("image", buffer, {
    filename,
    contentType,
  });
  assetIdByName.set(filename, asset._id);
  console.log(`  + ${filename}`);
  return asset._id;
}

/** Real photograph from picsum, keyed deterministically by `seed`. */
function photo(name: string, seed: string, w: number, h: number) {
  return uploadOnce(`${name}.jpg`, "image/jpeg", () =>
    download(`https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`),
  );
}

/** Real avatar photo from pravatar, keyed by `seed`. */
function avatar(name: string, seed: string) {
  return uploadOnce(`${name}.jpg`, "image/jpeg", () =>
    download(`https://i.pravatar.cc/480?u=${encodeURIComponent(seed)}`),
  );
}

const LOGO_FONTS = [
  "Georgia, 'Times New Roman', serif",
  "'Helvetica Neue', Arial, sans-serif",
  "'Trebuchet MS', Verdana, sans-serif",
  "'Courier New', monospace",
];

/** Generated monochrome wordmark (HomepageLogos inverts it to white). */
async function logo(name: string, i: number) {
  const font = LOGO_FONTS[i % LOGO_FONTS.length];
  const weight = i % 2 ? 700 : 600;
  const label = i % 2 === 0 ? name.toUpperCase() : name;
  const fontSize = 34;
  const textW = Math.round(label.length * fontSize * 0.62);
  const markW = 46;
  const w = markW + textW + 16;
  const h = 64;
  const mark =
    i % 2
      ? `<circle cx="23" cy="32" r="15" fill="#111"/>`
      : `<rect x="8" y="17" width="30" height="30" rx="7" fill="#111"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
${mark}
<text x="${markW + 8}" y="42" font-family="${font}" font-size="${fontSize}" font-weight="${weight}" letter-spacing="0.01em" fill="#111">${label.replace(/&/g, "&amp;")}</text>
</svg>`;
  const ref = await uploadOnce(`logo-${slugify(name)}.svg`, "image/svg+xml", () =>
    Buffer.from(svg),
  );
  return { ref, width: w, height: h };
}

const imageRef = (assetId: string) => ({
  _type: "image" as const,
  asset: { _type: "reference" as const, _ref: assetId },
});

// ---------------------------------------------------------------------------
// content
// ---------------------------------------------------------------------------

const PROJECTS = [
  {
    title: "Aurora Health Platform",
    category: "Digital Health",
    tags: ["Websites", "UX Design", "React.js"],
    seed: "clinic-corridor",
    summary:
      "A patient portal that 40,000 people use every week to book appointments, view results and message their care team.",
    problem:
      "Aurora's booking flow hadn't changed since 2014. Patients abandoned it midway and called the clinic instead, and the phone lines were overwhelmed.",
    approach:
      "We shadowed reception staff for a week, mapped every appointment type with clinicians, then rebuilt the flow around the three tasks people actually came to do. The new front end runs on React with a headless CMS so content teams update guidance without a release.",
    result:
      "Online bookings are up 62%, call-centre volume dropped by a third, and the WCAG 2.2 AA audit passed with no critical issues.",
  },
  {
    title: "Meridian Bank",
    category: "Financial Services",
    tags: ["Software", "Design Systems", "Accessibility"],
    seed: "glass-tower",
    summary:
      "A design system and component library powering Meridian's web banking across 11 product teams.",
    problem:
      "Every squad had built its own buttons, forms and tables. The app felt like six different products stitched together, and accessibility bugs kept shipping.",
    approach:
      "We built one system: tokens, 40 audited components, and usage docs written for engineers. Adoption was voluntary but we made the new way the easy way, with codemods and office hours.",
    result:
      "Nine of eleven teams migrated in two quarters. Accessibility defects fell 71% and new screens ship roughly twice as fast.",
  },
  {
    title: "Northwind Commerce",
    category: "Retail & eCommerce",
    tags: ["eCommerce", "Headless", "Shopify"],
    seed: "warehouse-shelves",
    summary:
      "A headless storefront for a homeware brand selling into four markets and three currencies.",
    problem:
      "The old theme-based store was slow on mobile, and merchandising changes needed a developer. Peak-season traffic caused checkout timeouts.",
    approach:
      "We kept Shopify for orders and inventory, and put a headless front end in front of it with edge caching. Merchandisers now arrange collections in the CMS with live preview.",
    result:
      "Largest Contentful Paint went from 4.1s to 1.3s on mobile. Conversion rose 18% and the last sale event ran without a single checkout error.",
  },
  {
    title: "Atlas Museum",
    category: "Arts & Culture",
    tags: ["Websites", "Prototyping", "Motion"],
    seed: "gallery-hall",
    summary:
      "A website for a national museum, built around its collection of 90,000 objects.",
    problem:
      "The collection was hidden behind a clunky search. Visitors couldn't tell what was on display today, and the site failed on older devices used in the galleries.",
    approach:
      "We prototyped the exhibition pages first, in the building, on the real hardware. Motion is used sparingly to guide attention and always respects reduced-motion settings.",
    result:
      "Collection page views tripled. The 'on display now' feature is the most-used part of the site, and school bookings moved almost entirely online.",
  },
  {
    title: "Verde Energy",
    category: "Sustainability",
    tags: ["Data Visualisation", "Websites", "UX Design"],
    seed: "wind-turbines",
    summary:
      "An interactive report showing where a renewables developer's projects stand and what they generate.",
    problem:
      "Verde published a 120-page PDF once a year. Journalists and investors wanted current numbers and couldn't get them.",
    approach:
      "We designed a live dashboard driven by their operations data, with a clear editorial layer on top so the story stays legible to non-experts.",
    result:
      "The report is now quoted directly in press coverage. Time spent on the investor pages went up 3x and the annual PDF was retired.",
  },
  {
    title: "Summit Learning",
    category: "Education",
    tags: ["Web Applications", "Design Systems"],
    seed: "library-desks",
    summary:
      "A course platform used by 200 further-education colleges to deliver blended learning.",
    problem:
      "Tutors spent more time fighting the interface than teaching. Drop-off in the first two weeks of any course was brutal.",
    approach:
      "We ran usability sessions with tutors and students, simplified the course-builder to a single scrollable outline, and rebuilt the learner view mobile-first.",
    result:
      "Two-week completion is up 24%. Support tickets about 'how do I…' dropped by half in the first term.",
  },
  {
    title: "Orbit Logistics",
    category: "Enterprise",
    tags: ["Software", "Platform Integrations", "React.js"],
    seed: "shipping-containers",
    summary:
      "A control-tower app that pulls six carrier systems into one live view of every shipment.",
    problem:
      "Operations staff kept fifteen browser tabs open and reconciled them by hand. Exceptions were caught late, when they were expensive.",
    approach:
      "We built one screen: a filterable, real-time list with the next action always visible. Integrations are isolated so one flaky carrier API can't take the app down.",
    result:
      "Exceptions are now spotted hours earlier. The team handles 30% more volume with the same headcount.",
  },
  {
    title: "Lumen Studio",
    category: "Media & Entertainment",
    tags: ["Websites", "UI Design", "Headless"],
    seed: "recording-studio",
    summary:
      "A portfolio site for a production studio, with a bespoke case-study template the team fills in themselves.",
    problem:
      "Every new project meant a developer ticket. The site fell behind the work, which is the one thing a studio site can't do.",
    approach:
      "We designed a flexible case-study builder in the CMS — image, video, quote and text blocks — with live preview, so producers publish the day a project wraps.",
    result:
      "The studio has published 22 case studies since launch, all self-serve. Inbound enquiries mentioning specific projects have roughly doubled.",
  },
];

function projectBody(p: (typeof PROJECTS)[number]) {
  return body([
    p.summary,
    "## The challenge",
    p.problem,
    "## Our approach",
    p.approach,
    "> Good work is mostly good decisions, made early and often.",
    "## The outcome",
    p.result,
  ]);
}

const ARTICLES = [
  {
    title: "Craft in a post-AI world",
    category: ["Opinion", "Design"],
    read: "6 min read",
    seed: "sculptor-hands",
    lines: [
      "AI can generate an output for someone. It can't hold the intent behind it — the small decisions about tone, rhythm and restraint that make a thing feel considered rather than assembled.",
      "## Generation is not craft",
      "A model will happily produce fifty homepage variations. None of them know why your business exists or which corner the user is stuck in. That judgement is still ours to bring.",
      "## Where it helps",
      "We use these tools for the parts that were always tedious: first drafts, alt text, boilerplate, throwaway explorations. That frees time for the work that actually needs a person.",
      "> The tools got faster. The bar for taste went up.",
      "The teams doing well with AI aren't the ones generating the most. They're the ones who still know what 'good' looks like and edit hard toward it.",
    ],
  },
  {
    title: "What does a good website cost?",
    category: ["Opinion"],
    read: "7 min read",
    seed: "architecture-blueprint",
    lines: [
      "It's the first question in most conversations, and the honest answer is: it depends on what you're trying to change.",
      "## Cost is a poor proxy for value",
      "A cheap site that needs replacing in eighteen months is expensive. A considered one that a team can run and extend for five years is not.",
      "## What actually drives the number",
      "Scope, integrations, content readiness and how many people need to agree. Design and build are rarely the expensive part — indecision is.",
      "> Spend where it compounds: foundations, accessibility, a system your team can use.",
      "Ask a partner to walk you through where the money goes. If they can't, that tells you something.",
    ],
  },
  {
    title: "Understanding WCAG 2.2",
    category: ["Accessibility", "Development"],
    read: "8 min read",
    seed: "braille-book",
    lines: [
      "WCAG 2.2 adds nine success criteria, and most of them target cognitive and motor barriers rather than screen-reader edge cases.",
      "## The ones you'll hit first",
      "Target Size, Focus Not Obscured and Dragging Movements come up on almost every project. They're also the cheapest to get right if you design for them from the start.",
      "## Retrofitting is the expensive path",
      "Sticky headers that hide the focused field, drag-only reordering, tiny icon buttons — each is a small fix in isolation and a slog once the whole UI assumes them.",
      "> Accessibility is a property of decisions, not a layer you add at the end.",
      "Build a component library that passes by default and the rest mostly takes care of itself.",
    ],
  },
  {
    title: "Turning insight into impact",
    category: ["Design", "User Experience"],
    read: "5 min read",
    seed: "sticky-notes-wall",
    lines: [
      "Research that doesn't change a decision was expensive entertainment. The gap is almost always in how findings are handed over.",
      "## Ship findings as decisions, not decks",
      "Instead of 'users were confused by the filters', try 'we're removing the filter drawer and inlining the three filters people used'. Give the team something to react to.",
      "## Keep the loop short",
      "Small, frequent studies that feed the next sprint beat a big report that lands after the design is locked.",
      "> Empathy is only useful once it's built into something.",
      "The measure of good research is how often it's quoted in standups a month later.",
    ],
  },
  {
    title: "Designing for performance from day one",
    category: ["Development", "Performance"],
    read: "6 min read",
    seed: "highway-lights",
    lines: [
      "Performance is a design constraint, like colour contrast or reading length. Treated as a cleanup task, it never quite happens.",
      "## Set a budget before the first mockup",
      "Agree a number — say, 170KB of JavaScript and LCP under 1.5s on a mid-range phone — and hold every decision against it.",
      "## The usual suspects",
      "Unoptimised hero images, a carousel nobody asked for, and four analytics scripts. None of them are design decisions anyone defends when you show the cost.",
      "> Fast is a feature people feel before they can name it.",
      "Wire performance into CI so a regression fails the build, not the launch.",
    ],
  },
  {
    title: "The case for design systems",
    category: ["Design Systems"],
    read: "9 min read",
    seed: "lego-bricks",
    lines: [
      "A design system earns its keep when it makes the right thing the easy thing. Otherwise it's a museum of components.",
      "## Start with the painful bits",
      "Forms, tables, empty states, error handling. The unglamorous parts are where inconsistency costs the most and where a system pays back fastest.",
      "## Adoption is a product problem",
      "Ship migration codemods, write docs for the people who'll actually use them, and hold office hours. Mandates without support just breed shadow components.",
      "> A system is a promise that the next screen won't start from zero.",
      "Measure it by delivery speed and defect rate, not by how complete the Figma library looks.",
    ],
  },
  {
    title: "Headless CMS: when and why",
    category: ["Technology", "Headless"],
    read: "7 min read",
    seed: "server-room",
    lines: [
      "Headless isn't automatically better. It's a trade: more flexibility and speed, in exchange for owning more of the plumbing.",
      "## Good reasons to go headless",
      "You publish to more than one surface, you need a front end the CMS can't give you, or your editors and developers keep blocking each other.",
      "## Bad reasons",
      "It's on a conference slide. A brochure site with one editor is usually happier on something batteries-included.",
      "> Pick the boring option unless you can name the constraint that rules it out.",
      "When it fits, the payoff is real: independent front-end iteration and content reuse across every channel.",
    ],
  },
  {
    title: "Motion that means something",
    category: ["Design", "Motion"],
    read: "4 min read",
    seed: "long-exposure-city",
    lines: [
      "Animation should answer a question the user is already asking: where did that come from, what just changed, where am I now.",
      "## Motion as explanation",
      "A panel that slides in from the button that opened it teaches the spatial model for free. A panel that fades in from nowhere teaches nothing.",
      "## Respect the setting",
      "Honour prefers-reduced-motion, keep durations short, and never block interaction behind an animation finishing.",
      "> If you can remove the motion and nothing is less clear, remove it.",
      "The best motion design is usually the least you can get away with.",
    ],
  },
];

const AUTHORS = [
  { name: "Alex Morgan", seed: "alex-morgan-42" },
  { name: "Sam Lee", seed: "sam-lee-17" },
  { name: "Priya Nair", seed: "priya-nair-88" },
];

const EXPERTISE: readonly (readonly [string, string, string, string])[] = [
  ["Websites", "websites", "World-class websites for forward-thinking brands", "office-window"],
  ["Web Applications", "web-applications", "Complex software with consumer-grade polish", "dashboard-screen"],
  ["Mobile Apps", "mobile-apps", "Native-feeling apps for iOS and Android", "phone-in-hand"],
  ["eCommerce", "ecommerce", "Storefronts built to convert and scale", "retail-rail"],
  ["Data Visualisation", "data-visualisation", "Turning dense data into clear stories", "charts-paper"],
  ["User Research & Validation", "user-research-validation", "Evidence before pixels", "interview-room"],
  ["User Experience Design", "user-experience-design", "Engage, empower, delight", "wireframe-desk"],
  ["User Interface Design", "user-interface-design", "Interfaces with craft in every detail", "color-swatches"],
  ["Prototyping", "prototyping", "Test the idea before you build it", "paper-prototype"],
  ["Design Systems", "design-systems", "One source of truth for product teams", "grid-blocks"],
  ["Headless", "headless", "Faster, better, stronger headless development", "fibre-optics"],
  ["React.js", "react-js", "Rich, resilient interfaces at scale", "code-editor"],
  ["Payload CMS", "payload-cms", "TypeScript-native content infrastructure", "database-rack"],
  ["Laravel", "laravel", "Robust back ends and APIs", "engine-bay"],
  ["AI & Automation", "ai-automation", "Practical automation across your stack", "circuit-board"],
  ["Commercial", "commercial", "Digital products that move the business", "boardroom"],
  ["Not for Profit", "not-for-profit", "Mission-driven work, measurable outcomes", "volunteers"],
  ["Innovation & Startups", "innovation-startups", "From zero to launch with a small team", "garage-desk"],
  ["Education", "education", "Learning experiences that stick", "lecture-hall"],
  ["Community", "community", "Platforms that bring people together", "crowd-hands"],
];

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

const CLIENTS = [
  "Northwind Labs",
  "Atlas Collective",
  "Verde Health",
  "Summit Education",
  "Orbit Finance",
  "Lumen Studio",
  "Meridian Bank",
  "Aurora Care",
];

const SERVICES: readonly (readonly [string, readonly string[]])[] = [
  ["Strategy & UX", ["Digital Strategy", "User Research", "Journey Mapping", "Information Architecture", "Wireframing"]],
  ["Design", ["Interaction Design", "UI Design", "Design Systems", "Prototyping & Animation", "Accessibility"]],
  ["Development", ["Websites", "eCommerce", "Web Applications", "Mobile Apps", "Platform Integrations"]],
  ["Technology", ["React & Next.js", "Headless CMS", "Sanity", "Laravel", "AI & Automation"]],
];

// ---------------------------------------------------------------------------
// build + commit
// ---------------------------------------------------------------------------

const MANAGED_TYPES = ["project", "article", "author", "expertise", "client", "service"];

async function main() {
  console.log(`Seeding dummy content into ${projectId}/${dataset} ...`);

  await client.delete({
    query: `*[_type in $types]`,
    params: { types: MANAGED_TYPES },
  });
  console.log("  cleared existing content documents");

  await primeAssets();
  console.log("  fetching + uploading images (first run takes a minute)…");

  const docs: Record<string, unknown>[] = [];

  // Authors
  const authorIds: string[] = [];
  for (const a of AUTHORS) {
    const id = `author-${slugify(a.name)}`;
    authorIds.push(id);
    docs.push({
      _id: id,
      _type: "author",
      name: a.name,
      avatar: imageRef(await avatar(`author-${slugify(a.name)}`, a.seed)),
    });
  }

  // Projects
  for (const [i, p] of PROJECTS.entries()) {
    const slug = slugify(p.title);
    const landscape = i % 3 === 0;
    docs.push({
      _id: `project-${slug}`,
      _type: "project",
      title: p.title,
      slug: { _type: "slug", current: slug },
      category: p.category,
      year: `${2026 - (i % 3)}`,
      layout: landscape ? "landscape" : "portrait",
      aspectRatio: landscape ? "1452/890" : "710/890",
      image: imageRef(
        await photo(
          `project-${slug}`,
          p.seed,
          landscape ? 1600 : 1200,
          landscape ? 980 : 1500,
        ),
      ),
      poster: imageRef(await photo(`project-${slug}-poster`, `${p.seed}-2`, 1600, 900)),
      description: p.summary,
      tags: p.tags,
      textColor: "white",
      featured: i < 5,
      order: (i + 1) * 10,
      body: projectBody(p),
    });
  }

  // Articles
  for (const [i, a] of ARTICLES.entries()) {
    const slug = slugify(a.title);
    const d = new Date(2026, 8 - i, 26 - i * 2);
    docs.push({
      _id: `article-${slug}`,
      _type: "article",
      title: a.title,
      slug: { _type: "slug", current: slug },
      excerpt: a.lines[0],
      category: a.category,
      publishedAt: d.toISOString(),
      date: d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      readTime: a.read,
      author: { _type: "reference", _ref: authorIds[i % authorIds.length] },
      image: imageRef(await photo(`article-${slug}`, a.seed, 1600, 1000)),
      body: body(a.lines),
    });
  }

  // Expertise (every mega-menu item)
  for (const [i, [title, slug, subtitle, seed]] of EXPERTISE.entries()) {
    docs.push({
      _id: `expertise-${slug}`,
      _type: "expertise",
      title,
      slug: { _type: "slug", current: slug },
      subtitle,
      description: `Our ${title} practice blends innovative design, current technology and strategic content to deliver outcomes that command attention and stand the test of time. We work as one team from first workshop to launch and beyond.`,
      features: [0, 1, 2, 3].map((n) => {
        const [t, d] = FEATURE_SETS[(i + n) % FEATURE_SETS.length];
        return { _key: key(), title: t, description: d };
      }),
      image: imageRef(await photo(`expertise-${slug}`, seed, 1600, 1000)),
      order: (i + 1) * 10,
      ...(i > 0
        ? { related: { _type: "reference", _ref: `expertise-${EXPERTISE[i - 1][1]}` } }
        : {}),
    });
  }

  // Clients
  for (const [i, name] of CLIENTS.entries()) {
    const l = await logo(name, i);
    docs.push({
      _id: `client-${slugify(name)}`,
      _type: "client",
      name,
      slug: { _type: "slug", current: slugify(name) },
      logo: imageRef(l.ref),
      width: l.width,
      height: l.height,
      order: (i + 1) * 10,
    });
  }

  // Services
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
  const aboutImg = imageRef(await photo("about-studio", "design-studio-team", 1200, 1500));
  const showreelImg = imageRef(await photo("showreel-poster", "film-set-lights", 1920, 1080));
  const navLink = (label: string, href: string) => ({
    _key: key(),
    _type: "navLink",
    label,
    href,
  });
  docs.push({
    _id: "siteSettings",
    _type: "siteSettings",
    name: "MEGASOLX",
    tagline: "Extraordinary Digital Experiences",
    description:
      "We design, build and ship world-class digital products for forward-thinking brands.",
    url: "https://megasolx.example.com",
    email: "hello@megasolx.example.com",
    introStatement:
      "We design, build and ship world-class digital products for forward-thinking brands.",
    showreelPoster: showreelImg,
    showreelLabel: "Watch showreel",
    aboutHeading: "Great work for great people.",
    aboutCopy: [
      "We put people first, understanding that a well-crafted product significantly impacts the lives of those who use it. By empowering users, we solve unique problems and unlock potential for our clients.",
      "Our independent spirit drives our creative energy and approach to technology, allowing us to ensure quality and consistently deliver outstanding outcomes.",
    ],
    aboutImage: aboutImg,
    aboutLink: { label: "About us", href: "/about" },
    stats: [
      { _key: key(), value: "100%", label: "In-house & independent" },
      { _key: key(), value: "14+", label: "Years crafting digital products" },
      { _key: key(), value: "80+", label: "Awards globally" },
    ],
    footerCtaLine1: "Let's make",
    footerCtaLine2: "something",
    footerTickerWords: [
      "epic",
      "innovative",
      "delightful",
      "robust",
      "extraordinary",
      "original",
      "intelligent",
      "engaging",
      "beautiful",
      "secure",
      "world-class",
    ],
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

  // Commit in batches
  const size = 40;
  for (let i = 0; i < docs.length; i += size) {
    const tx = client.transaction();
    for (const doc of docs.slice(i, i + size)) tx.createOrReplace(doc as never);
    await tx.commit();
    console.log(`  committed ${Math.min(i + size, docs.length)}/${docs.length}`);
  }

  // Drop image assets nothing references any more (old placeholder rectangles).
  const orphans: string[] = await client.fetch(
    `*[_type == "sanity.imageAsset" && count(*[references(^._id)]) == 0]._id`,
  );
  if (orphans.length) {
    await client.delete({ query: `*[_id in $ids]`, params: { ids: orphans } });
    console.log(`  removed ${orphans.length} unused image assets`);
  }

  console.log(`Done. Wrote ${docs.length} documents.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
