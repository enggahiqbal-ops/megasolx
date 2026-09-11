import { CogIcon } from "@sanity/icons/Cog";
import type { StructureResolver } from "sanity/structure";

export const SINGLETONS = [
  { id: "siteSettings", type: "siteSettings", title: "Site Settings" },
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
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("article").title("Articles"),
      S.documentTypeListItem("expertise").title("Expertise"),
      S.documentTypeListItem("client").title("Client logos"),
      S.documentTypeListItem("service").title("Service groups"),
      S.documentTypeListItem("author").title("Authors"),
    ]);
