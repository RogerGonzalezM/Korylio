import {
  index,
  pgTable,
  primaryKey,
  uuid,
} from "drizzle-orm/pg-core";

import { mediaItem } from "./media-item.js";
import { platform } from "./platform.js";

export const mediaItemPlatform = pgTable(
  "media_item_platform",
  {
    mediaItemId: uuid("media_item_id")
      .notNull()
      .references(() => mediaItem.id, {
        onDelete: "cascade",
      }),

    platformId: uuid("platform_id")
      .notNull()
      .references(() => platform.id, {
        onDelete: "cascade",
      }),
  },
  (table) => [
    primaryKey({
      name: "media_item_platform_pk",
      columns: [table.mediaItemId, table.platformId],
    }),

    index("media_item_platform_platform_id_idx").on(
      table.platformId,
    ),
  ],
);

export type MediaItemPlatform =
  typeof mediaItemPlatform.$inferSelect;

export type NewMediaItemPlatform =
  typeof mediaItemPlatform.$inferInsert;