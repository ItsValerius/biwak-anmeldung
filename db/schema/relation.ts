import { relations } from "drizzle-orm";
import { orgs } from "./org";

export const timeslotsRelation = relations(orgs, ({ one }) => ({
  orgs: one(orgs, {
    fields: [orgs.id],
    references: [orgs.timeslotId],
  }),
}));
