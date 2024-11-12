import React from "react";
import Blogs from "@/components/Blogs";

const BlogPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 animate-slideDown">
          Our Blog Posts
        </h1>
        <Blogs />
      </div>
    </div>
  );
};

export default BlogPage;
