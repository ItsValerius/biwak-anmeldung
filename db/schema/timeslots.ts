import { time, pgTable, serial, integer } from "drizzle-orm/pg-core";
import { orgs } from "./org";

export const timeslots = pgTable("timeslots", {
  id: serial("id").primaryKey(),
  time: time("time"),
  orgId: integer("org_id").references(() => orgs.id),
});