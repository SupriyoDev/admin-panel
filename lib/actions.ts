"use server";

import { db } from "@/drizzle/db";
import { desktopTable, laptopTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { ExtractPublicId } from "./utils";
import { config } from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";

config();

cloudinary.config({
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!,
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
});

export async function DeleteProductAction(data: FormData) {
  try {
    const { userId } = await auth();
    if (!userId) return { error: "Unauthorized user" };
    //get data
    const desktop_product_id = String(data.get("product_id"));

    const [res] = await db
      .delete(desktopTable)
      .where(eq(desktopTable.id, desktop_product_id))
      .returning({ images: desktopTable.images });

    const publicIds = ExtractPublicId(res.images);

    await cloudinary.api.delete_resources(publicIds);

    revalidatePath("/admin/category");

    return {
      message: "Deleted successfully",
    };
  } catch (error) {
    return { error: "Something went wrong" };
  }
}

export async function EditProductAction() {}

export async function UpdateProductPriceAction(data: FormData) {
  try {
    const { userId } = await auth();
    if (!userId) return { error: "Unauthorized user" };

    const price = Number(data.get("price"));
    const productId = String(data.get("product_id"));

    await db
      .update(desktopTable)
      .set({
        price,
      })
      .where(eq(desktopTable.id, productId));

    revalidatePath("/admin/category");

    return {
      message: "Price updated successfully!",
    };
  } catch (error) {
    return { error: "Something went wrong" };
  }
}

export async function updateLaptopPriceAction(data: FormData) {
  try {
    const { userId } = await auth();
    if (!userId) return { error: "Unauthorized user" };

    // get data
    const laptopPrice = Number(data.get("laptop_price"));
    const laptopId = String(data.get("laptop_id"));

    await db
      .update(laptopTable)
      .set({
        price: laptopPrice,
      })
      .where(eq(laptopTable.id, laptopId));

    revalidatePath("/admin/allLaptop");
    return {
      message: "Laptop price updated successfully!",
    };
  } catch (error) {
    return { error: "Something went wrong" };
  }
}

export async function deleteLaptopAction(data: FormData) {
  try {
    const { userId } = await auth();
    if (!userId) return { error: "Unauthorized user" };

    const laptop_id = String(data.get("laptop_id"));

    await db.delete(laptopTable).where(eq(laptopTable.id, laptop_id));

    return { message: "Laptop deleted successfully!" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
}
