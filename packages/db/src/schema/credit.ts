import { sql } from "drizzle-orm";

import {
  check,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { mediaItem } from "./media-item.js";
import { organization } from "./organization.js";
import { person } from "./person.js";

export const credit = pgTable(
  "credit",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    mediaItemId: uuid("media_item_id")
      .notNull()
      .references(() => mediaItem.id, {
        onDelete: "cascade",
      }),

    personId: uuid("person_id")
      .references(() => person.id, {
        onDelete: "cascade",
      }),

    organizationId: uuid("organization_id")
      .references(() => organization.id, {
        onDelete: "cascade",
      }),

    role: varchar("role", { length: 100 }).notNull(),

    creditedAs: text("credited_as"),

    position: integer("position"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("credit_media_item_id_idx").on(table.mediaItemId),

    index("credit_person_id_idx").on(table.personId),

    index("credit_organization_id_idx").on(
      table.organizationId,
    ),

    check(
      "credit_subject_xor_check",
      sql`
        (
          ${table.personId} is not null
          and
          ${table.organizationId} is null
        )
        or
        (
          ${table.personId} is null
          and
          ${table.organizationId} is not null
        )
      `,
    ),
  ],
);

export type Credit = typeof credit.$inferSelect;
export type NewCredit = typeof credit.$inferInsert;