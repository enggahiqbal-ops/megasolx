import { CogIcon } from "@sanity/icons/Cog";
import { defineArrayMember, defineField, defineType } from "sanity";

const navLink = defineArrayMember({
  type: "object",
  name: "navLink",
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "general", title: "General", default: true },
    { name: "footer", title: "Footer" },
    { name: "contact", title: "Contact & social" },
    { name: "reusable", title: "Reusable blocks" },
  ],
  fields: [
    defineField({ name: "name", type: "string", group: "general", validation: (r) => r.required() }),
    defineField({ name: "tagline", type: "string", group: "general", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 2, group: "general", validation: (r) => r.required() }),
    defineField({ name: "url", title: "Site URL", type: "url", group: "general", validation: (r) => r.required() }),
    defineField({
      name: "logo",
      type: "image",
      group: "general",
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "ctaLabel",
      title: "Header CTA label",
      type: "string",
      group: "general",
      initialValue: "Get a Quote",
    }),
    defineField({
      name: "ctaHref",
      title: "Header CTA link",
      type: "string",
      group: "general",
      initialValue: "/contact",
    }),
    defineField({
      name: "circleLogoText",
      title: "Circle logo text",
      description: "Text that runs around the rotating circle logo (Home core services + About).",
      type: "string",
      group: "general",
      initialValue: "• MEGASOLX FILM AND VIDEO PRODUCTION STUDIO • BRINGING IDEAS TO LIFE ON SCREEN",
    }),

    defineField({ name: "footerCopyright", title: "Copyright line", type: "string", group: "footer" }),
    defineField({
      name: "footerHeading",
      title: "Footer column 1 heading",
      type: "string",
      group: "footer",
      description: 'e.g. "Megasolx - Film & Video Production"',
    }),
    defineField({
      name: "newsletter",
      title: "Newsletter",
      type: "object",
      group: "footer",
      fields: [
        { name: "heading", type: "string" },
        { name: "body", type: "text", rows: 2 },
      ],
    }),
    defineField({
      name: "nav",
      title: "Footer navigation links",
      type: "array",
      of: [navLink],
      group: "footer",
    }),

    defineField({ name: "email", title: "Contact email", type: "string", group: "contact", validation: (r) => r.required() }),
    defineField({
      name: "contact",
      title: "Contact info",
      type: "object",
      group: "contact",
      fields: [
        { name: "phone", type: "string" },
        { name: "businessHours", type: "string" },
        { name: "address", type: "text", rows: 2 },
        { name: "mapEmbedUrl", title: "Google Maps embed URL", type: "url" },
      ],
    }),
    defineField({
      name: "social",
      type: "object",
      group: "contact",
      fields: [
        { name: "instagram", type: "url" },
        { name: "facebook", type: "url" },
        { name: "x", title: "X (Twitter)", type: "url" },
        { name: "youtube", type: "url" },
      ],
    }),

    defineField({
      name: "ctaBanner",
      title: "Contact CTA banner",
      description: "Reused near the bottom of most pages.",
      type: "object",
      group: "reusable",
      fields: [
        { name: "heading", type: "string" },
        { name: "body", type: "text", rows: 2 },
        { name: "buttonLabel", type: "string" },
        { name: "buttonHref", type: "string" },
      ],
    }),
    defineField({
      name: "trustSection",
      title: '"Why Brands Trust Us" block',
      description: "Reused on Home, About, and Team.",
      type: "object",
      group: "reusable",
      fields: [
        { name: "heading", type: "string" },
        {
          name: "points",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                { name: "number", type: "string" },
                { name: "title", type: "string", validation: (r: any) => r.required() },
                { name: "description", type: "text", rows: 2, validation: (r: any) => r.required() },
              ],
              preview: { select: { title: "title", subtitle: "description" } },
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "trustStat",
      title: "Trust stat counter",
      description: 'e.g. "150+ Projects Completed", shown next to the trust block.',
      type: "object",
      group: "reusable",
      fields: [
        { name: "value", type: "string" },
        { name: "label", type: "string" },
      ],
    }),
    defineField({
      name: "highlightCta",
      title: "Highlight CTA video block",
      description: "Reused on Pricing and Testimonials pages.",
      type: "object",
      group: "reusable",
      fields: [
        { name: "heading", type: "string" },
        { name: "videoId", title: "YouTube video ID", type: "string" },
        { name: "buttonLabel", type: "string" },
        { name: "buttonHref", type: "string" },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
