import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

const databaseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL
    : process.env.LOCAL_DATABASE_URL || process.env.DATABASE_URL;

// Use placeholder during build if no DB URL (drizzle-kit is only for migrations)
const dbUrl = databaseUrl || "postgresql://placeholder:placeholder@localhost:5432/placeholder";

export default defineConfig({
  schema: "./database/schema/*",
  out: "./database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl,
  },
  verbose: true,
  strict: true,
});

