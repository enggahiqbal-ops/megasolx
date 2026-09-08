export const siteConfig = {
  name: "MEGASOLX",
  tagline: "Extraordinary Digital Experiences",
  description:
    "We design, build and ship world-class digital products for forward-thinking brands.",
  email: "hello@example.com",
  url: "https://example.com",
  introStatement:
    "We design, build and ship world-class digital products for forward-thinking brands.",
  aboutHeading: "Great work for great people.",
  aboutCopy: [
    "We put people first, understanding that a well-crafted product significantly impacts the lives of those who use it. By empowering users, we solve unique problems and unlock potential for our clients.",
    "Our independent spirit drives our creative energy and approach to technology, allowing us to ensure quality and consistently deliver outstanding outcomes.",
  ],
  aboutLink: { label: "About us", href: "/about" },
  stats: [
    { value: "100%", label: "In-house & independent" },
    { value: "14+", label: "Years crafting digital products" },
    { value: "80+", label: "Awards globally" },
  ],
  footer: {
    ctaLine1: "Let's make",
    ctaLine2: "something",
    tickerWords: [
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
    copyright: `© ${new Date().getFullYear()} Megasolx. All rights reserved.`,
  },
  locations: [
    { city: "Perth", country: "Australia", email: "hello@example.com" },
    { city: "Melbourne", country: "Australia", email: "melbourne@example.com" },
    { city: "Los Angeles", country: "USA", email: "la@example.com" },
  ],
  social: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    x: "https://x.com",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Thinking", href: "/thinking" },
    { label: "Contact", href: "/contact" },
  ],
};

export type SiteConfig = typeof siteConfig;
