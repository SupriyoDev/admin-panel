import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className=" w-full h-screen py-30 ">
      <div className="flex flex-col items-center   gap-6 h-full">
        <Loader2 className="w-18 h-18 animate-spin text-info" />

        <h4 className="text-3xl font-light text-[#008add]">Loading...</h4>
      </div>
    </div>
  );
};

export default Loading;
