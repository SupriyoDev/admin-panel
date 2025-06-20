"use client";

import { SignOutButton } from "@clerk/nextjs";
import { Laptop, LibraryBig, LogOut, MonitorCheck, Tags } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import Image from "next/image";
import logo from "@/public/dit2.png";

const sidebarLinks = [
  { title: "laptop", href: "/admin", icon: Laptop },
  { title: "desktop", href: "/admin/desktop", icon: MonitorCheck },
  { title: "category", href: "/admin/category", icon: Tags },
  { title: "collections", href: "/admin/collections", icon: LibraryBig },
];

const Sidebar = () => {
  const activePath = usePathname();

  return (
    <div className="  flex-col justify-between fixed top-0 left-0  w-56 bg-base-200 h-full  md:flex hidden border-[#79c4f0] border-r-1 ">
      <div className="   pt-0 pb-6 w-full">
        {/* <h3 className="text-center font-bold text-2xl text-primary-content py-4 bg-[#008adc]">
          Das Infotech
        </h3> */}
        <div className="bg-[#008add] flex justify-center">
          <Image
            src={logo}
            alt=""
            width={350}
            height={160}
            className="w-[185px] h-[80px]"
          />
        </div>

        <div className=" mt-10 px-4 flex flex-col gap-3 w-full">
          {sidebarLinks.map((link, i) => (
            <Link
              href={link.href}
              key={i}
              className={cn(
                "flex gap-3 items-center hover:bg-[#008adc] hover:text-primary-content transition-all duration-300 w-full px-3 py-2 rounded-md",
                activePath === link.href && "text-primary-content bg-[#008adc]"
              )}
            >
              <span>
                <link.icon className="w-7 h-7" />
              </span>
              <span className="text-base capitalize">{link.title}</span>
            </Link>
          ))}
        </div>
      </div>

      <SignOutButton>
        <div className="mb-24  gap-4 px-10 flex items-center rounded-md hover:bg-[#008adc] mx-2 h-12 hover:text-white">
          <span>
            <LogOut />
          </span>{" "}
          <span className="text-xl ">Logout</span>
        </div>
      </SignOutButton>
    </div>
  );
};

export default Sidebar;
