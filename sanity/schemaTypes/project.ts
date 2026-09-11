import { CaseIcon } from "@sanity/icons/Case";
import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      description: "e.g. Digital Experience, Manufacturing",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "layout",
      type: "string",
      description: "Controls how the card sits in the work grid.",
      options: {
        list: [
          { title: "Landscape (full width)", value: "landscape" },
          { title: "Portrait (half width)", value: "portrait" },
        ],
        layout: "radio",
      },
      initialValue: "landscape",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "aspectRatio",
      type: "string",
      description: 'Card aspect ratio as "width/height", e.g. 1452/890.',
      initialValue: "1452/890",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "video",
      type: "file",
      description: "Optional looping showreel clip shown on the case-study page.",
      options: { accept: "video/*" },
    }),
    defineField({
      name: "poster",
      type: "image",
      description: "Poster frame used before the video plays / with reduced motion.",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "textColor",
      title: "Card text colour",
      type: "string",
      options: {
        list: [
          { title: "White", value: "white" },
          { title: "Black", value: "black" },
        ],
        layout: "radio",
      },
      initialValue: "white",
    }),
    defineField({
      name: "featured",
      type: "boolean",
      description: "Show on the homepage work grid.",
      initialValue: false,
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 100,
    }),
    defineField({ name: "body", type: "blockContent" }),
  ],
  orderings: [
    {
      title: "Manual order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
});
