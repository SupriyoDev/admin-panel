// drizzle/seed.ts

import { db } from "@/drizzle/db";
import { desktopTable, laptopTable } from "@/drizzle/schema";
import { v4 as uuidv4 } from "uuid";

const brands = ["amd", "intel", "acer", "corsair", "benq", "lg"];

const seedProducts = [
  // Processors
  ...Array.from({ length: 5 }, (_, i) => ({
    id: uuidv4(),
    name: `Processor ${i + 1} - ${brands[i]}`,
    brand: brands[i],
    category: "processor",
    description:
      "High-performance CPU with multithreading and overclocking support.",
    price: 11000 + i * 1000,
    inventory: 100,
    images: [`https://example.com/cpu-${i + 1}.webp`],
    productCode: `CPU-${brands[i].toUpperCase()}-${i + 1}`,
    processorGenType: `gen-${i + 1}`,
  })),

  // Graphics Cards
  ...Array.from({ length: 5 }, (_, i) => ({
    id: uuidv4(),
    name: `Graphics Card ${i + 1} - ${brands[i]}`,
    brand: brands[i],
    category: "graphics-card",
    description: "High-end GPU with cutting-edge cooling and performance.",
    price: 70000 + i * 3000,
    inventory: 50,
    images: [`https://example.com/gpu-${i + 1}.webp`],
    productCode: `GPU-${brands[i].toUpperCase()}-${i + 1}`,
    graphicsCardSeries: `series-${i + 1}`,
  })),

  // Motherboards
  ...Array.from({ length: 5 }, (_, i) => ({
    id: uuidv4(),
    name: `Motherboard ${i + 1} - ${brands[i]}`,
    brand: brands[i],
    category: "motherboard",
    description:
      "Feature-rich motherboard supporting latest chipsets and connectivity.",
    price: 8500 + i * 500,
    inventory: 200,
    images: [`https://example.com/mobo-${i + 1}.webp`],
    productCode: `MOBO-${brands[i].toUpperCase()}-${i + 1}`,
    motherboardChipset: `chipset-${i + 1}`,
    motherboardChipsetType: i % 2 === 0 ? "amd" : "intel",
  })),

  // RAM
  ...Array.from({ length: 5 }, (_, i) => ({
    id: uuidv4(),
    name: `RAM ${i + 1} - ${brands[i]}`,
    brand: brands[i],
    category: "ram",
    description: "High-speed DDR5 RAM with customizable RGB and low latency.",
    price: 12000 + i * 500,
    inventory: 300,
    images: [`https://example.com/ram-${i + 1}.webp`],
    productCode: `RAM-${brands[i].toUpperCase()}-${i + 1}`,
    ramType: "ddr5",
    ramByKit: "desktop",
  })),

  // Storage
  ...Array.from({ length: 5 }, (_, i) => ({
    id: uuidv4(),
    name: `Storage ${i + 1} - ${brands[i]}`,
    brand: brands[i],
    category: "storage",
    description: "Fast NVMe Gen4 SSD with excellent thermal design.",
    price: 8000 + i * 400,
    inventory: 150,
    images: [`https://example.com/ssd-${i + 1}.webp`],
    productCode: `SSD-${brands[i].toUpperCase()}-${i + 1}`,
    storageType: "ssd",
    storageSubType: "nvme-gen4-ssd",
  })),
];

