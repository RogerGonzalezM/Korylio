CREATE TABLE "media_item_title" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"media_item_id" uuid NOT NULL,
	"title" text NOT NULL,
	"locale" varchar(35) DEFAULT 'und' NOT NULL,
	"title_type" varchar(50) DEFAULT 'alternate' NOT NULL,
	"is_primary" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "media_item_title_not_blank_check" CHECK (
        char_length(trim("media_item_title"."title")) > 0
      )
);
--> statement-breakpoint
ALTER TABLE "external_identifier" ALTER COLUMN "media_item_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "media_item" ADD COLUMN "release_date" date;--> statement-breakpoint
ALTER TABLE "media_item" ADD COLUMN "end_date" date;--> statement-breakpoint
ALTER TABLE "media_item" ADD COLUMN "status" varchar(50);--> statement-breakpoint
ALTER TABLE "media_item" ADD COLUMN "original_language" varchar(35);--> statement-breakpoint
ALTER TABLE "media_item" ADD COLUMN "attributes" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "external_identifier" ADD COLUMN "media_unit_id" uuid;--> statement-breakpoint
ALTER TABLE "external_identifier" ADD COLUMN "person_id" uuid;--> statement-breakpoint
ALTER TABLE "external_identifier" ADD COLUMN "organization_id" uuid;--> statement-breakpoint
ALTER TABLE "external_identifier" ADD COLUMN "platform_id" uuid;--> statement-breakpoint
ALTER TABLE "credit" ADD COLUMN "media_unit_id" uuid;--> statement-breakpoint
ALTER TABLE "platform" ADD COLUMN "kind" varchar(50) DEFAULT 'other' NOT NULL;--> statement-breakpoint
ALTER TABLE "platform" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "platform" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "platform" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "media_unit" ADD COLUMN "original_title" text;--> statement-breakpoint
ALTER TABLE "media_unit" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "media_unit" ADD COLUMN "release_date" date;--> statement-breakpoint
ALTER TABLE "media_unit" ADD COLUMN "attributes" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "media_item_title" ADD CONSTRAINT "media_item_title_media_item_id_media_item_id_fk" FOREIGN KEY ("media_item_id") REFERENCES "public"."media_item"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "media_item_title_media_item_id_idx" ON "media_item_title" USING btree ("media_item_id");--> statement-breakpoint
CREATE INDEX "media_item_title_locale_idx" ON "media_item_title" USING btree ("locale");--> statement-breakpoint
CREATE UNIQUE INDEX "media_item_title_exact_uq" ON "media_item_title" USING btree ("media_item_id","locale","title_type","title");--> statement-breakpoint
CREATE UNIQUE INDEX "media_item_title_primary_locale_uq" ON "media_item_title" USING btree ("media_item_id","locale") WHERE "media_item_title"."is_primary" = true;--> statement-breakpoint
ALTER TABLE "external_identifier" ADD CONSTRAINT "external_identifier_media_unit_id_media_unit_id_fk" FOREIGN KEY ("media_unit_id") REFERENCES "public"."media_unit"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "external_identifier" ADD CONSTRAINT "external_identifier_person_id_person_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."person"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "external_identifier" ADD CONSTRAINT "external_identifier_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "external_identifier" ADD CONSTRAINT "external_identifier_platform_id_platform_id_fk" FOREIGN KEY ("platform_id") REFERENCES "public"."platform"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "credit" ADD CONSTRAINT "credit_media_unit_same_media_fk" FOREIGN KEY ("media_item_id","media_unit_id") REFERENCES "public"."media_unit"("media_item_id","id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "media_item_release_year_idx" ON "media_item" USING btree ("release_year");--> statement-breakpoint
CREATE INDEX "external_identifier_media_unit_id_idx" ON "external_identifier" USING btree ("media_unit_id");--> statement-breakpoint
CREATE INDEX "external_identifier_person_id_idx" ON "external_identifier" USING btree ("person_id");--> statement-breakpoint
CREATE INDEX "external_identifier_organization_id_idx" ON "external_identifier" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "external_identifier_platform_id_idx" ON "external_identifier" USING btree ("platform_id");--> statement-breakpoint
CREATE UNIQUE INDEX "external_identifier_media_item_source_namespace_uq" ON "external_identifier" USING btree ("media_item_id","source","namespace") WHERE "external_identifier"."media_item_id" is not null;--> statement-breakpoint
CREATE UNIQUE INDEX "external_identifier_media_unit_source_namespace_uq" ON "external_identifier" USING btree ("media_unit_id","source","namespace") WHERE "external_identifier"."media_unit_id" is not null;--> statement-breakpoint
CREATE UNIQUE INDEX "external_identifier_person_source_namespace_uq" ON "external_identifier" USING btree ("person_id","source","namespace") WHERE "external_identifier"."person_id" is not null;--> statement-breakpoint
CREATE UNIQUE INDEX "external_identifier_organization_source_namespace_uq" ON "external_identifier" USING btree ("organization_id","source","namespace") WHERE "external_identifier"."organization_id" is not null;--> statement-breakpoint
CREATE UNIQUE INDEX "external_identifier_platform_source_namespace_uq" ON "external_identifier" USING btree ("platform_id","source","namespace") WHERE "external_identifier"."platform_id" is not null;--> statement-breakpoint
CREATE INDEX "credit_media_unit_id_idx" ON "credit" USING btree ("media_unit_id");--> statement-breakpoint
CREATE INDEX "platform_kind_idx" ON "platform" USING btree ("kind");--> statement-breakpoint
CREATE INDEX "media_unit_release_date_idx" ON "media_unit" USING btree ("release_date");--> statement-breakpoint
ALTER TABLE "media_item" ADD CONSTRAINT "media_item_release_year_valid_check" CHECK (
        "media_item"."release_year" is null
        or
        "media_item"."release_year" between 0 and 9999
      );--> statement-breakpoint
ALTER TABLE "media_item" ADD CONSTRAINT "media_item_date_range_check" CHECK (
        "media_item"."release_date" is null
        or
        "media_item"."end_date" is null
        or
        "media_item"."end_date" >= "media_item"."release_date"
      );--> statement-breakpoint
ALTER TABLE "external_identifier" ADD CONSTRAINT "external_identifier_subject_xor_check" CHECK (
        num_nonnulls(
          "external_identifier"."media_item_id",
          "external_identifier"."media_unit_id",
          "external_identifier"."person_id",
          "external_identifier"."organization_id",
          "external_identifier"."platform_id"
        ) = 1
      );--> statement-breakpoint
ALTER TABLE "external_identifier" ADD CONSTRAINT "external_identifier_source_not_blank_check" CHECK (
        char_length(trim("external_identifier"."source")) > 0
      );--> statement-breakpoint
ALTER TABLE "external_identifier" ADD CONSTRAINT "external_identifier_namespace_not_blank_check" CHECK (
        char_length(trim("external_identifier"."namespace")) > 0
      );--> statement-breakpoint
ALTER TABLE "external_identifier" ADD CONSTRAINT "external_identifier_external_id_not_blank_check" CHECK (
        char_length(trim("external_identifier"."external_id")) > 0
      );--> statement-breakpoint
ALTER TABLE "credit" ADD CONSTRAINT "credit_role_not_blank_check" CHECK (
        char_length(trim("credit"."role")) > 0
      );--> statement-breakpoint
ALTER TABLE "credit" ADD CONSTRAINT "credit_position_non_negative_check" CHECK (
        "credit"."position" is null
        or
        "credit"."position" >= 0
      );

--> statement-breakpoint
INSERT INTO "media_item_title"
  (
    "media_item_id",
    "title",
    "locale",
    "title_type",
    "is_primary"
  )
SELECT
  "id",
  "title",
  'und',
  'primary',
  true
FROM "media_item"
WHERE trim("title") <> ''
ON CONFLICT DO NOTHING;

--> statement-breakpoint
INSERT INTO "media_item_title"
  (
    "media_item_id",
    "title",
    "locale",
    "title_type",
    "is_primary"
  )
SELECT
  "id",
  "original_title",
  'und',
  'original',
  false
FROM "media_item"
WHERE
  "original_title" IS NOT NULL
  AND trim("original_title") <> ''
  AND "original_title" <> "title"
ON CONFLICT DO NOTHING;

--> statement-breakpoint
INSERT INTO "media_type"
  ("code", "name", "description", "is_active")
VALUES
  ('movie', 'Movie', 'Feature films and other standalone motion pictures.', true),
  ('series', 'Series', 'Serialized audiovisual works.', true),
  ('book', 'Book', 'Books and other standalone written works.', true),
  ('video_game', 'Video Game', 'Interactive video games.', true),
  ('manga', 'Manga', 'Japanese-style sequential graphic works.', true),
  ('comic', 'Comic', 'Comics and graphic narrative works.', true),
  ('album', 'Album', 'Music albums and comparable music releases.', true),
  ('podcast', 'Podcast', 'Podcast programmes and serialized audio works.', true),
  ('course', 'Course', 'Structured educational courses.', true)
ON CONFLICT ("code") DO NOTHING;