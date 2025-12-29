"use client";
import Card from "@/components/card";
import React from "react";
import {
  useGetAllBlogs,
  useGetAllBlogsByCategoryIdOrTerm,
} from "@/hooks/BlogsHooks";

const CardSection = ({ categoryId, searchTerm }) => {
  const { data } = useGetAllBlogsByCategoryIdOrTerm(
    "GET",
    `${
      categoryId && categoryId !== 1
        ? `/getAllBlogs?category_id=${categoryId}`
        : searchTerm != ""
        ? `/searchBlog?search_term=${searchTerm}`
        : "/getAllBlogs"
    }`,
    categoryId,
    searchTerm
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
      {data?.data?.map((value, index) => {
        return <Card key={index} data={value} />;
      })}
    </div>
  );
};

export default CardSection;
