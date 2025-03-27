import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { usersTable, laptopTable } from "./schema";

const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_DATABASE_URL!,
  max: 20,
});
export const db = drizzle(pool, { schema: { usersTable, laptopTable } });
