import React, { PropsWithChildren } from "react";
import Sidebar from "../_components/Sidebar";

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="">
      <Sidebar />
      <div className="md:ml-56 flex flex-col">
        <div className="w-full  px-4 z-50 border-b border-gray-200 bg-white/30 backdrop-blur-md  fixed top-0 ">
          <h3 className="py-4 text-primary text-2xl font-bold px-6">Supriyo</h3>
        </div>
        <div className=" px-10 mt-24 overflow-y-scroll ">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
