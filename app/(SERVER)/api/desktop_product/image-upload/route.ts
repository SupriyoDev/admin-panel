import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

const {
  NEXT_PUBLIC_CLOUDINARY_API_KEY,
  NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  NEXT_PUBLIC_CLOUD_NAME,
} = process.env;

cloudinary.config({
  cloud_name: NEXT_PUBLIC_CLOUD_NAME,
  api_key: NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

const imageFolder = "images";

export async function POST(req: NextRequest) {
  try {
    //session check
    const { userId } = await auth();
    if (!userId) return { error: "Unauthorized user" };

    //perform task

    const data = await req.formData();
    const images = data.getAll("product-images") as File[];

    const res = await Promise.all(
      images.map(async (image) => {
        //image compress
        const compressedBase64Image = await ImageCompressor(image);
        //upload to cloudinary
        const imageUrl = await UploadToCloudinary(compressedBase64Image);
        return imageUrl;
      })
    );

    return NextResponse.json({
      message: "Image upload successfully",
      imageUrls: res,
    });
  } catch (error) {
    return NextResponse.json({
      error,
      message: "Internal server error",
    });
  }
}

///Image compressor
export async function ImageCompressor(
  file: File,
  quality = 90,
  maxwidth = 800
) {
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const buffer = await sharp(fileBuffer)
    .resize({ width: maxwidth, withoutEnlargement: true })
    .webp({ quality: quality })
    .toBuffer();

  const dataUri = `data:image/webp;base64,${buffer.toString("base64")}`;
  return dataUri;
}

///UPLOAD TO CLOUDINARY

export async function UploadToCloudinary(file: string) {
  try {
    const res = await cloudinary.uploader.upload(file, {
      folder: imageFolder,
      allowed_formats: ["webp"],
      format: "webp",
      unique_filename: true,
    });

    return res.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error("image uploading error");
  }
}
