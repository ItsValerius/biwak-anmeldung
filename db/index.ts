import { migrate } from "drizzle-orm/postgres-js/migrator";
import db from "./client";
const doMigration = async () => {
  try {
    await migrate(db, { migrationsFolder: "db/drizzle/migrations" });
    console.log("Successfully migrated");
  } catch (err) {
    console.log("There was an error migrating");
    console.log(err);
    return;
  }
};
doMigration();
