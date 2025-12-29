"use client";
import BlogForm from "@/components/admin/addBlogs";
import React from "react";
import CheckAuth from "@/services/check_auth/CheckAuth";

const AddBlogPage = () => {
  return (
    <CheckAuth>
      <div>
        <BlogForm />
      </div>
    </CheckAuth>
  );
};

export default AddBlogPage;
