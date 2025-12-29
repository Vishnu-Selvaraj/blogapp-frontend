"use client";
import ListTable from "@/components/common/listTable";
import CheckAuth from "@/services/check_auth/CheckAuth";
import React from "react";

const AdminBlogListPage = () => {
  return (
    <CheckAuth>
      <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 space-y-3 h-[calc(100vh-70px)] overflow-hidden">
        <h6>All blogs</h6>
        <ListTable />
      </div>
    </CheckAuth>
  );
};

export default AdminBlogListPage;
