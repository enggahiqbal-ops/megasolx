import { UsersIcon } from "@sanity/icons/Users";
import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroStatement",
      title: "Intro paragraph",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "secondaryStatement",
      title: "Second paragraph",
      type: "text",
      rows: 4,
    }),
    defineField({ name: "statsHeading", title: "Stats section heading", type: "string" }),
    defineField({
      name: "stats",
      title: "Achievement stats",
      type: "array",
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
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
