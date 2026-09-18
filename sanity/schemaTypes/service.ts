import { ThListIcon } from "@sanity/icons/ThList";
import { defineArrayMember, defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: ThListIcon,
  groups: [
    { name: "listing", title: "Listing", default: true },
    { name: "detail", title: "Detail page" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: 'e.g. "Video Production"',
      group: "listing",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      group: "listing",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Accordion summary",
      type: "text",
      rows: 3,
      group: "listing",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      group: "listing",
    }),
    defineField({
      name: "heroVideoId",
      title: "Hero YouTube video ID",
      type: "string",
      group: "listing",
      description: "Used as the background clip on both the accordion item and the detail page hero.",
    }),
    defineField({
      name: "intro",
      title: "Detail intro",
      type: "blockContent",
      group: "detail",
    }),
    defineField({
      name: "whatsIncluded",
      title: "What's Included",
      type: "array",
      group: "detail",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "title", type: "string", validation: (r) => r.required() },
            { name: "description", type: "text", rows: 2, validation: (r) => r.required() },
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
    }),
    defineField({
      name: "whyChooseUs",
      title: "Why Choose Us?",
      type: "object",
      group: "detail",
      fields: [
        { name: "body", type: "text", rows: 3 },
        { name: "bullets", type: "array", of: [defineArrayMember({ type: "string" })] },
        {
          name: "image",
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text" }],
        },
      ],
    }),
    defineField({
      name: "idealFor",
      title: "Ideal For",
      type: "object",
      group: "detail",
      fields: [
        { name: "items", type: "array", of: [defineArrayMember({ type: "string" })] },
        {
          name: "image",
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text" }],
        },
      ],
    }),
    defineField({
      name: "order",
      type: "number",
      group: "listing",
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: "Manual order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "shortDescription" },
  },
});
