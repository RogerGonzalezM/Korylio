import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { mediaType } from "./media-type.js";

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
  ],
);

export type MediaItem = typeof mediaItem.$inferSelect;
export type NewMediaItem = typeof mediaItem.$inferInsert;
