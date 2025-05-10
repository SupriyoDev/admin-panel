import * as z from "zod";

const MAX_SIZE = 2 * 1024 * 1024;
const MAX_FILES = 3;
const IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/jpg"];

export const featureImageSchema = z
  .instanceof(FileList)
  .refine((files) => files.length > 0, {
    message: "Please select at least one image file",
  })
  .refine((files) => files.length < 2, {
    message: `Max 1 images are allowed`,
  })
  .refine((files) => files[0]?.size <= MAX_SIZE, {
    message: `Max image size is ${MAX_SIZE / (1024 * 1024)}mb`,
  })
  .refine((files) => IMAGE_TYPES.includes(files[0]?.type), {
    message: "Only .jpg, .jpeg, .png and .webp formats are supported",
  });

export const galleryImagesSchema = z
  .instanceof(FileList)
  .refine((files) => files.length > 0, {
    message: "Please select at least one image file",
  })
  .refine((files) => files.length <= MAX_FILES, {
    message: `Max ${MAX_FILES} images are allowed`,
  })
  .refine(
    (files) => Array.from(files).every((file) => file?.size <= MAX_SIZE),
    {
      message: `Each images shouldn't exceed ${MAX_SIZE}mb`,
    }
  )
  .refine(
    (files) =>
      Array.from(files).every((file) => IMAGE_TYPES.includes(file?.type)),
    { message: "Only .jpg, .jpeg, .png and .webp formats are supported" }
  );

