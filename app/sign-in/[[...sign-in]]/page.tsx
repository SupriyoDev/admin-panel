import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className=" w-full bg-[#008add]">
      <div className=" w-full grid grid-cols-5 h-screen ">
        {/* side 1  */}
        <div className="col-span-3">
          <img
            src={"/dit2.webp"}
            alt=" "
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>

        {/* // side 2 */}
        <div className="col-span-2 flex flex-col gap-3 items-center justify-center">
          <p className="text-center md:text-5xl xl:text-7xl font-bold text-white">
            DAS INFOTECH
          </p>
          <p className="text-center text-6xl font-light text-white">
            Admin Panel
          </p>
          <div className="flex mt-10">
            <SignIn />
          </div>
        </div>

        {/* // end  */}
      </div>
    </div>
  );
}
