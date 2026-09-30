import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const genre = pgTable(
  "genre",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    name: text("name").notNull(),

    slug: varchar("slug", { length: 100 }).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("genre_slug_uq").on(table.slug),
  ],
);

export type Genre = typeof genre.$inferSelect;
export type NewGenre = typeof genre.$inferInsert;