import { sql } from "drizzle-orm";

import {
  check,
  foreignKey,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { mediaItem } from "./media-item.js";

export const mediaUnit = pgTable(
  "media_unit",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    mediaItemId: uuid("media_item_id")
      .notNull()
      .references(() => mediaItem.id, {
        onDelete: "cascade",
      }),

    parentUnitId: uuid("parent_unit_id"),

    unitType: varchar("unit_type", {
      length: 50,
    }).notNull(),

    title: text("title"),

    number: varchar("number", {
      length: 50,
    }),

    sequence: integer("sequence"),

    durationSeconds: integer("duration_seconds"),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("media_unit_media_item_id_idx").on(
      table.mediaItemId,
    ),

    index("media_unit_parent_unit_id_idx").on(
      table.parentUnitId,
    ),

    unique("media_unit_media_item_id_id_uq").on(
      table.mediaItemId,
      table.id,
    ),

    foreignKey({
      name: "media_unit_parent_same_media_fk",
      columns: [
        table.mediaItemId,
        table.parentUnitId,
      ],
      foreignColumns: [
        table.mediaItemId,
        table.id,
      ],
    }).onDelete("cascade"),

    check(
      "media_unit_not_own_parent_check",
      sql`
        ${table.parentUnitId} is null
        or
        ${table.parentUnitId} <> ${table.id}
      `,
    ),

    check(
      "media_unit_sequence_non_negative_check",
      sql`
        ${table.sequence} is null
        or
        ${table.sequence} >= 0
      `,
    ),

    check(
      "media_unit_duration_positive_check",
      sql`
        ${table.durationSeconds} is null
        or
        ${table.durationSeconds} > 0
      `,
    ),
  ],
);

export type MediaUnit = typeof mediaUnit.$inferSelect;
export type NewMediaUnit = typeof mediaUnit.$inferInsert;
