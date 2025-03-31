import {
  doublePrecision,
  integer,
  pgEnum,
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

//desktop table

const categoryEnum = pgEnum("category", [
  "processor",
  "ram",
  "motherboard",
  "graphics-card",
  "power-supply",
  "cooling-system",
  "cabinet",
  "storage",
  "monitor",
  "keyboard",
  "mouse",
  "webcam",
  "headset",
  "speaker",
  "cabinet",
  "cpu-cooler",
]);

export const desktopTable = pgTable("desktop_table", {
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
});
