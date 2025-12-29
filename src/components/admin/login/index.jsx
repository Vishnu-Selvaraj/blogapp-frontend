"use client";

import { useAdminLogin } from "@/hooks/BlogsHooks";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AdminLogin = () => {
  let router = useRouter();
  const [formData, setFormData] = useState({
    email: "admin@gmail.com",
    password: "Samplepass",
  });

  const handleChange = (evt) => {
    let { name, value } = evt.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutateAsync: loginMutateFn } = useAdminLogin("POST", "/admin/login");

  const handleLogin = async () => {
    try {
      let loginData = new FormData();
      loginData.append("username", formData.email);
      loginData.append("password", formData.password);
      let res = await loginMutateFn(loginData);
      if (res.status == 200) {
        localStorage.setItem(
          "session",
          JSON.stringify(res?.data?.access_token)
        );
        router.push("/admin/dashboard");
        toast.success("Successfully Logined");
      }
    } catch (err) {
      console.log("Error occured in handleLogin on AdminLogin", { err });
    }
  };

  return (
    <div className="w-full max-w-sm p-6 max-md:m-6 border border-(--color-primary)/30 shadow-xl shadow-(--color-primary)/15 rounded-lg">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full py-6 text-center">
          <h1 className="text-3xl font-bold">
            <span className="text-(--color-primary)">Admin</span> Login
          </h1>
          <p className="font-light">
            Enter your credentials to access the admin panel
          </p>
        </div>
        <form className="mt-6 w-full sm:max-w-md text-gray-600">
          <div className="flex flex-col">
            <label> Email </label>
            <input
              type="email"
              required
              placeholder="your email id"
              className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <div className="flex flex-col">
            <label> Password </label>
            <input
              type="password"
              required
              placeholder="your password"
              className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              onChange={handleChange}
              value={formData.password}
            />
          </div>
          <button
            type="button"
            className="w-full py-3 font-medium bg-(--color-primary) text-white rounded cursor-pointer hover:bg-primary/90 transition-all"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
