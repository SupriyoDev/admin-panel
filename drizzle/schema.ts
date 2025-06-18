import {
  pgTable,
  uuid,
  varchar,
  doublePrecision,
  integer,
  text,
  unique,
  pgSequence,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const usersIdSeq = pgSequence("users_id_seq", {
  startWith: "1",
  increment: "1",
  minValue: "1",
  maxValue: "2147483647",
  cache: "1",
  cycle: false,
});

export const desktopTable = pgTable("desktop_table", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  name: varchar().notNull(),
  brand: varchar().notNull(),
  price: doublePrecision().notNull(),
  inventory: integer().notNull(),
  images: varchar().array().notNull(),
  category: varchar().notNull(),
  productCode: varchar().notNull(),
  description: text().notNull(),
  processorGenType: varchar(),
  motherboardChipset: varchar(),
  motherboardChipsetType: varchar(),
  graphicsCardSeries: varchar(),
  ramType: varchar(),
  ramByKit: varchar(),
  storageType: varchar(),
  storageSubType: varchar(),
  monitorType: varchar(),
  monitorSize: varchar(),
  mrp: integer().default(5000),
});

export const laptopTable = pgTable("laptop_table", {
  id: uuid().defaultRandom().primaryKey().notNull(),
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
  mrp: integer().default(50000),
});

export const users = pgTable(
  "users",
  {
    id: integer()
      .primaryKey()
      .generatedAlwaysAsIdentity({
        name: "23719894",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 2147483647,
      }),
    name: varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
    email: varchar({ length: 255 }).notNull(),
  },
  (table) => [unique("users_email_unique").on(table.email)]
);

export type DesktopProductResponse = typeof desktopTable.$inferSelect;
