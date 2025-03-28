import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./drizzle/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://ueb6hu:xau_iInCMLHMH3duHUCvufsGbDGe2vLWr5Cs0@us-east-1.sql.xata.sh/infotech:main?sslmode=require",
  },
});
