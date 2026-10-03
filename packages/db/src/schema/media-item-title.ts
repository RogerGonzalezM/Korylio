import { sql } from "drizzle-orm";

import {
  boolean,
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

export const mediaItemTitle = pgTable(
  "media_item_title",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    mediaItemId: uuid("media_item_id")
      .notNull()
      .references(() => mediaItem.id, {
        onDelete: "cascade",
      }),

    title: text("title").notNull(),

    locale: varchar("locale", {
      length: 35,
    })
      .notNull()
      .default("und"),

    titleType: varchar("title_type", {
      length: 50,
    })
      .notNull()
      .default("alternate"),

    isPrimary: boolean("is_primary").notNull().default(false),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("media_item_title_media_item_id_idx").on(table.mediaItemId),

    index("media_item_title_locale_idx").on(table.locale),

    uniqueIndex("media_item_title_exact_uq").on(
      table.mediaItemId,
      table.locale,
      table.titleType,
      table.title,
    ),

    uniqueIndex("media_item_title_primary_locale_uq")
      .on(table.mediaItemId, table.locale)
      .where(sql`${table.isPrimary} = true`),

    check(
      "media_item_title_not_blank_check",
      sql`
        char_length(trim(${table.title})) > 0
      `,
    ),
  ],
);

export type MediaItemTitle = typeof mediaItemTitle.$inferSelect;

export type NewMediaItemTitle = typeof mediaItemTitle.$inferInsert;
