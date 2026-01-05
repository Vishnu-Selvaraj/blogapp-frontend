"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/assests/images/blogLogo2.png";

import dasharrow from "../../../../public/assests/images/dasharrow.svg";
import toast from "react-hot-toast";

const NavbarAdmin = ({ isUser }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("session")));
  }, []);

  const handleLogout = () => {
    try {
      if (token) {
        localStorage.removeItem("session");
        toast.success("Logout Successfully.");
      }
    } catch (err) {
      console.log("Error occured in handleLogout func", { err });
    }
  };

  return (
    <nav
      className={`py-3.5 h-[70px] flex justify-between ${
        isUser ? "px-20 xl:px-32 max-sm:px-5.5" : "px-15 max-sm:px-5.5 shadow-sm"
      }`}
    >
      <Link href={"/"}>
        <div className="flex">
          <Image src={logo} alt="logo" className="w-12 h-12"></Image>
          <h3 className="text-2xl text-(--color-primary) font-medium pt-2">
            ThinkSpace
          </h3>
        </div>
      </Link>
      {isUser && token ? (
        <Link
          href={"/admin"}
          className="flex gap-1.5 mt-1 bg-(--color-primary) rounded-3xl px-5 max-sm:px-3 py-2.4"
        >
          <button className="text-white text-sm cursor-pointer">
            Dashboard
          </button>
          <Image src={dasharrow} alt="dasharrow" className="w-3"></Image>
        </Link>
      ) : token ? (
        <Link href={"/"} className="pt-1" onClick={handleLogout}>
          <button className="bg-(--color-primary) px-9 py-1 text-white rounded-2xl cursor-pointer">
            Logout
          </button>
        </Link>
      ) : (
        <Link href={"/login"} className="pt-1">
          <button className="flex gap-2 bg-(--color-primary) px-9 max-md:px-5 py-1 text-white rounded-2xl cursor-pointer">
            <span>Login</span>{" "}
            <Image src={dasharrow} alt="dasharrow" className="w-3 pt-1"></Image>
          </button>
        </Link>
      )}
    </nav>
  );
};

export default NavbarAdmin;
