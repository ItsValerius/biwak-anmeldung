import { relations } from "drizzle-orm";
import { orgs } from "./org";
import { timeslots } from "./timeslots";

export const orgsRelation = relations(orgs, ({ one }) => ({
  timeslots: one(timeslots, {
    fields: [orgs.id],
    references: [timeslots.orgId],
  }),
}));
