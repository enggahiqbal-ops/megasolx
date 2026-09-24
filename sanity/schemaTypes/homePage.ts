import { HomeIcon } from "@sanity/icons/Home";
import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "coreServices", title: "Core services" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        {
          name: "headingWordPart1",
          title: "Heading, word part 1",
          description: 'e.g. "Str" (the split-word visual effect, part before the spacer)',
          type: "string",
          validation: (r) => r.required(),
        },
        {
          name: "headingWordPart2",
          title: "Heading, word part 2",
          description: 'e.g. "ong" (part after the spacer)',
          type: "string",
          validation: (r) => r.required(),
        },
        { name: "headingLine2", title: "Heading, second line", type: "string", validation: (r) => r.required() },
        { name: "intro", type: "text", rows: 3 },
        { name: "showreelVideoId", title: "Showreel YouTube video ID", type: "string" },
      ],
    }),
    defineField({
      name: "coreServices",
      title: "Core service section",
      type: "object",
      group: "coreServices",
      fields: [
        { name: "heading", type: "string" },
        { name: "intro", type: "text", rows: 3 },
        {
          name: "image",
          title: "Side image",
          description: "Cut-out image shown beside the service cards (transparent PNG works best).",
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text" }],
        },
        {
          name: "items",
          title: "Service cards",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                { name: "title", type: "string", validation: (r) => r.required() },
                { name: "description", type: "text", rows: 3, validation: (r) => r.required() },
                { name: "highlighted", type: "boolean", initialValue: false },
              ],
              preview: { select: { title: "title", subtitle: "description" } },
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home Page" };
    },
  },
});
