import { NextRequest, NextResponse } from "next/server";
import { ImageCompressor, UploadToCloudinary } from "../laptop/route";
import { BufferToBase64 } from "@/lib/utils";
import { v2 as cloudinary } from "cloudinary";
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { laptopTable } from "@/drizzle/schema";

// https://res.cloudinary.com/dgfqenqkj/image/upload/v1743083873/feature-image/elvfhozg1rtixnqcvgnh.webp
// From this we want to get the below --
// feature-image/elvfhozg1rtixnqcvgnh

function ExtractPublicId(urls: string[]) {
  return urls.map((url) => {
    const urlParts = url.split("/");
    const folder = urlParts[urlParts.length - 2];
    const filename = urlParts[urlParts.length - 1].split(".")[0];

    return `${folder}/${filename}`;
  });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    const id = data.get("id") as string;

    //call the database to get the image url

    const [{ featureImage, images }] = await db
      .select({
        images: laptopTable.images,
        featureImage: laptopTable.featureImage,
      })
      .from(laptopTable)
      .where(eq(laptopTable.id, id));

    //delete  all images from cloudinary

    const publicIds = ExtractPublicId([featureImage, ...images]);

    await cloudinary.api.delete_resources(publicIds, {
      resource_type: "image",
    });

    const featureImg = data.get("featureImage") as File;

    //handle feature Image
    const featureCompressed = await ImageCompressor(featureImg);
    const base64 = await BufferToBase64(featureCompressed);

    const newFeatureImgUrl = await UploadToCloudinary(base64, "feature-image");

    //hnadle images

    const imageFilesArray = data.getAll("images") as File[];

    const imagesurls = await Promise.all(
      imageFilesArray.map(async (image, i) => {
        const compressed = await ImageCompressor(image);
        const base64 = await BufferToBase64(compressed);

        return await UploadToCloudinary(base64, "images");
      })
    );

    // update the database

    await db
      .update(laptopTable)
      .set({ featureImage: newFeatureImgUrl, images: imagesurls })
      .where(eq(laptopTable.id, id));

    return NextResponse.json({
      message: "Image updated successfully",
    });
  } catch (error) {
    return NextResponse.json({
      message: "Internal server error",
    });
  }
}
