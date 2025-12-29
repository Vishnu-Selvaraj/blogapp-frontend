"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { marked } from "marked";
import uploadImg from "../../../../public/assests/images/upload_area.svg";
import successUploadImg from "../../../../public/assests/images/success_upload_area.svg";

import {
  useAddBlogs,
  useGenerateBlogContent,
  useGetAllCategories,
} from "@/hooks/BlogsHooks";
import toast from "react-hot-toast";
const QuillEditor = dynamic(() => import("@/components/common/quillEditor"), {
  ssr: false,
});

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    sub_title: "",
    description: "",
    category: "",
    image: "",
    is_published: false,
  });

  //Hook used to fetch the Categories data
  const { data: categoriesData } = useGetAllCategories(
    "GET",
    "/admin/getAllCategories",
  );

  //Hook used to generate Description
  const {
    mutate: generateContentMutateFn,
    data,
    isPending,
  } = useGenerateBlogContent("POST", "/admin/generateContent");

  //Fn to handle formData change
  const handleFormChange = (evt) => {
    const { name, value, type, checked, files } = evt.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  //Fn to handle the Content Generation using AI
  const generateBlogContent = (evt) => {
    evt.preventDefault();
    if (!formData.title) {
    } else {
      generateContentMutateFn({ title: formData.title });
    }
  };

  // It's used to sanitize the markdown data response from AI to html for passing as value in Quill
  useEffect(() => {
    if (data?.data?.success && data?.data?.data) {
      const html = marked.parse(data.data.data);

      setFormData((prev) => ({
        ...prev,
        description: html,
      }));
    }
  }, [data]);

  const {
    mutate: addBlogsMutateFn,
    data: addBlogResponseData,
    isPending: isAddBlogPending,
    isSuccess: isBlogAdded,
  } = useAddBlogs("POST", "/admin/addBlog");

  const addBlogsReq = () => {
    let { title, sub_title, description, category, image, is_published } =
      formData;
    if (!title || !sub_title || !description || !category || !image) {
      toast.error("All Fields are Required.")
    } else {
      //Passing the request body as Form Data
      let payload = new FormData();
      payload.append("title", formData.title);
      payload.append("sub_title", formData.sub_title);
      payload.append("description", formData.description);
      payload.append("category", formData.category);
      payload.append("image", formData.image);
      payload.append("is_published", formData.is_published ? 1 : 0);
      const response = addBlogsMutateFn(payload);
      if(addBlogResponseData?.status == 201){
        toast.success(addBlogResponseData?.data?.message)
      }
    }
  };

  //Only reset formdata on success to avoid re-rendering issue
  useEffect(() => {
    if (isBlogAdded && addBlogResponseData?.data?.success) {
      setFormData({
        title: "",
        sub_title: "",
        description: "",
        category: "",
        image: "",
        is_published: false,
      });

      // Reset file input
      const fileInput = document.getElementById("image");
      if (fileInput) fileInput.value = "";
    }
  }, [isBlogAdded, addBlogResponseData]);


  return (
    <>
      <form
        className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-hidden"
        method="post"
        encType="multipart/form-data"
      >
        <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
          {/*------------ Upload Field ------------ */}
          <h6>Upload thumbnail</h6>
          <div>
            <label htmlFor="image">
              <Image
                src={formData?.image ? successUploadImg : uploadImg}
                alt="upload image"
                className="hover:cursor-pointer pt-2 w-28"
              ></Image>
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleFormChange}
                hidden
                required
              />
            </label>
          </div>
          {/*------------ Title Field ------------ */}
          <div className="flex flex-col my-5">
            <label htmlFor="title">Blog Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              placeholder="Type here"
              onChange={handleFormChange}
              className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
            />
          </div>
          {/*------------ Sub title Field ------------ */}

          <div className="flex flex-col my-5">
            <label htmlFor="sub_title">Sub Title</label>
            <input
              type="text"
              name="sub_title"
              id="sub_title"
              value={formData.sub_title}
              placeholder="Type here"
              onChange={handleFormChange}
              className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
            />
          </div>
          {/*------------ Description Field ------------ */}

          <h6>Blog Description</h6>
          <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
            {/* Quill Editor Div */}

            <QuillEditor
              onChange={(html) =>
                setFormData((prev) => ({
                  ...prev,
                  description: html,
                }))
              }
              value={formData.description}
            />

            {/*------------ Generate AI Button ------------ */}
            <button
              className={`absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 
              rounded hover:cursor-pointer hover:bg-gray-200 hover:text-black transition-all duration-500
              ${isPending ? "animate-pulse" : ""}
              `}
              onClick={(evt) => generateBlogContent(evt)}
            >
              {isPending ? "Generating..." : "Generate with AI"}
            </button>
          </div>
          {/*------------ Category Field ------------ */}

          <div className="flex flex-col w-40 my-5">
            <label htmlFor="category">Blog Category</label>
            <select
              name="category"
              id="category"
              className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
              onChange={handleFormChange}
              value={formData.category}
            >
              <option value={""}>Select Category</option>
              {categoriesData?.data?.map((opt, ind) => {
                return (
                  <option value={opt.id} key={ind}>
                    {opt.name}
                  </option>
                );
              })}
            </select>
          </div>
          {/*------------ Publish now Field ------------ */}

          <div className="flex gap-2 my-5">
            <label htmlFor="is_published">Publish Now</label>
            <input
              type="checkbox"
              name="is_published"
              id="is_published"
              className="border border-gray-300 outline-none rounded scale-125"
              onChange={handleFormChange}
            />
          </div>
          {/*------------ Add Btn ------------ */}

          <div>
            <button
              type="button"
              className="mt-3 w-40 h-10 bg-(--color-primary) text-white rounded cursor-pointer text-sm"
              disabled={isAddBlogPending}
              onClick={addBlogsReq}
            >
              {isAddBlogPending ? "Adding..." : "Add Blog"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default BlogForm;
