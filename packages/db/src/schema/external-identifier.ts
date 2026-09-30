import {
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { mediaItem } from "./media-item.js";

export const externalIdentifier = pgTable(
  "external_identifier",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    mediaItemId: uuid("media_item_id")
      .notNull()
      .references(() => mediaItem.id, {
        onDelete: "cascade",
      }),

    source: varchar("source", { length: 50 }).notNull(),

    namespace: varchar("namespace", { length: 50 }).notNull(),

    externalId: text("external_id").notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("external_identifier_media_item_id_idx").on(table.mediaItemId),

    uniqueIndex(
      "external_identifier_source_namespace_external_id_uq",
    ).on(
      table.source,
      table.namespace,
      table.externalId,
    ),
  ],
);

export type ExternalIdentifier =
  typeof externalIdentifier.$inferSelect;

export type NewExternalIdentifier =
  typeof externalIdentifier.$inferInsert;