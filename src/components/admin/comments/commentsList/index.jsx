"use client";
import React from "react";
import Image from "next/image";
import trashIcon from "../../../../../public/assests/images/trashIcon.svg";
import {
  useAdminGetBlogsComments,
  useChangeCommentsStatus,
  useDeleteComment,
} from "@/hooks/BlogsHooks";
import toast from "react-hot-toast";
import Loader from "@/components/loaderComponent/Loader";

const CommentsList = ({ status }) => {
  const { data: commentsData, isLoading } = useAdminGetBlogsComments(
    "GET",
    `/admin/getAllCommentsByIds?value=${status ? 1 : 0}`
  );

  // console.log(commentsData, "data");

  const { mutateAsync: changeCmtStatusMutationFn } =
    useChangeCommentsStatus("PUT");

  const handleCmtStatusChange = async (url) => {
    try {
      const response = await changeCmtStatusMutationFn(url);
      if (response?.status == 200) {
        toast.success(response?.data?.message);
      }
    } catch (err) {
      console.log("Error occured in handleCmtStatusChange func", { err });
    }
  };

  const { mutateAsync: deleteCmtMutationFn } = useDeleteComment("DELETE");

  const handleDelteCmt = async (url) => {
    try {
      const response = await deleteCmtMutationFn(url);
      if (response?.status == 200) {
        toast.success(response?.data?.message);
      }
    } catch (err) {
      console.log("Error occured in handleDelteCmt func", { err });
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
    <section className="relative max-w-3xl h-[calc(100vh-220px)] overflow-y-auto overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
      <table className="w-full text-gray-500">
        <thead className="text-[0.8rem] text-gray-600 text-left uppercase">
          <tr>
            <th scope="col" className="px-5 py-4">
              Blog Title & Comment
            </th>
            <th scope="col" className="px-2 py-4  max-sm:hidden">
              DATE
            </th>
            <th scope="col" colSpan={2} className="px-2 py-4">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody className="text-left text-sm wrap-break-word">
          {commentsData?.data?.comments.length > 0 ? (
            commentsData?.data?.comments?.map((cmt, index) => {
              return (
                <tr className="order-y border-gray-300" key={index}>
                  <td className="px-5 py-4">
                    <div>
                      <span className="font-medium text-gray-600">Blog</span> :
                      {cmt.blog_title}
                    </div>
                    <div className="pt-5">
                      <p>
                        <span className="font-medium text-gray-600">Name</span>{" "}
                        :{cmt.user_name}
                      </p>
                      <p>
                        <span className="font-medium text-gray-600">
                          Comment
                        </span>{" "}
                        : {cmt.content}
                      </p>
                    </div>
                  </td>
                  <td className="px-2 py-4 max-sm:hidden">
                    {new Date(cmt.created_at).toLocaleDateString("en-US", {
                      month: "numeric",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-2 py-4">
                    <div className="flex items-center justify-center gap-4">
                      <button
                        className={` ${
                          cmt.is_approved
                            ? "border-red-600 bg-red-100 text-red-600"
                            : "border-green-600 bg-green-100 text-green-600"
                        } text-xs border rounded-full px-3 py-1 hover:cursor-pointer`}
                        onClick={() =>
                          handleCmtStatusChange(
                            `/admin/changeCmtStatus/${cmt.id}`
                          )
                        }
                      >
                        {cmt.is_approved ? "Unpublish" : "Publish"}
                      </button>
                      <Image
                        src={trashIcon}
                        alt="trash btn"
                        className="cursor-pointer w-5 hover:scale-115 transition-all duration-300 max-md:mr-2"
                        onClick={() =>
                          handleDelteCmt(`/admin/deleteComment/${cmt.id}`)
                        }
                      ></Image>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={5}
                className="text-center text-black/25 pt-10 font-semibold text-2xl max-md:text-xl"
              >
                No Comments found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default CommentsList;
