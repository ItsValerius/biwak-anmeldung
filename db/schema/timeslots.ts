import { time, pgTable, serial } from "drizzle-orm/pg-core";

export const timeslots = pgTable("timeslots", {
  id: serial("id").primaryKey(),
  time: time("timeslot").unique().notNull(),
});
