import { migrate } from "drizzle-orm/postgres-js/migrator";
import db from "./client";

await migrate(db, { migrationsFolder: "./drizzle" });