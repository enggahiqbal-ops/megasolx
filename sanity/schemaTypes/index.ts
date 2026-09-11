import type { SchemaTypeDefinition } from "sanity";

import { article } from "./article";
import { author } from "./author";
import { blockContent } from "./blockContent";
import { client } from "./client";
import { expertise } from "./expertise";
import { project } from "./project";
import { service } from "./service";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  siteSettings,
  project,
  article,
  author,
  expertise,
  client,
  service,
  // Objects
  blockContent,
];

export const schema = { types: schemaTypes };
