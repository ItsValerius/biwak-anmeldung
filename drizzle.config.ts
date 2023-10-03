import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();
if (!process.env.POSTGRES_URL) {
  throw new Error("DATABASE_URL is missing");
}

export default {
  schema: "./db/schema",
  out: "./db/drizzle/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL,
  },
} satisfies Config;
