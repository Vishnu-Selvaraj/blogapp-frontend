"use client";
import React from "react";
import NavbarAdmin from "@/components/admin/Navbar";
import Footer from "@/components/Home/footer";
import CommentForm from "@/components/view/commentForm";
import CommentSection from "@/components/view/commentSection";
import ViewHeaderSection from "@/components/view/headerSection";
import SocialMediaLinks from "@/components/view/viewsSocialMediaLinks";
import { useGetBlogById } from "@/hooks/BlogsHooks";
import { useParams } from "next/navigation";
import Loader from "@/components/loaderComponent/Loader";

const BlogViewPage = () => {
  const { id } = useParams();
  const { data: blogData, isLoading } = useGetBlogById(
    "GET",
    `/getBlogById/${parseInt(id)}`,
    parseInt(id)
  );

  if (isLoading) {
    return (
      <div className="flex justify-center mt-32">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <NavbarAdmin isUser={true} />
      <ViewHeaderSection blogData={blogData} />
      <div className="mx-auto">
        <CommentSection
          userId={blogData?.data?.author_id}
          blogId={blogData?.data?.id}
        />
        <CommentForm
          userId={blogData?.data?.author_id}
          blogId={blogData?.data?.id}
        />
        <SocialMediaLinks />
      </div>
      <Footer />
    </>
  );
};

export default BlogViewPage;
