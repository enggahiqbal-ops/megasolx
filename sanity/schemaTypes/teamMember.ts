import { UserIcon } from "@sanity/icons/User";
import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "photo",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "socials",
      type: "object",
      fields: [
        { name: "x", title: "X (Twitter)", type: "url" },
        { name: "linkedin", type: "url" },
        { name: "instagram", type: "url" },
        { name: "dribbble", type: "url" },
      ],
    }),
    defineField({ name: "order", type: "number", initialValue: 100 }),
  ],
  orderings: [
    { title: "Manual order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
