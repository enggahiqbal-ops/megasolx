import { CreditCardIcon } from "@sanity/icons/CreditCard";
import { defineArrayMember, defineField, defineType } from "sanity";

export const pricingPlan = defineType({
  name: "pricingPlan",
  title: "Pricing Plan",
  type: "document",
  icon: CreditCardIcon,
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "price", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "billingLabel",
      type: "string",
      description: 'e.g. "/project"',
      initialValue: "/project",
    }),
    defineField({ name: "description", type: "text", rows: 2 }),
    defineField({
      name: "features",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (r) => r.required().min(1),
    }),
    defineField({ name: "highlighted", type: "boolean", initialValue: false }),
    defineField({ name: "ctaLabel", type: "string", initialValue: "Get Started" }),
    defineField({ name: "order", type: "number", initialValue: 100 }),
  ],
  orderings: [
    { title: "Manual order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "price" },
  },
});
