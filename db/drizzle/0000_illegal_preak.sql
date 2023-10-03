CREATE TABLE IF NOT EXISTS "org" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"contact_name" varchar,
	"schlachtruf" varchar,
	"tollitäten" varchar,
	"description" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "timeslots" (
	"id" serial PRIMARY KEY NOT NULL,
	"time" time,
	"org_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "timeslots" ADD CONSTRAINT "timeslots_org_id_org_id_fk" FOREIGN KEY ("org_id") REFERENCES "org"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
