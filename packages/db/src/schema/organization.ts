import {
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const organization = pgTable("organization", {
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

export type Organization = typeof organization.$inferSelect;
export type NewOrganization =
  typeof organization.$inferInsert;
