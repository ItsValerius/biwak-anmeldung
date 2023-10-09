import db from "@/db/client";
import { orgs } from "@/db/schema/orgs";
import { customErrorMap } from "@/lib/customErrorMap";
import { createInsertSchema } from "drizzle-zod";
import { revalidatePath } from "next/cache";
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
  try {
    await db.insert(orgs).values(validated.data);
  } catch (err) {
    return Response.json(
      { message: "There was an error writing to the db" },
      { status: 500 },
    );
  }
  revalidatePath("/");
  return Response.json({ success: true }, { status: 200 });
}
