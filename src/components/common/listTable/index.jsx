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
import Loader from "@/components/loaderComponent/Loader";

const ListTable = () => {
  const { data, isLoading } = useGetAllBlogs("GET", "/admin/getAllBlogs");

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
    const delId = url.split("/").at(-1);
    try {
      if ([1, 2, 3].includes(parseInt(delId))) {
        toast.error("Deleting this blog is disabled in test mode.");
      } else {
        const res = await deleteBlogMutateFn(url);

        if (res.status == 200) {
          toast.success(res?.data?.message);
        }
      }
    } catch (err) {
      console.log("Error occured in handleBlogDelete func", { err });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-32">
        <Loader />
      </div>
    );
  }

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
          {
          data?.data?.blogs.length > 0 ? (
            data?.data?.blogs?.map((values, index) => {
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
                      values.is_published ? "px-2 bg-red-500 hover:bg-white/80 hover:text-red-500/80" : "px-3.5 bg-green-500 hover:bg-white/80 hover:text-green-500/80 hover:border"
                    } border py-0.5 mt-1 text-white/90 rounded cursor-pointer text-xs transition-all duration-300`}
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
                    className="cursor-pointer max-sm:w-7 max-xl:mr-3 max-xs:w-17 hover:animate-spin duration-700"
                    onClick={() =>
                      handleBlogDelete(`/admin/deleteBlog/${values.id}`)
                    }
                  ></Image>
                </td>
              </tr>
            );
          })

          ):(
            <tr>
              <td colSpan={5} className="text-center text-black/25 pt-10 font-semibold text-2xl max-md:text-xl">No blog found</td>
            </tr>
          )
          }
        </tbody>
      </table>
    </section>
  );
};

export default ListTable;
