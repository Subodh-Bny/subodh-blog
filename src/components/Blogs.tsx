"use client";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useGetAllBlogs } from "@/services/api/blogApi";

const Blogs = () => {
  const { data: blogs, isLoading, isError } = useGetAllBlogs();

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading blogs...</p>;
  }

  if (isError || !blogs?.length) {
    return <p className="text-center text-red-500">Failed to load blogs.</p>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs?.map((blog, index) => (
        <article
          key={index}
          className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 animate-scaleIn"
          style={{
            animationDelay: `${index * 200}ms`,
          }}
        >
          <Image
            width={500}
            height={500}
            src={
              blog.image && blog.image.trim() !== ""
                ? blog.image
                : "/nextjs.webp"
            }
            alt={blog.title}
            className="w-full h-48 object-cover animate-pulse"
          />

          <div className="p-6">
            <div className="flex items-center text-sm mb-2 animate-slideRight">
              <span>{blog.author}</span>
              <span className="mx-2">•</span>
              <span>
                {new Date(blog?.createdAt as string)?.toLocaleDateString()}
              </span>
            </div>

            <h2
              className="text-xl font-semibold mb-3 animate-slideRight"
              style={{ animationDelay: "200ms" }}
            >
              {blog.title}
            </h2>

            <p
              className="mb-4 line-clamp-3 animate-slideRight"
              style={{ animationDelay: "400ms" }}
            >
              {blog.description}
            </p>

            <Link
              href={`/blogpost/${blog.slug}`}
              className={buttonVariants({ variant: "default" })}
            >
              Read More
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Blogs;

//for markdown file
// import * as fs from "fs";
// import path from "path";
// import matter from "gray-matter";
// const contentDirectory = path.join(process.cwd(), "src", "content");
// const dirContent = fs.readdirSync(contentDirectory, "utf-8");
// const blogs = dirContent.map((file) => {
//   const fileContent = fs.readFileSync(`src/content/${file}`, "utf-8");
//   const { data } = matter(fileContent);

//   return data;
// });
