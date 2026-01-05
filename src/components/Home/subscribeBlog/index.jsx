"use client";
import React,{useState} from "react";
import toast from "react-hot-toast";

const SubscribeBlog = () => {
  const [email,setEmail] = useState('')
  const handleSubscription = (evt) => {
    evt.preventDefault();
    setTimeout(() => {
      setEmail('')
      toast.success("Subscribed successfully.");
    }, 500);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 my-32">
      <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Blog!</h1>
      <p className="md:text-lg text-gray-400 pb-8 max-sm:px-10">
        Subscribe to get the latest blog, new tech, and exclusive news.
      </p>
      <form
        method="post"
        className="flex justify-center max-w-2xl w-full max-sm:w-100 h-12"
        onSubmit={(evt) => handleSubscription(evt)}
      >
        <input
          type="email"
          className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          name="email"
          id="email"
          value={email}
          onChange={(evt)=>setEmail(evt.target.value)}
          required
          placeholder="Enter yout mail id"
        />
        <button
        type="submit"
          className="md:px-12 px-8 h-full text-white bg-(--color-primary)/80 hover:bg-(--color-primary) transition-all duration-500 cursor-pointer rounded-md rounded-l-none"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default SubscribeBlog;
