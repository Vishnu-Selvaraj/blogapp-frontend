"use client";

import { useAddComments } from "@/hooks/BlogsHooks";
import React, { useState, useEffect } from "react";

const CommentForm = ({ userId, blogId }) => {
  const [formData, setFormData] = useState({
    user_name: "",
    content: "",
  });

  const handleChange = (evt) => {
    let { name, value } = evt.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutate: addCommentMutateFn, data: commentResponse } = useAddComments(
    "POST",
    `/addComment/${blogId}/${userId}`,
    formData
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();
    addCommentMutateFn(formData);
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      user_name: "",
      content: "",
    }));
  }, [commentResponse?.status == 201]);

  return (
    <div className="max-w-4xl mx-auto max-[970px]:mx-5">
      <p className="font-semibold mb-4">Add your comment</p>

      <form
        method="post"
        className="flex flex-col items-start gap-4 max-w-lg"
        onSubmit={handleSubmit}
      >
        <input
          placeholder="Name"
          required
          className="w-full p-2 border border-gray-300 rounded outline-none"
          type="text"
          name="user_name"
          value={formData.user_name}
          onChange={handleChange}
        />

        <textarea
          placeholder="Comment"
          className="w-full p-2 border border-gray-300 rounded outline-none h-48"
          required
          name="content"
          value={formData.content}
          onChange={handleChange}
        ></textarea>

        <button
          type="submit"
          className="bg-(--color-primary) text-white rounded p-2 px-8 hover:scale-102 transition-all duration-200 cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
