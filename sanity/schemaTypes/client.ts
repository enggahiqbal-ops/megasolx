import { UsersIcon } from "@sanity/icons/Users";
import { defineField, defineType } from "sanity";

export const client = defineType({
  name: "client",
  title: "Client logo",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      type: "image",
      description: "Preferably a monochrome SVG or PNG.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "width",
      type: "number",
      description: "Intrinsic logo width in px.",
      initialValue: 140,
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "height",
      type: "number",
      description: "Intrinsic logo height in px.",
      initialValue: 36,
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "order",
      type: "number",
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
    select: { title: "name", media: "logo" },
  },
});
