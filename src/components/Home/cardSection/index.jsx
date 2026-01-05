"use client";
import Card from "@/components/card";
import React from "react";
import {
  useGetAllBlogs,
  useGetAllBlogsByCategoryIdOrTerm,
} from "@/hooks/BlogsHooks";
import Loader from "@/components/loaderComponent/Loader";

const CardSection = ({ categoryId, searchTerm }) => {
  const { data, isLoading } = useGetAllBlogsByCategoryIdOrTerm(
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

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <Loader />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
      {data?.data?.length > 0 ? (
        data?.data?.map((value, index) => {
          return <Card key={index} data={value} />;
        })
      ) : (
        <div className="col-span-full text-center mt-10">
          <h2 className="text-gray-500/20 text-3xl font-bold">No Blog Found</h2>
        </div>
      )}
    </div>
  );
};

export default CardSection;
