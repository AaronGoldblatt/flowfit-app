import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as dotenv from "dotenv";
import * as schema from "./schema";

dotenv.config();

const databaseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL
    : process.env.LOCAL_DATABASE_URL || process.env.DATABASE_URL;

// During build, use a placeholder if no DB URL is available
// This won't be used since build doesn't actually connect to the DB
const connectionString = databaseUrl || "postgresql://placeholder:placeholder@localhost:5432/placeholder";

const pool = new Pool({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production" && databaseUrl
      ? { rejectUnauthorized: false }
      : false,
});

export const db = drizzle(pool, { schema });

