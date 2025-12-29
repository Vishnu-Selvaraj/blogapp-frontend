"use client";
import React, { useState } from "react";
import Image from "next/image";
import herobgImg from "../../../../public/assests/images/herobgImg.png";
import aistar from "../../../../public/assests/images/aistar.svg";

const HeroSection = ({ setSearchTerm }) => {
  const [term, setTerm] = useState("");
  const [show, setshow] = useState(false);

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    try {
      setSearchTerm(term);
      setshow(!show);
    } catch (err) {
      console.log("Error occured in handleFormSubmit in HeroSection", { err });
    }
  };

  return (
    <section className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-20 mb-8">
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary">
          <p>New: AI feature integrated</p>
          <Image className="w-2.5" alt="star" src={aistar}></Image>
        </div>
        <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700">
          Your own <span className="text-(--color-primary)"> blogging</span>{" "}
          <br /> platform.
        </h1>
        <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500">
          This is your space to think out loud, to share what matters, and to
          write without filters. Whether it's one word or a thousand, your story
          starts right here.
        </p>
        <form
          className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden"
          onSubmit={handleFormSubmit}
        >
          <input
            placeholder="Search for blogs"
            required
            className="w-full pl-4 outline-none"
            type="text"
            onChange={(evt) => setTerm(evt.target.value)}
            value={term}
          />
          <button
            type="submit"
            className="bg-(--color-primary) text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>
      <div className={`${show ? "text-center" : "hidden"}`}>
        <span
          className="text-(--color-primary)/75 text-sm border border-gray-500/25 px-5 py-1 rounded-lg  cursor-pointer hover:text-white hover:bg-(--color-primary)/75 transition-colors duration-500"
          onClick={() => {
            setTerm(""), setSearchTerm(""), setshow(!show);
          }}
        >
          clear search
        </span>
      </div>
      <Image
        className="absolute -top-50 -z-1 opacity-50"
        src={herobgImg}
        alt="heroBgImage"
      ></Image>
    </section>
  );
};

export default HeroSection;
