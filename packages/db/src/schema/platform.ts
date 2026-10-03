import {
  boolean,
  index,
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

    kind: varchar("kind", { length: 50 }).notNull().default("other"),

    description: text("description"),

    isActive: boolean("is_active").notNull().default(true),

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
    uniqueIndex("platform_slug_uq").on(table.slug),

    index("platform_kind_idx").on(table.kind),
  ],
);

export type Platform = typeof platform.$inferSelect;
export type NewPlatform = typeof platform.$inferInsert;
