import { sql } from "drizzle-orm";

import {
  check,
  foreignKey,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { mediaItem } from "./media-item.js";
import { mediaUnit } from "./media-unit.js";
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

    mediaUnitId: uuid("media_unit_id"),

    personId: uuid("person_id").references(() => person.id, {
      onDelete: "cascade",
    }),

    organizationId: uuid("organization_id").references(() => organization.id, {
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

    index("credit_media_unit_id_idx").on(table.mediaUnitId),

    index("credit_person_id_idx").on(table.personId),

    index("credit_organization_id_idx").on(table.organizationId),

    foreignKey({
      name: "credit_media_unit_same_media_fk",
      columns: [table.mediaItemId, table.mediaUnitId],
      foreignColumns: [mediaUnit.mediaItemId, mediaUnit.id],
    }).onDelete("cascade"),

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

    check(
      "credit_role_not_blank_check",
      sql`
        char_length(trim(${table.role})) > 0
      `,
    ),

    check(
      "credit_position_non_negative_check",
      sql`
        ${table.position} is null
        or
        ${table.position} >= 0
      `,
    ),
  ],
);

export type Credit = typeof credit.$inferSelect;
export type NewCredit = typeof credit.$inferInsert;
