CREATE TABLE "media_type" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar(50) NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media_item" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"media_type_id" uuid NOT NULL,
	"title" text NOT NULL,
	"original_title" text,
	"description" text,
	"release_year" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "external_identifier" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"media_item_id" uuid NOT NULL,
	"source" varchar(50) NOT NULL,
	"namespace" varchar(50) NOT NULL,
	"external_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "person" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"sort_name" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organization" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"sort_name" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "credit" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"media_item_id" uuid NOT NULL,
	"person_id" uuid,
	"organization_id" uuid,
	"role" varchar(100) NOT NULL,
	"credited_as" text,
	"position" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "credit_subject_xor_check" CHECK (
        (
          "credit"."person_id" is not null
          and
          "credit"."organization_id" is null
        )
        or
        (
          "credit"."person_id" is null
          and
          "credit"."organization_id" is not null
        )
      )
);
--> statement-breakpoint
CREATE TABLE "genre" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" varchar(100) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media_item_genre" (
	"media_item_id" uuid NOT NULL,
	"genre_id" uuid NOT NULL,
	CONSTRAINT "media_item_genre_pk" PRIMARY KEY("media_item_id","genre_id")
);
--> statement-breakpoint
CREATE TABLE "platform" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" varchar(100) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media_item_platform" (
	"media_item_id" uuid NOT NULL,
	"platform_id" uuid NOT NULL,
	CONSTRAINT "media_item_platform_pk" PRIMARY KEY("media_item_id","platform_id")
);
--> statement-breakpoint
CREATE TABLE "media_unit" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"media_item_id" uuid NOT NULL,
	"parent_unit_id" uuid,
	"unit_type" varchar(50) NOT NULL,
	"title" text,
	"number" varchar(50),
	"sequence" integer,
	"duration_seconds" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "media_unit_media_item_id_id_uq" UNIQUE("media_item_id","id"),
	CONSTRAINT "media_unit_not_own_parent_check" CHECK (
        "media_unit"."parent_unit_id" is null
        or
        "media_unit"."parent_unit_id" <> "media_unit"."id"
      ),
	CONSTRAINT "media_unit_sequence_non_negative_check" CHECK (
        "media_unit"."sequence" is null
        or
        "media_unit"."sequence" >= 0
      ),
	CONSTRAINT "media_unit_duration_positive_check" CHECK (
        "media_unit"."duration_seconds" is null
        or
        "media_unit"."duration_seconds" > 0
      )
);
--> statement-breakpoint
CREATE TABLE "media_relation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_media_item_id" uuid NOT NULL,
	"target_media_item_id" uuid NOT NULL,
	"relation_type" varchar(50) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "media_relation_unique" UNIQUE("source_media_item_id","target_media_item_id","relation_type"),
	CONSTRAINT "media_relation_no_self_relation_check" CHECK (
        "media_relation"."source_media_item_id"
        <>
        "media_relation"."target_media_item_id"
      )
);
--> statement-breakpoint
ALTER TABLE "media_item" ADD CONSTRAINT "media_item_media_type_id_media_type_id_fk" FOREIGN KEY ("media_type_id") REFERENCES "public"."media_type"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "external_identifier" ADD CONSTRAINT "external_identifier_media_item_id_media_item_id_fk" FOREIGN KEY ("media_item_id") REFERENCES "public"."media_item"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "credit" ADD CONSTRAINT "credit_media_item_id_media_item_id_fk" FOREIGN KEY ("media_item_id") REFERENCES "public"."media_item"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "credit" ADD CONSTRAINT "credit_person_id_person_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."person"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "credit" ADD CONSTRAINT "credit_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_item_genre" ADD CONSTRAINT "media_item_genre_media_item_id_media_item_id_fk" FOREIGN KEY ("media_item_id") REFERENCES "public"."media_item"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_item_genre" ADD CONSTRAINT "media_item_genre_genre_id_genre_id_fk" FOREIGN KEY ("genre_id") REFERENCES "public"."genre"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_item_platform" ADD CONSTRAINT "media_item_platform_media_item_id_media_item_id_fk" FOREIGN KEY ("media_item_id") REFERENCES "public"."media_item"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_item_platform" ADD CONSTRAINT "media_item_platform_platform_id_platform_id_fk" FOREIGN KEY ("platform_id") REFERENCES "public"."platform"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_unit" ADD CONSTRAINT "media_unit_media_item_id_media_item_id_fk" FOREIGN KEY ("media_item_id") REFERENCES "public"."media_item"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_unit" ADD CONSTRAINT "media_unit_parent_same_media_fk" FOREIGN KEY ("media_item_id","parent_unit_id") REFERENCES "public"."media_unit"("media_item_id","id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_relation" ADD CONSTRAINT "media_relation_source_media_item_id_media_item_id_fk" FOREIGN KEY ("source_media_item_id") REFERENCES "public"."media_item"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_relation" ADD CONSTRAINT "media_relation_target_media_item_id_media_item_id_fk" FOREIGN KEY ("target_media_item_id") REFERENCES "public"."media_item"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "media_type_code_uq" ON "media_type" USING btree ("code");--> statement-breakpoint
CREATE INDEX "media_item_media_type_id_idx" ON "media_item" USING btree ("media_type_id");--> statement-breakpoint
CREATE INDEX "external_identifier_media_item_id_idx" ON "external_identifier" USING btree ("media_item_id");--> statement-breakpoint
CREATE UNIQUE INDEX "external_identifier_source_namespace_external_id_uq" ON "external_identifier" USING btree ("source","namespace","external_id");--> statement-breakpoint
CREATE INDEX "credit_media_item_id_idx" ON "credit" USING btree ("media_item_id");--> statement-breakpoint
CREATE INDEX "credit_person_id_idx" ON "credit" USING btree ("person_id");--> statement-breakpoint
CREATE INDEX "credit_organization_id_idx" ON "credit" USING btree ("organization_id");--> statement-breakpoint
CREATE UNIQUE INDEX "genre_slug_uq" ON "genre" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "media_item_genre_genre_id_idx" ON "media_item_genre" USING btree ("genre_id");--> statement-breakpoint
CREATE UNIQUE INDEX "platform_slug_uq" ON "platform" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "media_item_platform_platform_id_idx" ON "media_item_platform" USING btree ("platform_id");--> statement-breakpoint
CREATE INDEX "media_unit_media_item_id_idx" ON "media_unit" USING btree ("media_item_id");--> statement-breakpoint
CREATE INDEX "media_unit_parent_unit_id_idx" ON "media_unit" USING btree ("parent_unit_id");--> statement-breakpoint
CREATE INDEX "media_relation_source_idx" ON "media_relation" USING btree ("source_media_item_id");--> statement-breakpoint
CREATE INDEX "media_relation_target_idx" ON "media_relation" USING btree ("target_media_item_id");