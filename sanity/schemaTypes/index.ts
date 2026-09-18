import type { SchemaTypeDefinition } from "sanity";

import { aboutPage } from "./aboutPage";
import { article } from "./article";
import { author } from "./author";
import { blockContent } from "./blockContent";
import { client } from "./client";
import { contactPage } from "./contactPage";
import { homePage } from "./homePage";
import { pricingPage } from "./pricingPage";
import { pricingPlan } from "./pricingPlan";
import { project } from "./project";
import { service } from "./service";
import { siteSettings } from "./siteSettings";
import { teamMember } from "./teamMember";
import { testimonial } from "./testimonial";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  siteSettings,
  homePage,
  aboutPage,
  contactPage,
  pricingPage,
  project,
  service,
  teamMember,
  client,
  testimonial,
  pricingPlan,
  article,
  author,
  // Objects
  blockContent,
];

export const schema = { types: schemaTypes };
