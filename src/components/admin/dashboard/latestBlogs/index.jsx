import React, { Suspense } from "react";
import Image from "next/image";
import latestBlogImg from "../../../../../public/assests/images/latestblog.svg";
import ListTable from "@/components/common/listTable";
import Loader from "@/components/loaderComponent/Loader";

const LatestBlogs = () => {
  return (
    <>
      <div className="flex gap-3 m-4 mt-6">
        <Image src={latestBlogImg} alt="latest blog"></Image>
        <h6>Latest Blogs</h6>
      </div>
      <Suspense fallback={<Loader/>}>
      <ListTable/>
      </Suspense>
    </>
  );
};

export default LatestBlogs;
