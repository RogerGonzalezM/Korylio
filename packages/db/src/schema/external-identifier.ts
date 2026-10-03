import { sql } from "drizzle-orm";

import {
  check,
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { mediaItem } from "./media-item.js";
import { mediaUnit } from "./media-unit.js";
import { organization } from "./organization.js";
import { person } from "./person.js";
import { platform } from "./platform.js";

export const externalIdentifier = pgTable(
  "external_identifier",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    mediaItemId: uuid("media_item_id").references(() => mediaItem.id, {
      onDelete: "cascade",
    }),

    mediaUnitId: uuid("media_unit_id").references(() => mediaUnit.id, {
      onDelete: "cascade",
    }),

    personId: uuid("person_id").references(() => person.id, {
      onDelete: "cascade",
    }),

    organizationId: uuid("organization_id").references(() => organization.id, {
      onDelete: "cascade",
    }),

    platformId: uuid("platform_id").references(() => platform.id, {
      onDelete: "cascade",
    }),

    source: varchar("source", { length: 50 }).notNull(),

    namespace: varchar("namespace", {
      length: 50,
    }).notNull(),

    externalId: text("external_id").notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("external_identifier_media_item_id_idx").on(table.mediaItemId),

    index("external_identifier_media_unit_id_idx").on(table.mediaUnitId),

    index("external_identifier_person_id_idx").on(table.personId),

    index("external_identifier_organization_id_idx").on(table.organizationId),

    index("external_identifier_platform_id_idx").on(table.platformId),

    uniqueIndex("external_identifier_source_namespace_external_id_uq").on(
      table.source,
      table.namespace,
      table.externalId,
    ),

    uniqueIndex("external_identifier_media_item_source_namespace_uq")
      .on(table.mediaItemId, table.source, table.namespace)
      .where(sql`${table.mediaItemId} is not null`),

    uniqueIndex("external_identifier_media_unit_source_namespace_uq")
      .on(table.mediaUnitId, table.source, table.namespace)
      .where(sql`${table.mediaUnitId} is not null`),

    uniqueIndex("external_identifier_person_source_namespace_uq")
      .on(table.personId, table.source, table.namespace)
      .where(sql`${table.personId} is not null`),

    uniqueIndex("external_identifier_organization_source_namespace_uq")
      .on(table.organizationId, table.source, table.namespace)
      .where(sql`${table.organizationId} is not null`),

    uniqueIndex("external_identifier_platform_source_namespace_uq")
      .on(table.platformId, table.source, table.namespace)
      .where(sql`${table.platformId} is not null`),

    check(
      "external_identifier_subject_xor_check",
      sql`
        num_nonnulls(
          ${table.mediaItemId},
          ${table.mediaUnitId},
          ${table.personId},
          ${table.organizationId},
          ${table.platformId}
        ) = 1
      `,
    ),

    check(
      "external_identifier_source_not_blank_check",
      sql`
        char_length(trim(${table.source})) > 0
      `,
    ),

    check(
      "external_identifier_namespace_not_blank_check",
      sql`
        char_length(trim(${table.namespace})) > 0
      `,
    ),

    check(
      "external_identifier_external_id_not_blank_check",
      sql`
        char_length(trim(${table.externalId})) > 0
      `,
    ),
  ],
);

export type ExternalIdentifier = typeof externalIdentifier.$inferSelect;

export type NewExternalIdentifier = typeof externalIdentifier.$inferInsert;
