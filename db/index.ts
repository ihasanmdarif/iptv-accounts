import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as users from "./schemas/users";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

export const connectionString = postgres(process.env.DATABASE_URL!, {
  max: 1,
  ssl: { rejectUnauthorized: false },
});

export const db = drizzle(connectionString, {
  schema: {
    ...users,
  },
});
