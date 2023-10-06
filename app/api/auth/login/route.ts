import db from "@/db/client";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { pbkdf2Sync } from "crypto";

export const POST = async (request: Request) => {
  const json = await request.json();
  const user = await db
    .select()
    .from(users)
    .where(eq(json.username, users.username))
    .limit(1)
    .execute();

  if (user.length === 0) return;
  const reqPWHex = pbkdf2Sync(
    json.password,
    user[0].salt,
    1000,
    64,
    "sha512",
  ).toString("hex");
  if (user[0].password === reqPWHex) {
    console.log("correct ");
    return Response.json({ name: user[0].username });
  }
};
