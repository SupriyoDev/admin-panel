import EditLaptop from "@/app/_components/EditLaptop";
import { db } from "@/drizzle/db";
import { laptopTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import React from "react";

const EditLaptopPage = async ({
  params,
}: {
  params: Promise<{
    laptopId: string;
  }>;
}) => {
  const { laptopId } = await params;

  const [laptop] = await db
    .select()
    .from(laptopTable)
    .where(eq(laptopTable.id, laptopId));

  return (
    <div>
      <EditLaptop laptop={laptop} />
    </div>
  );
};

export default EditLaptopPage;
