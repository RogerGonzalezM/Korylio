import { sql } from "drizzle-orm";

import {
  check,
  index,
  pgTable,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { mediaItem } from "./media-item.js";

export const mediaRelation = pgTable(
  "media_relation",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    sourceMediaItemId: uuid("source_media_item_id")
      .notNull()
      .references(() => mediaItem.id, {
        onDelete: "cascade",
      }),

    targetMediaItemId: uuid("target_media_item_id")
      .notNull()
      .references(() => mediaItem.id, {
        onDelete: "cascade",
      }),

    relationType: varchar("relation_type", {
      length: 50,
    }).notNull(),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("media_relation_source_idx").on(
      table.sourceMediaItemId,
    ),

    index("media_relation_target_idx").on(
      table.targetMediaItemId,
    ),

    unique("media_relation_unique").on(
      table.sourceMediaItemId,
      table.targetMediaItemId,
      table.relationType,
    ),

    check(
      "media_relation_no_self_relation_check",
      sql`
        ${table.sourceMediaItemId}
        <>
        ${table.targetMediaItemId}
      `,
    ),
  ],
);

export type MediaRelation =
  typeof mediaRelation.$inferSelect;

export type NewMediaRelation =
  typeof mediaRelation.$inferInsert;