import { CaseIcon } from "@sanity/icons/Case";
import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: CaseIcon,
  groups: [
    { name: "listing", title: "Listing", default: true },
    { name: "detail", title: "Detail page" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
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
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
      group: "listing",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Category tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      group: "listing",
    }),
    defineField({
      name: "workBlurb",
      title: "Listing blurb",
      type: "text",
      rows: 4,
      group: "listing",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroVideoId",
      title: "Hero YouTube video ID",
      type: "string",
      group: "detail",
    }),
    defineField({ name: "client", type: "string", group: "detail" }),
    defineField({ name: "category", type: "string", group: "detail" }),
    defineField({ name: "location", type: "string", group: "detail" }),
    defineField({ name: "duration", type: "string", group: "detail" }),
    defineField({ name: "deliveryFormat", type: "string", group: "detail" }),
    defineField({
      name: "roleItems",
      title: "Our Role",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      group: "detail",
    }),
    defineField({ name: "about", title: "About the Project", type: "blockContent", group: "detail" }),
    defineField({ name: "behindTheScenes", title: "Behind the Scenes", type: "blockContent", group: "detail" }),
    defineField({ name: "creativeDirection", title: "Creative Direction", type: "blockContent", group: "detail" }),
    defineField({
      name: "results",
      title: "Results & Reach",
      type: "array",
      group: "detail",
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
    defineField({
      name: "gallery",
      type: "array",
      group: "detail",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text" }],
        }),
      ],
    }),
    defineField({
      name: "featured",
      type: "boolean",
      description: "Show on the homepage and /project index.",
      group: "listing",
      initialValue: true,
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower numbers appear first.",
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
    select: { title: "title", subtitle: "workBlurb", media: "coverImage" },
  },
});
