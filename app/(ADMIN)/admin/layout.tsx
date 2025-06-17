import { PropsWithChildren } from "react";
import Sidebar from "../../_components/Sidebar";

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="">
      <Sidebar />
      <div className="md:ml-56 flex flex-col">
        <div className="w-full flex items-center px-4 h-16 z-50 border-b-1 border-[#cde8f8]  bg-white/30 backdrop-blur-md  fixed top-0 ">
          <p>Admin Panel</p>
        </div>
        <div className=" px-10 mt-24 overflow-y-scroll ">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
