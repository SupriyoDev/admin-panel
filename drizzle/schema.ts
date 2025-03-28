import {
  doublePrecision,
  integer,
  pgTable,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { Text } from "lucide-react";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const laptopTable = pgTable("laptop_table", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  name: text().notNull(),
  brand: text().notNull(),
  price: doublePrecision().notNull(),
  inventory: integer().notNull(),
  featureImage: varchar().notNull(),
  images: varchar().array().notNull(),
  modelNo: varchar().notNull(),
  description: text().notNull(),
  ram: varchar().notNull(),
  romsize: varchar().notNull(),
  romtype: varchar().notNull(),
  processor: varchar().notNull(),
  useType: varchar().notNull(),
});
