import { UserIcon } from "@sanity/icons/User";
import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "avatar",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "name", media: "avatar" },
  },
});
