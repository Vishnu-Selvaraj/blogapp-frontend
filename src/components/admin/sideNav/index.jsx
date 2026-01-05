"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { adminMenu } from "@/data/Database";
import { usePathname } from "next/navigation";

const SideNavbar = () => {
  let pathname = usePathname();

  //check that if /admin is path then set it to /admin/dashboard to make active className to sideNav option
  if(pathname == '/admin'){
    pathname = '/admin/dashboard'
  }

  return (
    <div className="sticky left-0">
      <div className="flex flex-col border-r border-gray-200 min-h-full pt-6">
        {adminMenu?.map((menu, index) => {
          return (
            <Link
              href={`/admin${menu.path}`}
              key={index}
              className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer 
                ${
                  pathname == `/admin${menu.path}`
                    ? "bg-(--color-primary)/10 border-r-4 border-(--color-primary)"
                    : ""
                }`}
            >
              <Image src={menu.icon} alt={menu.name} className="w-5"></Image>
              <p className="md:block hidden">{menu.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideNavbar;
