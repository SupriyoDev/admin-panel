import { Laptop } from "lucide-react";
import React, { useState } from "react";

import AddNewLaptop from "../../_components/addnewlaptop";
import Link from "next/link";

const AdminPage = () => {
  return (
    <div className=" ">
      <div className="flex justify-between">
        <h3 className="flex items-center gap-2 text-primary ">
          <Laptop className="w-10 h-10" />
          <span className="text-lg font-medium uppercase">
            Add new Laptop
          </span>{" "}
        </h3>
        <Link href={"/admin/allLaptop"}>
          <button className="btn btn-primary rounded-md">All Laptop</button>
        </Link>
      </div>

      <div className="w-full">
        <AddNewLaptop />
      </div>
    </div>
  );
};

export default AdminPage;
