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
    { name: "homepage", title: "Homepage" },
    { name: "about", title: "About section" },
    { name: "footer", title: "Footer" },
    { name: "nav", title: "Navigation" },
    { name: "contact", title: "Contact & social" },
  ],
  fields: [
    defineField({ name: "name", type: "string", group: "general", validation: (r) => r.required() }),
    defineField({ name: "tagline", type: "string", group: "general", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 2, group: "general", validation: (r) => r.required() }),
    defineField({ name: "url", title: "Site URL", type: "url", group: "general", validation: (r) => r.required() }),
    defineField({
      name: "introStatement",
      type: "text",
      rows: 3,
      group: "general",
      description: "Large statement below the showreel on the homepage.",
      validation: (r) => r.required(),
    }),

    defineField({
      name: "showreelPoster",
      title: "Showreel poster image",
      type: "image",
      group: "homepage",
      description:
        "Shown in the homepage showreel before the video plays (and when reduced motion is on).",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "showreelVideo",
      title: "Showreel video",
      type: "file",
      group: "homepage",
      description: "Optional looping MP4 for the homepage showreel.",
      options: { accept: "video/*" },
    }),
    defineField({
      name: "showreelLabel",
      title: "Showreel button label",
      type: "string",
      group: "homepage",
      initialValue: "Watch showreel",
    }),

    defineField({ name: "aboutHeading", type: "string", group: "about", validation: (r) => r.required() }),
    defineField({
      name: "aboutCopy",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 3 })],
      group: "about",
    }),
    defineField({
      name: "aboutImage",
      type: "image",
      options: { hotspot: true },
      group: "about",
    }),
    defineField({
      name: "aboutLink",
      type: "object",
      group: "about",
      fields: [
        { name: "label", type: "string", initialValue: "About us" },
        { name: "href", type: "string", initialValue: "/about" },
      ],
    }),
    defineField({
      name: "stats",
      type: "array",
      group: "about",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "value", type: "string", validation: (r) => r.required() },
            { name: "label", type: "string", validation: (r) => r.required() },
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),

    defineField({ name: "footerCtaLine1", title: "Footer CTA line 1", type: "string", group: "footer" }),
    defineField({ name: "footerCtaLine2", title: "Footer CTA line 2", type: "string", group: "footer" }),
    defineField({
      name: "footerTickerWords",
      title: "Footer ticker words",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      group: "footer",
    }),
    defineField({ name: "footerCopyright", title: "Copyright line", type: "string", group: "footer" }),

    defineField({
      name: "nav",
      title: "Primary navigation",
      type: "array",
      of: [navLink],
      group: "nav",
    }),
    defineField({
      name: "workCategories",
      title: "Work category filters",
      type: "array",
      group: "nav",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "label", type: "string", validation: (r) => r.required() },
            { name: "href", type: "string", validation: (r) => r.required() },
            { name: "slug", type: "string", validation: (r) => r.required() },
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
    defineField({
      name: "expertiseMenu",
      title: "Expertise mega-menu",
      type: "array",
      group: "nav",
      of: [
        defineArrayMember({
          type: "object",
          name: "expertiseGroup",
          fields: [
            { name: "heading", type: "string", validation: (r) => r.required() },
            {
              name: "links",
              type: "array",
              of: [navLink],
            },
          ],
          preview: {
            select: { title: "heading", links: "links" },
            prepare({ title, links }) {
              return { title, subtitle: `${(links ?? []).length} links` };
            },
          },
        }),
      ],
    }),

    defineField({ name: "email", title: "Contact email", type: "string", group: "contact", validation: (r) => r.required() }),
    defineField({
      name: "locations",
      type: "array",
      group: "contact",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "city", type: "string", validation: (r) => r.required() },
            { name: "country", type: "string", validation: (r) => r.required() },
            { name: "email", type: "string" },
          ],
          preview: { select: { title: "city", subtitle: "country" } },
        }),
      ],
    }),
    defineField({
      name: "social",
      type: "object",
      group: "contact",
      fields: [
        { name: "instagram", type: "url" },
        { name: "linkedin", type: "url" },
        { name: "x", title: "X (Twitter)", type: "url" },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
