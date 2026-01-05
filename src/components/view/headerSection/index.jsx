import React from "react";
import Image from "next/image";
import herobgImg from "../../../../public/assests/images/herobgImg.png";
import "./header.css";

const ViewHeaderSection = ({ blogData }) => {
  return (
    <div className="relative">
      <Image
        src={herobgImg}
        alt="bgImage"
        className="absolute -top-50 -z-1 opacity-50"
      ></Image>

      <div className="text-center mt-20 text-gray-600">
        <p className="text-(--color-primary) py-4 font-medium">
          Published on&nbsp;
          <span>
            {new Date(blogData?.data?.created_at)
              .toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
              .replace(",", "th ")}
          </span>
        </p>

        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {blogData?.data?.title}
        </h1>

        <h2 className="my-5 max-w-lg truncate mx-auto">
          {blogData?.data?.sub_title}
        </h2>

        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-(--color-primary)/35 bg-(--color-primary)/5 font-medium text-(--color-primary)">
          {blogData?.data?.author_name}
        </p>
      </div>

      <div className="flex flex-col mx-auto justify-center max-[1100px]:mx-5 max-w-5xl my-10 mt-6">
        {blogData?.data?.image && (
          <Image
            src={`${process.env.NEXT_PUBLIC_PROD_BASE_URL}${blogData.data.image}`}
            width={1600}
            height={900}
            alt="blogImg"
            priority
            className="rounded-3xl w-full h-auto object-cover"
          />
        )}

        <div
          className="rich-text max-w-4xl mx-auto"
          dangerouslySetInnerHTML={{ __html: blogData?.data?.description }}
        >
          {/* The rest of your article HTML stays unchanged */}
        </div>
      </div>
    </div>
  );
};

export default ViewHeaderSection;
