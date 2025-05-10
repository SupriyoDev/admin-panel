import { BufferToBase64 } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import { db } from "@/drizzle/db";
import { laptopTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { LaptopDetails } from "@/app/_components/EditLaptop";
import { auth } from "@clerk/nextjs/server";

const imageFolder = "images";
const featureimageFolder = "feature-image";

export const config = {
  api: {
    bodyParser: false,
  },
};

// image compress
export async function ImageCompressor(
  image: File,
  maxWidth = 1920,
  quality = 80
) {
  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return sharp(buffer)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: quality })
    .toBuffer();
}

// upload to cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function UploadToCloudinary(image: string, folder: string) {
  const res = await cloudinary.uploader.upload(image, {
    folder: folder,
    format: "webp",
  });

  return res.secure_url;
}

//delete from cloudinary

export async function RemoveFromCloudinary(images: string[]) {
  const res = await cloudinary.api.delete_resources([...images]);

  return res;
}

//ROUTES

export async function POST(req: NextRequest) {
  try {
    //session check
    const { userId } = await auth();
    if (!userId) return { error: "Unauthorized user" };

    //perform task

    const data = await req.formData();

    const {
      brand,
      name,
      price,
      inventory,
      modelNo,
      description,
      ram,
      romsize,
      romtype,
      processor,
      useType,
    } = {
      name: data.get("name") as string,
      brand: data.get("brand") as string,
      price: Number(data.get("price")) as number,
      inventory: Number(data.get("inventory")) as number,
      modelNo: data.get("modelNo") as string,
      description: data.get("description") as string,
      ram: data.get("ram") as string,
      romsize: data.get("romsize") as string,
      romtype: data.get("romtype") as string,
      processor: data.get("processor") as string,
      useType: data.get("useType") as string,
    };

    // //handle feature image

    const featureImg = data.get("featureImage") as File;
    const compressedBuffer = await ImageCompressor(featureImg, 800, 65);
    const base64ImageString = await BufferToBase64(compressedBuffer);

    const featureImageUrl = await UploadToCloudinary(
      base64ImageString,
      featureimageFolder
    );

    //handle additional images
    const images = data.getAll("images") as File[];
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const compressImage = await ImageCompressor(image, 600, 65);
        const base64String = await BufferToBase64(compressImage);
        const imgUrl = await UploadToCloudinary(base64String, imageFolder);
        return imgUrl;
      })
    );

    try {
      await db.insert(laptopTable).values({
        brand,
        description,
        inventory,
        modelNo,
        processor,
        ram,
        price,
        romsize,
        romtype,
        name,
        useType,
        images: imageUrls,
        featureImage: featureImageUrl,
      });

      return NextResponse.json({
        message: "successful",
      });
    } catch (error) {
      return NextResponse.json({
        message: "error",
        error,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error" });
  }
}

//Get Laptop details

export async function GET() {
  try {
    //session check
    const { userId } = await auth();
    if (!userId) return { error: "Unauthorized user" };

    //perform task

    const res = await db.select().from(laptopTable);

    return NextResponse.json({
      message: "Laptop data fetched successfully",
      products: res,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
