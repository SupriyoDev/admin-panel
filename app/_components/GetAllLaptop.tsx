"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/drizzle/db";
import { laptopTable } from "@/drizzle/schema";
import Link from "next/link";
import LaptopCard from "./LaptopCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { laptopResponseType } from "@/lib/types";
import CustomSelect from "./CustomSelect";

const GetAllLaptop = () => {
  const { data, isError, isPending } = useQuery<laptopResponseType[], Error>({
    queryKey: ["laptop_products"],
    queryFn: async () => {
      const res = await axios.get("/api/laptop");
      return res.data.products;
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  if (isError) return <div> Something went wrong!</div>;
  if (isPending) {
    return (
      <div className=" py-10">
        <p className="text-5xl font-bold text-[#008add]">Loading...</p>
      </div>
    );
  }

  // if (data && data.length < 1) {
  //   return (
  //     <div className=" flex flex-col gap-6 items-center w-full bg-slate-800 col-span-4 py-10 rounded-lg">
  //       <p className="text-6xl font-light text-primary">
  //         {" "}
  //         There is no Laptop to show!{" "}
  //       </p>
  //       <Link href={"/admin"}>
  //         <Button className=" text-lg ">+ Add Laptop</Button>
  //       </Link>
  //     </div>
  //   );
  // }

  return (
    <div className=" w-full">
      <div className=" w-full grid grid-cols-3 2xl:grid-cols-4 gap-y-6 gap-x-2">
        {data &&
          data?.map((laptop) => <LaptopCard laptop={laptop} key={laptop.id} />)}
      </div>
    </div>
  );
};

export default GetAllLaptop;
