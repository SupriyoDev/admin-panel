import { BufferToBase64 } from "@/app/_components/utils";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

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
  api_key: process.env.NEXT_PUBLIC_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_API_SECRET,
});

export async function UploadToCloudinary(image: string, folder: string) {
  const res = await cloudinary.uploader.upload(image, {
    folder: folder,
    format: "webp",
  });

  return res.secure_url;
}

//ROUTES

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    const allData = {
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
      "feature-image"
    );

    //handle additional images
    const images = data.getAll("images") as File[];
    const res = await Promise.all(
      images.map(async (image) => {
        const compressImage = await ImageCompressor(image, 600, 65);
        const base64String = await BufferToBase64(compressImage);
        const imgUrl = await UploadToCloudinary(base64String, "images");
        return imgUrl;
      })
    );

    return NextResponse.json({
      message: "successful",
      featureimgUrl: featureImageUrl,
      imgUrls: res,
    });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" });
  }
}
