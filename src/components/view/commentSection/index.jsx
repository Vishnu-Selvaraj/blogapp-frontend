import React from "react";
import Image from "next/image";
import commentImg from "../../../../public/assests/images/commentImg.svg";
import { useGetBlogComments } from "@/hooks/BlogsHooks";

const CommentSection = ({ userId, blogId }) => {
  const { data: commentData } = useGetBlogComments(
    "GET",
    `/getAllCommentsByIds/${blogId}/${userId}`,
    blogId
  );

  const formatTimeDuration = (datestring) => {
    try {
      const now = new Date();
      const past = new Date(datestring);
      const seconds = Math.floor((now - past) / 1000);

      const intervals = {
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60,
      };

      for (const [unit, value] of Object.entries(intervals)) {
        const count = Math.floor(seconds / value);
        if (count >= 1) {
          return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
        }
      }

      return "just now";
    } catch (err) {
      console.log("Error occured in formatTimeDuration in CommentSection", {
        err,
      });
    }
  };

  return (
    <div className="mt-14 mb-10 max-w-4xl mx-auto max-[970px]:mx-5">
      <p className="font-semibold mb-4">
        Comments ({commentData?.data?.length || 0})
      </p>
      {commentData?.data?.map((cmt, index) => {
        return (
          <div className="flex flex-col gap-4 my-5" key={index}>
            <div className="relative bg-(--color-primary)/2 border border-(--color-primary)/5 max-w-xl p-4 rounded text-gray-600 shadow-sm shadow-stone-200">
              <div className="flex items-center gap-2 mb-2">
                <Image
                  src={commentImg}
                  alt="comment-logo"
                  className="w-5"
                ></Image>
                <p className="font-medium">{cmt.user_name}</p>
              </div>
              <p className="text-sm max-w-md ml-7">{cmt.content}</p>
              <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                {formatTimeDuration(cmt.created_at)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentSection;
