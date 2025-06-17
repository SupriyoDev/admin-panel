"use client";

import CustomSelect from "@/app/_components/CustomSelect";
import DesktopProductCard from "@/app/_components/DesktopProductCard";
import { DesktopProductResponse } from "@/drizzle/schema";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export const dynamic = "force-dynamic";

const Category = () => {
  const { userId } = useAuth();
  console.log("userId", userId);

  // const [allProducts, setAllProducts] = useState<DesktopProductResponse>([]);
  const [filterCategory, selectFilterCategory] = useState<{
    category: string;
    brand: string;
  }>({
    category: "",
    brand: "",
  });

  const { data, isError, isPending, error } = useQuery<
    DesktopProductResponse,
    Error
  >({
    queryKey: ["desktop_products_all"],
    queryFn: async () => {
      const res = await axios.get("/api/desktop_product");
      // if (res.data.error) return [];
      return res.data.products;
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  console.log("error", error);
  console.log(data);

  if (isError)
    return <div className="w-full py-6 "> Something went wrong...</div>;
  if (isPending)
    return (
      <div className="w-full py-6 ">
        <p className="text-4xl font-bold text-[#008adc]">Loading...</p>
      </div>
    );
  // useEffect(() => {
  //   setAllProducts(data);
  // }, []);

  let result = data;
  if (filterCategory.category) {
    result = result.filter(
      (product) => product.category === filterCategory.category
    );
  }

  if (filterCategory.brand) {
    result = result.filter((product) => product.brand === filterCategory.brand);
  }

  // QUERY RESULTS
  // return NextResponse.json({
  //       products,
  //       message: "Data fetched successfully",
  //     });

  return (
    <div className=" w-full py-6  ">
      <div className="w-full mb-10">
        <CustomSelect filterOptions={(data) => selectFilterCategory(data)} />
      </div>

      <div className=" w-full grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {result.length > 0 &&
          result?.map((product, i) => (
            <DesktopProductCard props={product} key={i} />
          ))}
        {!result && (
          <div className=" flex flex-col gap-6 items-center w-full bg-slate-800 col-span-4 py-10 rounded-lg">
            <p className="text-6xl font-light text-primary">
              {" "}
              There is no products to show!{" "}
            </p>
            <Link href={"/admin/desktop"}>
              <button className="btn btn-primary text-lg px-6 rounded-lg">
                + Add product
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
