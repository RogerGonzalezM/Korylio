import { sql } from "drizzle-orm";

import {
  check,
  date,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { mediaType } from "./media-type.js";

export type MediaItemAttributes = Record<string, unknown>;

export const mediaItem = pgTable(
  "media_item",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    mediaTypeId: uuid("media_type_id")
      .notNull()
      .references(() => mediaType.id, {
        onDelete: "restrict",
      }),

    title: text("title").notNull(),

    originalTitle: text("original_title"),

    description: text("description"),

    releaseYear: integer("release_year"),

    releaseDate: date("release_date"),

    endDate: date("end_date"),

    status: varchar("status", { length: 50 }),

    originalLanguage: varchar("original_language", {
      length: 35,
    }),

    attributes: jsonb("attributes")
      .$type<MediaItemAttributes>()
      .notNull()
      .default(sql`'{}'::jsonb`),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("media_item_media_type_id_idx").on(table.mediaTypeId),

    index("media_item_release_year_idx").on(table.releaseYear),

    check(
      "media_item_release_year_valid_check",
      sql`
        ${table.releaseYear} is null
        or
        ${table.releaseYear} between 0 and 9999
      `,
    ),

    check(
      "media_item_date_range_check",
      sql`
        ${table.releaseDate} is null
        or
        ${table.endDate} is null
        or
        ${table.endDate} >= ${table.releaseDate}
      `,
    ),
  ],
);

export type MediaItem = typeof mediaItem.$inferSelect;
export type NewMediaItem = typeof mediaItem.$inferInsert;
