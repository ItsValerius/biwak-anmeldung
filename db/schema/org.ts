import { varchar, pgTable, serial } from "drizzle-orm/pg-core";

export const orgs = pgTable("org", {
  id: serial("id").primaryKey(),
  name: varchar("name").unique().notNull(),
  contact_name: varchar("contact_name").notNull(),
  contact_mail: varchar("contact_mail").notNull(),
  schlachtruf: varchar("schlachtruf").notNull(),
  tollitäten: varchar("tollitäten"),
  description: varchar("description"),
});
