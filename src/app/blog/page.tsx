import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const blogs = [
  {
    title: "Getting Started with React",
    description:
      "Learn the basics of React and how to build your first component based application",
    slug: "getting-started-with-react",
    date: "2023-12-01",
    author: "John Doe",
    image: "/react.webp",
  },
  {
    title: "Advanced CSS Techniques",
    description:
      "Master modern CSS with these advanced styling techniques and best practices",
    slug: "advanced-css-techniques",
    date: "2023-11-28",
    author: "Jane Smith",
    image: "/tailwind.webp",
  },
  {
    title: "JavaScript ES6 Features",
    description: "Explore the powerful new features introduced in ECMAScript 6",
    slug: "javascript-es6-features",
    date: "2023-11-25",
    author: "Mike Johnson",
    image: "/nextjs.webp",
  },
];

const BlogPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 animate-slideDown">
          Our Blog Posts
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
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
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover animate-pulse"
              />

              <div className="p-6">
                <div className="flex items-center text-sm mb-2 animate-slideRight">
                  <span>{blog.author}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(blog.date).toLocaleDateString()}</span>
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
      </div>
    </div>
  );
};

export default BlogPage;
