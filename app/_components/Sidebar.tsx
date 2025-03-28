"use client";

import {
  Computer,
  Laptop,
  Laptop2,
  Layers2,
  LibraryBig,
  Link2,
  MonitorCheck,
  PackageCheck,
  Tags,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "../../lib/utils";

const sidebarLinks = [
  { title: "laptop", href: "/admin", icon: Laptop },
  { title: "desktop", href: "/admin/desktop", icon: MonitorCheck },
  { title: "category", href: "/admin/category", icon: Tags },
  { title: "brands", href: "/admin/brands", icon: PackageCheck },
  { title: "collections", href: "/admin/collections", icon: LibraryBig },
];

const Sidebar = () => {
  const activePath = usePathname();

  return (
    <div className=" fixed top-0 left-0  w-56 bg-base-200 h-full  md:flex hidden border-primary/30 border-r ">
      <div className="   pt-0 pb-6 w-full">
        <h3 className="text-center font-bold text-2xl text-primary-content py-4 bg-primary">
          Das Infotech
        </h3>

        <div className=" mt-6 px-4 flex flex-col gap-3 w-full">
          {sidebarLinks.map((link, i) => (
            <Link
              href={link.href}
              key={i}
              className={cn(
                "flex gap-3 items-center hover:bg-primary hover:text-primary-content transition-all duration-300 w-full px-3 py-2 rounded-md",
                activePath === link.href && "text-primary-content bg-primary"
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
    </div>
  );
};

export default Sidebar;