export const laptopFormSchema = z.object({
  name: z.string().min(3, "product name should be atleast 3 characters"),
  brand: z.string().min(2, "Brand name is required"),
  price: z
    .number({ message: "Enter the laptop price" })
    .min(1, "Enter the laptop price"),
  inventory: z
    .number({ message: " Total stocks in number" })
    .min(1, "Total stocks of this laptop"),
  featureImage: featureImageSchema,
  images: galleryImagesSchema,
  modelNo: z.string().min(3, { message: "Model no is required" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  ram: z.string({ message: "choose the ram size" }),
  romsize: z.string({ message: "choose the storage size" }),
  romtype: z.string({ message: "choose the storage type" }),
  processor: z.string().min(1, { message: "choose processor name " }),
  useType: z.string({ message: "choose the usage type" }),
});

export type LaptopformType = z.infer<typeof laptopFormSchema>;
export type singleImageSchema = z.infer<typeof featureImageSchema>;
export type MultipleImageSchema = z.infer<typeof galleryImagesSchema>;

export type laptopResponseType = {
  id: string;
  name: string;
  brand: string;
  price: number;
  inventory: number;
  featureImage: string;
  images: string[];
  modelNo: string;
  description: string;
  ram: string;
  romsize: string;
  romtype: string;
  processor: string;
  useType: string;
};

export const laptopDetailsSchema = z.object({
  name: z.string().min(3, "product name should be atleast 3 characters"),
  brand: z.string().min(2, "Brand name is required"),
  price: z
    .number({ message: "Enter the laptop price" })
    .min(1, "Enter the laptop price"),
  inventory: z
    .number({ message: " Total stocks in number" })
    .min(1, "Total stocks of this laptop"),

  modelNo: z.string().min(3, { message: "Model no is required" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  ram: z.string({ message: "choose the ram size" }),
  romsize: z.string({ message: "choose the storage size" }),
  romtype: z.string({ message: "choose the storage type" }),
  processor: z.string().min(1, { message: "choose processor name " }),
  useType: z.string({ message: "choose the usage type" }),
});

export const laptopImgsSchema = z.object({
  featureImage: featureImageSchema,
  images: galleryImagesSchema,
});

/// ALL SCHEMAS FOR DESKTOP CATEGORY PRODUCTS

export const baseSchema = z.object({
  name: z.string().min(3, "product name should be atleast 3 characters"),
  brand: z.string().min(2, "Brand name is required"),
  price: z
    .number({ message: "Enter the product price" })
    .min(1, "Enter the product price"),
  inventory: z
    .number({ message: " Total stocks in number" })
    .min(1, "Total stocks of this product"),

  productCode: z.string().min(1, { message: "product code is required" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
});

// For processor category
export const processorSchema = z.object({
  ...baseSchema.shape,
  category: z.literal("processor"),
  processorGenType: z.string().min(1, { message: "choose the processor type" }),
});

// For RAM category
export const ramSchema = z.object({
  ...baseSchema.shape,
  category: z.literal("ram"),
  ramType: z.string().min(1, { message: "choose the ram type" }),
  ramByKit: z.string().min(1, { message: "choose the ram by kit" }),
});

// For motherboard category
export const motherboardSchema = z.object({
  ...baseSchema.shape,
  category: z.literal("motherboard"),
  motherboardChipset: z
    .string()
    .min(1, { message: "choose the motherboard chipset" }),
  motherboardChipsetType: z
    .string()
    .min(1, { message: "choose the motherboard chipset type" }),
});

// For graphics card category
export const graphicsCardSchema = z.object({
  ...baseSchema.shape,
  category: z.literal("graphics-card"),
  graphicsCardSeries: z
    .string()
    .min(1, { message: "choose the graphics card series" }),
});

// For power supply category
export const powerSupplySchema = z.object({
  ...baseSchema.shape,
  category: z.literal("power-supply"),
  // smpsCertificationType: z
  //   .string()
  //   .min(1, { message: "choose the smps certification type" }),
});

// For monitor category
export const monitorSchema = z.object({
  ...baseSchema.shape,
  category: z.literal("monitor"),
  monitorType: z.string().min(1, { message: "choose the monitor type" }),
  monitorSize: z.string().min(1, { message: "choose the monitor size" }),
});

// For storage category
export const storageSchema = z.object({
  ...baseSchema.shape,
  category: z.literal("storage"),
  storageType: z.string().min(1, { message: "choose the storage type" }),
  storageSubType: z.string().min(1, { message: "choose the storage subtype" }),
});

// For base categories with no extra fields
// We need to create individual schemas for each type to work with discriminatedUnion
export const keyboardSchema = z.object({
  ...baseSchema.shape,
  category: z.literal("keyboard"),
});

export const mouseSchema = z.object({
  ...baseSchema.shape,
  category: z.literal("mouse"),
});

export const webcamSchema = z.object({
  ...baseSchema.shape,
  category: z.literal("webcam"),
});

export const headsetSchema = z.object({
  ...baseSchema.shape,
  category: z.literal("headset"),
});

export const speakerSchema = z.object({
  ...baseSchema.shape,
  category: z.literal("speaker"),
});

export const cabinetSchema = z.object({
  ...baseSchema.shape,
  category: z.literal("cabinet"),
});

export const cpuCoolerSchema = z.object({
  ...baseSchema.shape,
  category: z.literal("cpu-cooler"),
});

// Combine schemas for conditional validation
export const desktopProductFormSchema = z.discriminatedUnion("category", [
  processorSchema,
  ramSchema,
  motherboardSchema,
  graphicsCardSchema,
  powerSupplySchema,
  monitorSchema,
  storageSchema,
  keyboardSchema,
  mouseSchema,
  webcamSchema,
  headsetSchema,
  speakerSchema,
  cabinetSchema,
  cpuCoolerSchema,
]);

export type desktopProductType = z.infer<typeof desktopProductFormSchema>;

//  name: varchar().notNull(),
//   brand: varchar().notNull(),
//   price: doublePrecision().notNull(),
//   inventory: integer().notNull(),
//   images: varchar().array().notNull(),
//   category: varchar().notNull().$type<typeof categoryEnum>(),
//   productCode: varchar().notNull(),
//   description: text().notNull(),
//   processorGenType: varchar(),
//   motherboardChipset: varchar(),
//   motherboardChipsetType: varchar(),
//   graphicsCardSeries: varchar(),
//   ramType: varchar(),
//   ramByKit: varchar(),
//   storageType: varchar(),
//   storageSubType: varchar(),
//   smpsCertificationType: varchar(),
//   monitorType: varchar(),
//   monitorSize: varchar(),
//
// })
