import { db } from "@/drizzle/db";
import { desktopTable } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    //session check
    const { userId } = await auth();
    if (!userId) return { error: "Unauthorized user" };

    //perform task

    const body = await req.json();
    const [res] = await db
      .insert(desktopTable)
      .values({
        ...body,
      })
      .returning({ id: desktopTable.id });

    if (!res.id) {
      return NextResponse.json({
        message: "Something went wrong",
      });
    }

    return NextResponse.json({
      message: "Product added successfully",
    });
  } catch (error) {
    console.error("POST /api/desktop_product error:", error);

    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    //session check
    const { userId } = await auth();
    if (!userId) return { error: "Unauthorized user" };

    //perform task

    const products = await db.select().from(desktopTable);

    return NextResponse.json({
      products,
      message: "Data fetched successfully",
    });
  } catch (error) {
    console.error("GET /api/desktop_product error:", error);

    return NextResponse.json({
      message: "Internal server error",
    });
  }
}
