CREATE TABLE "desktop_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"brand" varchar NOT NULL,
	"mrp" integer DEFAULT 5000,
	"price" double precision NOT NULL,
	"inventory" integer NOT NULL,
	"images" varchar[] NOT NULL,
	"category" varchar NOT NULL,
	"productCode" varchar NOT NULL,
	"description" text NOT NULL,
	"processorGenType" varchar,
	"motherboardChipset" varchar,
	"motherboardChipsetType" varchar,
	"graphicsCardSeries" varchar,
	"ramType" varchar,
	"ramByKit" varchar,
	"storageType" varchar,
	"storageSubType" varchar,
	"monitorType" varchar,
	"monitorSize" varchar
);
--> statement-breakpoint
CREATE TABLE "laptop_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"brand" text NOT NULL,
	"mrp" integer DEFAULT 50000,
	"price" double precision NOT NULL,
	"inventory" integer NOT NULL,
	"featureImage" varchar NOT NULL,
	"images" varchar[] NOT NULL,
	"modelNo" varchar NOT NULL,
	"description" text NOT NULL,
	"ram" varchar NOT NULL,
	"romsize" varchar NOT NULL,
	"romtype" varchar NOT NULL,
	"processor" varchar NOT NULL,
	"useType" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
