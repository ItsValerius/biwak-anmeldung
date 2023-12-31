import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { timeslots } from "./timeslots";

export const orgs = pgTable("org", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  contact_name: text("contact_name").notNull(),
  contact_mail: text("contact_mail").notNull(),
  schlachtruf: text("schlachtruf").notNull(),
  tollitäten: text("tollitäten"),
  description: text("description"),
  timeslotId: integer("timeslot_id")
    .references(() => timeslots.id)
    .unique()
    .notNull(),
});
