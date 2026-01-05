"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/axiosInstance";
import Loader from "@/components/loaderComponent/Loader";

const CheckAuth = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem("session"));
    const verifyToken = async () => {
      try {
        if (!authToken) {
          router.replace("/login");
          return;
        } else {
          const res = await api({
            method: "GET",
            url: "admin/verify-token",
            data: {},
            // headers: { Authorization: `Bearer ${authToken}` },
          });
          if (res.status == 200) {
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        localStorage.removeItem("session");
        router.replace("/login");
      } finally {
        setIsLoading(false);
      }
    };
    verifyToken();
  }, [router]);
  //Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center mt-32">
        <Loader />
      </div>
    );
  }

  // Only render children if authenticated
  return isAuthenticated ? children : null;
};

export default CheckAuth;
