import {
  boolean,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const mediaType = pgTable(
  "media_type",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    code: varchar("code", { length: 50 }).notNull(),

    name: varchar("name", { length: 100 }).notNull(),

    description: text("description"),

    isActive: boolean("is_active").notNull().default(true),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex("media_type_code_uq").on(table.code),
  ],
);

export type MediaType = typeof mediaType.$inferSelect;
export type NewMediaType = typeof mediaType.$inferInsert;
