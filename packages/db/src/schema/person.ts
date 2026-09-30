import {
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const person = pgTable("person", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: text("name").notNull(),

  sortName: text("sort_name"),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type Person = typeof person.$inferSelect;
export type NewPerson = typeof person.$inferInsert;
