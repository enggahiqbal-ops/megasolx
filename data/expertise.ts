export type Expertise = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  features: { title: string; description: string }[];
  image: string;
  relatedSlug?: string;
};

export const expertiseList: Expertise[] = [
  {
    slug: "websites",
    title: "Websites",
    subtitle: "World-class websites for forward-thinking brands",
    description:
      "We blend innovative design, cutting-edge technology, and strategic content to deliver websites that command attention.",
    features: [
      {
        title: "Idea to Execution",
        description: "End-to-end delivery from strategy to launch, all in-house.",
      },
      {
        title: "Full Stack",
        description: "UI, interaction, CMS, and engineering under one roof.",
      },
      {
        title: "Technology Neutral",
        description: "We recommend the optimal stack for your problem.",
      },
      {
        title: "Integrated",
        description: "Secure APIs and automated solutions across your ecosystem.",
      },
    ],
    image: "/images/expertise/websites.svg",
    relatedSlug: "headless",
  },
  {
    slug: "headless",
    title: "Headless",
    subtitle: "Faster, better, stronger headless development",
    description:
      "Decouple frontend from backend for rich interfaces that scale with your business.",
    features: [
      {
        title: "Prioritise Performance",
        description: "Dynamic interfaces without backend constraints.",
      },
      {
        title: "Modern CMS",
        description: "Payload, Storyblok, Sanity and more.",
      },
      {
        title: "Future-proof",
        description: "Continuous improvement independent of the backend.",
      },
      {
        title: "Single source of truth",
        description: "Content reused across platforms from one place.",
      },
    ],
    image: "/images/expertise/headless.svg",
    relatedSlug: "websites",
  },
  {
    slug: "user-experience-design",
    title: "User Experience Design",
    subtitle: "Engage, empower, delight",
    description:
      "Evidence-based UX informs every decision to help users achieve goals easily and delightfully.",
    features: [
      { title: "UX Specialists", description: "Award-winning approach on every project." },
      { title: "Catering for all", description: "Performance, accessibility and usability first." },
      { title: "Evidence based", description: "Research and validation baked into process." },
      { title: "Leaders in Digital", description: "Pushing boundaries of meaningful experiences." },
    ],
    image: "/images/expertise/ux-design.svg",
    relatedSlug: "websites",
  },
];

export const expertiseNav = {
  groups: [
    {
      heading: "What We Do",
      links: [
        { label: "Websites", href: "/expertise/websites" },
        { label: "Software", href: "/expertise/web-applications" },
        { label: "Mobile Apps", href: "/expertise/mobile-apps" },
        { label: "eCommerce", href: "/expertise/ecommerce" },
        { label: "Data Vis", href: "/expertise/data-visualisation" },
      ],
    },
    {
      heading: "Design & UX",
      links: [
        { label: "User Research", href: "/expertise/user-research-validation" },
        { label: "UX Design", href: "/expertise/user-experience-design" },
        { label: "UI Design", href: "/expertise/user-interface-design" },
        { label: "Prototyping", href: "/expertise/prototyping" },
        { label: "Design Systems", href: "/expertise/design-systems" },
      ],
    },
    {
      heading: "Technology",
      links: [
        { label: "Headless", href: "/expertise/headless" },
        { label: "React.js", href: "/expertise/react-js" },
        { label: "Payload CMS", href: "/expertise/payload-cms" },
        { label: "Laravel", href: "/expertise/laravel" },
        { label: "AI & Automation", href: "/expertise/ai-automation" },
      ],
    },
    {
      heading: "Experience",
      links: [
        { label: "Commercial", href: "/expertise/commercial" },
        { label: "Not for Profit", href: "/expertise/not-for-profit" },
        { label: "Innovation", href: "/expertise/innovation-startups" },
        { label: "Education", href: "/expertise/education" },
        { label: "Community", href: "/expertise/community" },
      ],
    },
  ],
};

export function getExpertiseBySlug(slug: string) {
  return expertiseList.find((e) => e.slug === slug);
}
