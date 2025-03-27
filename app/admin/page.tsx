import { Laptop } from "lucide-react";
import React, { useState } from "react";
import MyInput from "../_components/myInput";
import AddNewLaptop from "../_components/addnewlaptop";

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
        <button className="btn btn-primary rounded-md">+ Add new</button>
      </div>

      <div className="w-full">
        <AddNewLaptop />
      </div>
    </div>
  );
};

export default AdminPage;
