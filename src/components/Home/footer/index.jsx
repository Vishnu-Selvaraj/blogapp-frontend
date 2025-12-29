import React from "react";
import Image from "next/image";
// import logo from "../../../../public/assests/images/blog-logo.svg";
import logo from "../../../../public/assests/images/blogLogo2.png";

import Link from "next/link";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-(--color-primary)/3">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div>
          <div className="flex">
            <Image src={logo} alt="logo" className="w-12 sm:w-15"></Image>
            <h3 className="text-2xl text-(--color-primary) font-medium sm:pt-4 max-sm:pt-2">
              ThinkSpace
            </h3>
          </div>
          <p className="max-w-[410px] mt-6">
            Welcome to ThinkSpace – where curiosity meets content. We're
            passionate about sharing stories that matter, ideas that inspire,
            and insights that empower. Dive into our collection of articles and
            discover a world of knowledge tailored for the curious mind.
          </p>
        </div>
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          <div>
            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
              Quick Links
            </h3>
            <ul className="text-sm space-y-1">
              <li>
                <Link
                  href={"/"}
                  className="hover:text-(--color-primary) transition-all duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="hover:text-(--color-primary) transition-all duration-300"
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="hover:text-(--color-primary) transition-all duration-300"
                >
                  Offers &amp; Deals
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="hover:text-(--color-primary) transition-all duration-300"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="hover:text-(--color-primary) transition-all duration-300"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
              Need Help?
            </h3>
            <ul className="text-sm space-y-1">
              <li>
                <Link
                  href={"/"}
                  className="hover:text-(--color-primary) transition-all duration-300"
                >
                  Delivery Information
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="hover:text-(--color-primary) transition-all duration-300"
                >
                  Return &amp; Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="hover:text-(--color-primary) transition-all duration-300"
                >
                  Payment Methods
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="hover:text-(--color-primary) transition-all duration-300"
                >
                  Track your Order
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="hover:text-(--color-primary) transition-all duration-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
              Follow Us
            </h3>
            <ul className="text-sm space-y-1">
              <li>
                <Link
                  href={"/"}
                  className="hover:text-(--color-primary) transition-all duration-300"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="hover:text-(--color-primary) transition-all duration-300"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="hover:text-(--color-primary) transition-all duration-300"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="hover:text-(--color-primary) transition-all duration-300"
                >
                  YouTube
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        Copyright 2025-2026 © ThinkSpace - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
