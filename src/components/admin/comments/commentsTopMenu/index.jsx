import React from "react";

const CommentsTopMenuSection = ({ status, setStatus }) => {
  return (
    <section className="flex justify-between items-center max-w-3xl">
      <h6>Comments</h6>
      <div className="flex gap-3">
        <button
          className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
            status ? "text-(--color-primary)" : "text-black"
          }`}
          onClick={() => setStatus(!status)}
        >
          Approved
        </button>
        <button
          className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
            !status ? "text-(--color-primary)" : "text-black"
          }`}
          onClick={() => setStatus(!status)}
        >
          Not Approved
        </button>
      </div>
    </section>
  );
};

export default CommentsTopMenuSection;
