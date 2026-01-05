import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

const Card = ({ data }) => {
  return (
    <Link href={`/blog/${data.id}`} className="w-full rounded-lg overflow-hidden shadow-sm hover:scale-102 hover:shadow-[0_0_1px_var(--color-primary)] duration-300 cursor-pointer">
      <Image
        src={`${process.env.NEXT_PUBLIC_PROD_BASE_URL }${data?.image}`}
        alt="cardImg"
        width={16}
        height={9}
        layout="responsive"
        className="aspect-video object-cover"
      ></Image>
      <span className="ml-5 mt-4 px-3 py-1 inline-block bg-(--color-primary)/20 rounded-full text-(--color-primary) text-xs">
        {data?.category_name}
      </span>
      <div className="p-5">
        <h5 className="mb-2 font-medium text-gray-900">{data?.title}</h5>
        <p className="mb-3 text-xs text-gray-600">{data?.sub_title}</p>
      </div>
    </Link>
  );
};

export default Card;
