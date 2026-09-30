import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const platform = pgTable(
  "platform",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    name: text("name").notNull(),

    slug: varchar("slug", { length: 100 }).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("platform_slug_uq").on(table.slug),
  ],
);

export type Platform = typeof platform.$inferSelect;
export type NewPlatform = typeof platform.$inferInsert;