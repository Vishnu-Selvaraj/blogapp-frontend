"use client";

import React from "react";
import Image from "next/image";
import { dashboardMenu } from "@/data/Database";
import { useAdminGetBlogsComments, useGetAllBlogs } from "@/hooks/BlogsHooks";

const TopLinkCards = () => {
  const { data } = useGetAllBlogs("GET", "/admin/getAllBlogs");
  const { data: unpublishedData } = useAdminGetBlogsComments(
    "GET",
    `/admin/getDraftBlogs`
  );
  const { data: commentsData } = useAdminGetBlogsComments(
    "GET",
    `/admin/getAllCommentsByIds?value=2`
  );
  dashboardMenu[0].count = data?.data?.total || 0;
  dashboardMenu[1].count = commentsData?.data?.total || 0;
  dashboardMenu[2].count = unpublishedData?.data?.total || 0;

  return (
    <div className="flex flex-wrap gap-4">
      {dashboardMenu.map((menu, index) => {
        return (
          <div
            className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all"
            key={index}
          >
            <Image src={menu.icon} alt={menu.name}></Image>
            <div className="flex flex-col">
              <p className="text-xl font-medium text-gray-600">{menu.count}</p>
              <p className="text-gray-400 font-light">{menu.name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopLinkCards;
