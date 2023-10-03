ALTER TABLE "timeslots" DROP CONSTRAINT "timeslots_org_id_org_id_fk";
--> statement-breakpoint
ALTER TABLE "org" ADD COLUMN "timeslot_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org" ADD CONSTRAINT "org_timeslot_id_timeslots_id_fk" FOREIGN KEY ("timeslot_id") REFERENCES "timeslots"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "timeslots" DROP COLUMN IF EXISTS "org_id";