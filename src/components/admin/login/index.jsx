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

  const { mutateAsync: loginMutateFn, isPending } = useAdminLogin(
    "POST",
    "/admin/login"
  );

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
            className={`w-full py-3 ${
              isPending ? "bg-(--color-primary)/50" : ""
            } font-medium bg-(--color-primary) text-white rounded cursor-pointer hover:bg-primary/90 transition-all`}
            onClick={handleLogin}
            disabled={isPending}
          >
            {/*show a spinner while the login request pending*/}
            {isPending ? (
              <div className="flex justify-center">
                <svg
                  aria-hidden="true"
                  className="w-5.5 h-5.5 text-white animate-spin fill-(--color-primary) me-2"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