const SampleLaptops = [
  {
    brand: "acer",
    name: "Samsung Galaxy Book4 Intel Core Thin & Light Laptop",
    description:
      "With a 13th-generation Intel Core CPU for fluid productivity, up to 1 TB of SSD storage, and Intel Xe graphics for entertainment, the Samsung Galaxy Book4 laptop is a great device. Its stylish aluminium body weighs only 1.55 kg, and its 39.62 cm (15.6) Full HD display is part of it. There are ports for RJ45, HDMI, microSD, USB-A, and USB-C connectivity. Ensured productivity on the move, the little charger is compatible with other Samsung Galaxy smartphones. Make use of Dolby Atmos speakers for immersive audio. The seamless device integration provided by the Galaxy ecosystem boosts productivity and creativity. Utilise the excellent camera on your Galaxy phone for video chats, and use File Explorer to access phone files. Old photographs are given new life by AI-powered Photo Remaster, and cross-device video editing is possible with Samsung Studio. Quick Share and Phone Link make it simple to share files and view them on your phone from your PC, while Multi Control increases productivity by allowing you to navigate between devices.",
    featureImage:
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559028/feature-image/t0bqqgg5xc0vsziaqfn6.webp",
    images: [
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559029/images/kc66ecpzdpcykvzxi5hf.webp",
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559029/images/freipfpclwohxmcmzdew.webp",
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559030/images/ieqfa7kpaddulbqv65n9.webp",
    ],
    id: uuidv4(),
    inventory: 100,
    modelNo: "NP750XGJ-KG2IN",
    price: 61000,
    processor: "intel-12",
    ram: "8gb",
    romsize: "512gb",
    romtype: "sata",
    useType: "multitasking",
  },
  {
    brand: "asus",
    name: "Samsung Galaxy Book4 Intel Core Thin & Light Laptop",
    description:
      "With a 13th-generation Intel Core CPU for fluid productivity, up to 1 TB of SSD storage, and Intel Xe graphics for entertainment, the Samsung Galaxy Book4 laptop is a great device. Its stylish aluminium body weighs only 1.55 kg, and its 39.62 cm (15.6) Full HD display is part of it. There are ports for RJ45, HDMI, microSD, USB-A, and USB-C connectivity. Ensured productivity on the move, the little charger is compatible with other Samsung Galaxy smartphones. Make use of Dolby Atmos speakers for immersive audio. The seamless device integration provided by the Galaxy ecosystem boosts productivity and creativity. Utilise the excellent camera on your Galaxy phone for video chats, and use File Explorer to access phone files. Old photographs are given new life by AI-powered Photo Remaster, and cross-device video editing is possible with Samsung Studio. Quick Share and Phone Link make it simple to share files and view them on your phone from your PC, while Multi Control increases productivity by allowing you to navigate between devices.",
    featureImage:
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559028/feature-image/t0bqqgg5xc0vsziaqfn6.webp",
    images: [
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559029/images/kc66ecpzdpcykvzxi5hf.webp",
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559029/images/freipfpclwohxmcmzdew.webp",
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559030/images/ieqfa7kpaddulbqv65n9.webp",
    ],
    id: uuidv4(),
    inventory: 100,
    modelNo: "NP750XGJ-KG2IN",
    price: 61000,
    processor: "intel-12",
    ram: "16gb",
    romsize: "512gb",
    romtype: "sata",
    useType: "multitasking",
  },
  {
    brand: "dell",
    name: "Samsung Galaxy Book4 Intel Core Thin & Light Laptop",
    description:
      "With a 13th-generation Intel Core CPU for fluid productivity, up to 1 TB of SSD storage, and Intel Xe graphics for entertainment, the Samsung Galaxy Book4 laptop is a great device. Its stylish aluminium body weighs only 1.55 kg, and its 39.62 cm (15.6) Full HD display is part of it...",
    featureImage:
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559028/feature-image/t0bqqgg5xc0vsziaqfn6.webp",
    images: [
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559029/images/kc66ecpzdpcykvzxi5hf.webp",
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559029/images/freipfpclwohxmcmzdew.webp",
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559030/images/ieqfa7kpaddulbqv65n9.webp",
    ],
    id: uuidv4(),
    inventory: 100,
    modelNo: "NP750XGJ-KG2IN",
    price: 61000,
    processor: "intel-12",
    ram: "8gb",
    romsize: "512gb",
    romtype: "sata",
    useType: "multitasking",
  },
  {
    brand: "samsung",
    name: "Samsung Galaxy Book4 Intel Core Thin & Light Laptop",
    description:
      "With a 13th-generation Intel Core CPU for fluid productivity, up to 1 TB of SSD storage, and Intel Xe graphics for entertainment, the Samsung Galaxy Book4 laptop is a great device...",
    featureImage:
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559028/feature-image/t0bqqgg5xc0vsziaqfn6.webp",
    images: [
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559029/images/kc66ecpzdpcykvzxi5hf.webp",
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559029/images/freipfpclwohxmcmzdew.webp",
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559030/images/ieqfa7kpaddulbqv65n9.webp",
    ],
    id: uuidv4(),
    inventory: 100,
    modelNo: "NP750XGJ-KG2IN",
    price: 61000,
    processor: "intel-12",
    ram: "16gb",
    romsize: "512gb",
    romtype: "sata",
    useType: "multitasking",
  },
  {
    brand: "acer",
    name: "Samsung Galaxy Book4 Intel Core Thin & Light Laptop",
    description:
      "With a 13th-generation Intel Core CPU for fluid productivity, up to 1 TB of SSD storage, and Intel Xe graphics for entertainment, the Samsung Galaxy Book4 laptop is a great device...",
    featureImage:
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559028/feature-image/t0bqqgg5xc0vsziaqfn6.webp",
    images: [
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559029/images/kc66ecpzdpcykvzxi5hf.webp",
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559029/images/freipfpclwohxmcmzdew.webp",
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559030/images/ieqfa7kpaddulbqv65n9.webp",
    ],
    id: uuidv4(),
    inventory: 100,
    modelNo: "NP750XGJ-KG2IN",
    price: 61000,
    processor: "intel-12",
    ram: "8gb",
    romsize: "512gb",
    romtype: "sata",
    useType: "multitasking",
  },
  {
    brand: "asus",
    name: "Samsung Galaxy Book4 Intel Core Thin & Light Laptop",
    description:
      "With a 13th-generation Intel Core CPU for fluid productivity, up to 1 TB of SSD storage, and Intel Xe graphics for entertainment, the Samsung Galaxy Book4 laptop is a great device...",
    featureImage:
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559028/feature-image/t0bqqgg5xc0vsziaqfn6.webp",
    images: [
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559029/images/kc66ecpzdpcykvzxi5hf.webp",
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559029/images/freipfpclwohxmcmzdew.webp",
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559030/images/ieqfa7kpaddulbqv65n9.webp",
    ],
    id: uuidv4(),
    inventory: 100,
    modelNo: "NP750XGJ-KG2IN",
    price: 61000,
    processor: "intel-12",
    ram: "16gb",
    romsize: "512gb",
    romtype: "sata",
    useType: "multitasking",
  },
  {
    brand: "dell",
    name: "Samsung Galaxy Book4 Intel Core Thin & Light Laptop",
    description:
      "With a 13th-generation Intel Core CPU for fluid productivity, up to 1 TB of SSD storage, and Intel Xe graphics for entertainment, the Samsung Galaxy Book4 laptop is a great device...",
    featureImage:
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559028/feature-image/t0bqqgg5xc0vsziaqfn6.webp",
    images: [
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559029/images/kc66ecpzdpcykvzxi5hf.webp",
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559029/images/freipfpclwohxmcmzdew.webp",
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559030/images/ieqfa7kpaddulbqv65n9.webp",
    ],
    id: uuidv4(),
    inventory: 100,
    modelNo: "NP750XGJ-KG2IN",
    price: 61000,
    processor: "intel-12",
    ram: "8gb",
    romsize: "512gb",
    romtype: "sata",
    useType: "multitasking",
  },
  {
    brand: "samsung",
    name: "Samsung Galaxy Book4 Intel Core Thin & Light Laptop",
    description:
      "With a 13th-generation Intel Core CPU for fluid productivity, up to 1 TB of SSD storage, and Intel Xe graphics for entertainment, the Samsung Galaxy Book4 laptop is a great device...",
    featureImage:
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559028/feature-image/t0bqqgg5xc0vsziaqfn6.webp",
    images: [
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559029/images/kc66ecpzdpcykvzxi5hf.webp",
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559029/images/freipfpclwohxmcmzdew.webp",
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559030/images/ieqfa7kpaddulbqv65n9.webp",
    ],
    id: uuidv4(),
    inventory: 100,
    modelNo: "NP750XGJ-KG2IN",
    price: 61000,
    processor: "intel-12",
    ram: "16gb",
    romsize: "512gb",
    romtype: "sata",
    useType: "multitasking",
  },
  {
    brand: "acer",
    name: "Samsung Galaxy Book4 Intel Core Thin & Light Laptop",
    description:
      "With a 13th-generation Intel Core CPU for fluid productivity, up to 1 TB of SSD storage, and Intel Xe graphics for entertainment, the Samsung Galaxy Book4 laptop is a great device...",
    featureImage:
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559028/feature-image/t0bqqgg5xc0vsziaqfn6.webp",
    images: [
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559029/images/kc66ecpzdpcykvzxi5hf.webp",
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559029/images/freipfpclwohxmcmzdew.webp",
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559030/images/ieqfa7kpaddulbqv65n9.webp",
    ],
    id: uuidv4(),
    inventory: 100,
    modelNo: "NP750XGJ-KG2IN",
    price: 61000,
    processor: "intel-12",
    ram: "8gb",
    romsize: "512gb",
    romtype: "sata",
    useType: "multitasking",
  },
  {
    brand: "asus",
    name: "Samsung Galaxy Book4 Intel Core Thin & Light Laptop",
    description:
      "With a 13th-generation Intel Core CPU for fluid productivity, up to 1 TB of SSD storage, and Intel Xe graphics for entertainment, the Samsung Galaxy Book4 laptop is a great device...",
    featureImage:
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559028/feature-image/t0bqqgg5xc0vsziaqfn6.webp",
    images: [
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559029/images/kc66ecpzdpcykvzxi5hf.webp",
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559029/images/freipfpclwohxmcmzdew.webp",
      "https://res.cloudinary.com/dgfqenqkj/image/upload/v1744559030/images/ieqfa7kpaddulbqv65n9.webp",
    ],
    id: uuidv4(),
    inventory: 100,
    modelNo: "NP750XGJ-KG2IN",
    price: 61000,
    processor: "intel-12",
    ram: "16gb",
    romsize: "512gb",
    romtype: "sata",
    useType: "multitasking",
  },
];

async function seed() {
  console.log("Seeding database...");
  // await db.insert(desktopTable).values(seedProducts);
  await db.insert(laptopTable).values(SampleLaptops);
  console.log("Database seeded successfully!");
}

seed().catch((err) => {
  console.error("Seeding error:", err);
});
