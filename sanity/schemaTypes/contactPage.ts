import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { defineArrayMember, defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 3 }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "question", type: "string", validation: (r) => r.required() },
            { name: "answer", type: "text", rows: 3, validation: (r) => r.required() },
          ],
          preview: { select: { title: "question" } },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contact Page" };
    },
  },
});
