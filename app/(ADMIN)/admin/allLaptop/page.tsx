import GetAllLaptop from "@/app/_components/GetAllLaptop";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const AllLaptop = () => {
  return (
    <div>
      <div className=" flex justify-between py-3 mb-6 border-b  border-slate-300">
        <h3 className="py-1.5 px-6 rounded-md bg-slate-700 text-white">
          All Stocks
        </h3>
        <Link href={"/admin"}>
          <Button className="bg-[#008add] hover:bg-[#008add] ">Back</Button>
        </Link>
      </div>
      <GetAllLaptop />
    </div>
  );
};

export default AllLaptop;
