ALTER TABLE "timeslots" RENAME COLUMN "time" TO "timeslot";--> statement-breakpoint
ALTER TABLE "timeslots" DROP CONSTRAINT "timeslots_time_unique";--> statement-breakpoint
ALTER TABLE "timeslots" ADD CONSTRAINT "timeslots_timeslot_unique" UNIQUE("timeslot");