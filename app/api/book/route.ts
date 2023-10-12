import db from "@/db/client";
import { orgs } from "@/db/schema/orgs";
import { customErrorMap } from "@/lib/customErrorMap";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";
export async function POST(request: Request) {
  const json = await request.json();
  const orgSchema = createInsertSchema(orgs, {
    contact_mail: (schema) => schema.contact_mail.email(),
  }).omit({ id: true });
  z.setErrorMap(customErrorMap);
  const validated = orgSchema.safeParse(json);
  if (!validated.success) {
    return Response.json(validated.error.issues, { status: 500 });
  }

  if (
    (
      await db
        .select()
        .from(orgs)
        .where(eq(orgs.timeslotId, validated.data.timeslotId))
    ).length > 0
  ) {
    return Response.json(
      { success: false, message: "Timeslot wurde schon gebucht." },
      { status: 500 },
    );
  }

  try {
    await db.insert(orgs).values(validated.data);
  } catch (err) {
    console.log(err);
    return Response.json(
      {
        success: false,
        message:
          "Es gab einen Fehler beim buchen des Slots. Evtl. wurde euer Verein schon eingetragen.",
      },
      { status: 500 },
    );
  }

  return Response.json({ success: true }, { status: 200 });
}
