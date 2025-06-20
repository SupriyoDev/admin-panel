// "use client";

import { Laptop } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import AddNewLaptop from "../../_components/addnewlaptop";

const AdminPage = () => {
  return (
    <div className=" ">
      <div className="flex justify-between">
        <h3 className="flex items-center gap-2 text-[#008add] ">
          <Laptop className="w-10 h-10" />
          <span className="text-lg font-medium uppercase">
            Add new Laptop
          </span>{" "}
        </h3>
        <Link href={"/admin/allLaptop"}>
          <Button className=" text-lg bg-[#008add] hover:bg-[#008add]/80">
            All Laptop <Laptop className="w-9 h-9" />
          </Button>
        </Link>
      </div>

      <div className="w-full">
        <AddNewLaptop />
      </div>
    </div>
  );
};

export default AdminPage;
