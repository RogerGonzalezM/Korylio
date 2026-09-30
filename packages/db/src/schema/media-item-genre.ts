import {
  index,
  pgTable,
  primaryKey,
  uuid,
} from "drizzle-orm/pg-core";

import { genre } from "./genre.js";
import { mediaItem } from "./media-item.js";

export const mediaItemGenre = pgTable(
  "media_item_genre",
  {
    mediaItemId: uuid("media_item_id")
      .notNull()
      .references(() => mediaItem.id, {
        onDelete: "cascade",
      }),

    genreId: uuid("genre_id")
      .notNull()
      .references(() => genre.id, {
        onDelete: "cascade",
      }),
  },
  (table) => [
    primaryKey({
      name: "media_item_genre_pk",
      columns: [table.mediaItemId, table.genreId],
    }),

    index("media_item_genre_genre_id_idx").on(
      table.genreId,
    ),
  ],
);

export type MediaItemGenre =
  typeof mediaItemGenre.$inferSelect;

export type NewMediaItemGenre =
  typeof mediaItemGenre.$inferInsert;