import { varchar, pgTable, serial } from "drizzle-orm/pg-core";

export const orgs = pgTable("org", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
  contact_name: varchar("contact_name"),
  schlachtruf: varchar("schlachtruf"),
  tollitäten: varchar("tollitäten"),
  description: varchar("description"),
});
