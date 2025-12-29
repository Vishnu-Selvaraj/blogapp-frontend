"use client";
import { useState } from "react";
import { blogFormOptions } from "@/data/Database";
import React from "react";
import { useGetAllCategories } from "@/hooks/BlogsHooks";

const CategorySection = ({ setSelectedCategoryId }) => {
  const [option, setOption] = useState("all");
  const { data: categoriesData } = useGetAllCategories(
    "GET",
    `/getAllCategories`
  );

  return (
    <section className="flex justify-center gap-3 max-sm:gap-0 my-10 relative">
      {categoriesData?.data?.map((opt, index) => {
        return (
          <div
            className="relative"
            key={index}
            onClick={() => {
              setOption(opt.name.toLocaleLowerCase()),
                setSelectedCategoryId(opt.id);
            }}
          >
            <button
              className={`${
                option == opt.name.toLocaleLowerCase()
                  ? "text-white"
                  : "text-gray-500"
              } cursor-pointer px-4 pt-0.5`}
            >
              {opt.name}
              <div
                className={`${
                  option == opt.name.toLocaleLowerCase()
                    ? "bg-(--color-primary)"
                    : ""
                } absolute left-0 right-0 top-0 h-7 -z-1 rounded-full`}
              ></div>
            </button>
          </div>
        );
      })}
    </section>
  );
};

export default CategorySection;
