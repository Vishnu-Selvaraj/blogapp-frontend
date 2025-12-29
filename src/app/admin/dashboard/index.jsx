"use client";
import LatestBlogs from "@/components/admin/dashboard/latestBlogs";
import TopLinkCards from "@/components/admin/dashboard/topList";
import CheckAuth from "@/services/check_auth/CheckAuth";
import React from "react";

const AdminDashboardPage = () => {
  return (
    <CheckAuth>
      <div className="flex-1 p-4 md:p-10">
        <TopLinkCards />
        <LatestBlogs />
      </div>
    </CheckAuth>
  );
};

export default AdminDashboardPage;
