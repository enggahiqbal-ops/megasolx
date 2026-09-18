import { DoubleQuoteIcon } from "@sanity/icons/DoubleQuote";
import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: DoubleQuoteIcon,
  fields: [
    defineField({ name: "quote", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role / company", type: "string" }),
    defineField({
      name: "avatar",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "order", type: "number", initialValue: 100 }),
  ],
  orderings: [
    { title: "Manual order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "avatar" },
  },
});
