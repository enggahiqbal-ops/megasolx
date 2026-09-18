import { CogIcon } from "@sanity/icons/Cog";
import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { HomeIcon } from "@sanity/icons/Home";
import { TagIcon } from "@sanity/icons/Tag";
import { UsersIcon } from "@sanity/icons/Users";
import type { StructureResolver } from "sanity/structure";

export const SINGLETONS = [
  { id: "siteSettings", type: "siteSettings", title: "Site Settings" },
  { id: "homePage", type: "homePage", title: "Home Page" },
  { id: "aboutPage", type: "aboutPage", title: "About Page" },
  { id: "contactPage", type: "contactPage", title: "Contact Page" },
  { id: "pricingPage", type: "pricingPage", title: "Pricing Page" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .icon(CogIcon)
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.listItem()
        .title("Home Page")
        .icon(HomeIcon)
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("About Page")
        .icon(UsersIcon)
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.listItem()
        .title("Contact Page")
        .icon(EnvelopeIcon)
        .child(
          S.document().schemaType("contactPage").documentId("contactPage"),
        ),
      S.listItem()
        .title("Pricing Page")
        .icon(TagIcon)
        .child(
          S.document().schemaType("pricingPage").documentId("pricingPage"),
        ),
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("teamMember").title("Team"),
      S.documentTypeListItem("client").title("Client logos"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("pricingPlan").title("Pricing plans"),
      S.divider(),
      S.documentTypeListItem("article").title("Blog posts"),
      S.documentTypeListItem("author").title("Authors"),
    ]);
