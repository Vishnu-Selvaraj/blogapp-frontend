"use client";
import React from "react";
import Image from "next/image";
import closeBtn from "../../../../public/assests/images/closeBtn.svg";
import {
  useGetAllBlogs,
  useUpdateBlogPublishStatus,
  useDeleteBlog,
} from "@/hooks/BlogsHooks";
import toast from "react-hot-toast";

const ListTable = () => {
  const { data } = useGetAllBlogs("GET", "/admin/getAllBlogs");

  const { mutateAsync: updateBlogPublishStatusMutateFn } =
    useUpdateBlogPublishStatus("PUT");

  const { mutateAsync: deleteBlogMutateFn } = useDeleteBlog("DELETE");

  const handleBlogPublishStatus = async (url) => {
    try {
      const res = await updateBlogPublishStatusMutateFn(url);
      if (res.status == 200) {
        toast.success(res?.data?.message);
      }
    } catch (err) {
      console.log("Error occured in handleBlogPublishStatus func", { err });
    }
  };

  const handleBlogDelete = async (url) => {
    try {
      const res = await deleteBlogMutateFn(url);

      if (res.status == 200) {
        toast.success(res?.data?.message);
      }
    } catch (err) {
      console.log("Error occured in handleBlogDelete func", { err });
    }
  };

  return (
    <section className="relative max-w-4xl h-[calc(100vh-220px)] overflow-y-auto overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
      <table className="w-full text-gray-500">
        <thead className="text-xs text-gray-600 text-left">
          <tr>
            <th scope="col" className="px-2 py-4">
              #
            </th>
            <th scope="col" className="px-2 py-4">
              BLOG TITLE
            </th>
            <th scope="col" className="px-2 py-4  max-sm:hidden">
              DATE
            </th>
            <th scope="col" className="px-2 py-4  max-sm:hidden">
              STATUS
            </th>
            <th scope="col" colSpan={2} className="px-2 py-4">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody className="text-left text-sm wrap-break-word">
          {data?.data?.blogs?.map((values, index) => {
            return (
              <tr className="border-y border-gray-300" key={index}>
                <td className="px-2 py-4">{index + 1}</td>
                <td className="px-2 py-4 max-sm:text-xs">{values.title}</td>
                <td className="px-2 py-4 max-sm:hidden">
                  {new Date(values.created_at)
                    .toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                    .replace(/,/gi, "")}
                </td>
                <td
                  className={`px-2 py-4 max-sm:hidden ${
                    values.is_published
                      ? "text-green-500/75"
                      : "text-red-500/75"
                  }`}
                >
                  {values.is_published ? "Published" : "Unpublished"}
                </td>
                <td className="px-2 py-4 flex gap-4">
                  <button
                    className={`${
                      values.is_published ? "px-2" : "px-3.5"
                    } border py-0.5 mt-1 rounded cursor-pointer text-xs`}
                    onClick={() =>
                      handleBlogPublishStatus(
                        `/admin/ChangePublishStatus/${values.id}`
                      )
                    }
                  >
                    {values.is_published ? "Unpublish" : "Publish"}
                  </button>
                  <Image
                    src={closeBtn}
                    alt="delete btn"
                    className="cursor-pointer max-sm:w-7 max-xl:mr-3 hover:animate-spin duration-700"
                    onClick={() =>
                      handleBlogDelete(`/admin/deleteBlog/${values.id}`)
                    }
                  ></Image>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default ListTable;
