import { time, pgTable, serial, integer } from "drizzle-orm/pg-core";
import { orgs } from "./orgs";

export const timeslots = pgTable("timeslots", {
  id: serial("id").primaryKey(),
  time: time("timeslot").unique().notNull(),
});
