"use client";
import Image from "next/image";
import Typed from "typed.js";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useGetAllBlogs } from "@/services/api/blogApi";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";

export default function Home() {
  const el = useRef(null);
  const router = useRouter();
  const {
    data: blogs,
    isLoading: blogLoading,
    isError: blogError,
  } = useGetAllBlogs();

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["<i>Tech</i>", " &amp; Life."],
      typeSpeed: 50,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <main>
      <section className="container px-4 py-10 mx-auto lg:h-128 lg:space-x-8 lg:flex lg:items-center">
        <div className="w-full text-center lg:text-left lg:w-1/2 lg:-mt-8">
          <h1 className="text-3xl leading-snug text-gray-800 dark:text-gray-200 md:text-4xl">
            Welcome to my <span className="font-semibold">Personal Blog</span>{" "}
            where I share
            <br className="hidden lg:block" /> thoughts on{" "}
            <span
              className="font-semibold underline decoration-primary"
              ref={el}
            ></span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
            Join me on this journey as I write about technology, personal
            growth,
            <br className="hidden lg:block" /> and share insights from my
            experiences and learnings!
          </p>
        </div>
        <div className="w-full mt-4 lg:mt-0 lg:w-1/2">
          <Image
            width={500}
            height={500}
            src="/hero.svg"
            alt="blog hero image"
            priority
            className="w-full h-full max-w-md mx-auto "
          />
        </div>
      </section>
      <section className="container px-4 py-16 mx-auto" id="welcome">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
            Welcome to Our Platform
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-300">
            Discover amazing features and solutions for your needs
          </p>
        </div>

        <div className="grid gap-8 mt-12 lg:grid-cols-3">
          {/* Latest Posts - keeping this section */}
          <div className="flex flex-col p-6 space-y-6 rounded-lg shadow-md border dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Latest Posts
              </h3>
              <p className="mt-4 text-gray-500 dark:text-gray-300">
                Fresh content daily
              </p>
            </div>
            <ul className="space-y-4">
              {["Trending topics", "Daily updates", "Featured writers"].map(
                (feature) => (
                  <li key={feature} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-2 text-gray-600 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                )
              )}
            </ul>
            <Link
              href={"/blog"}
              className="w-full px-4 py-2 mt-auto text-white transition-colors duration-300 transform rounded-lg bg-primary hover:bg-primary/70 focus:outline-none text-center"
            >
              Read More
            </Link>
          </div>

          {/* Quick Bio */}
          <div className="flex flex-col p-6 space-y-6 rounded-lg shadow-md border border-primary dark:border-primary hover:shadow-xl transition-shadow">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Connect With Me
              </h3>
              <p className="mt-4 text-gray-500 dark:text-gray-300">
                Let&apos;s stay in touch
              </p>
            </div>
            <ul className="space-y-4">
              {[
                // { platform: "Twitter", handle: "@yourhandle" },
                {
                  platform: "GitHub",
                  handle: "@Subodh-Bny",
                  link: "https://github.com/Subodh-Bny",
                },
                {
                  platform: "LinkedIn",
                  handle: "in/subodh-adhikari-0469922a7",
                  link: "https://www.linkedin.com/in/subodh-adhikari-0469922a7/",
                },
                {
                  platform: "Instagram",
                  handle: "@__subod_h",
                  link: "https://www.instagram.com/__subod_h/",
                },
              ].map((social) => (
                <li key={social.platform} className="flex items-center">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <Link
                    href={social.link}
                    className="ml-2 text-gray-600 dark:text-gray-300"
                    target="_blank"
                  >
                    {social.platform}: {social.handle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Connect */}
          <div className="flex flex-col p-6 space-y-6 rounded-lg shadow-md border dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Quick Bio
              </h3>
              <p className="mt-4 text-gray-500 dark:text-gray-300">
                Tech enthusiast & blogger sharing insights on web development
                and design
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Based in Nepal, writing about technology, design, and
                development.
              </p>
            </div>
            <Link
              href={"/about"}
              className="w-full px-4 py-2 mt-auto text-white transition-colors duration-300 transform rounded-lg bg-primary hover:bg-primary/70 focus:outline-none text-center"
            >
              Read Full Bio
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 transition-all duration-700 ease-out delay-100 motion-safe:animate-pulse">
            Featured Blog Posts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogLoading ? (
              <div className="col-span-3  place-self-center">
                <Spinner />
              </div>
            ) : blogError ? (
              <p className="text-center col-span-3">Error loading blogs</p>
            ) : (
              blogs?.map((blog, index) => {
                if (index < 3) {
                  return (
                    <div
                      key={blog._id}
                      onClick={() => router.push("/blogpost/" + blog.slug)}
                      className="group hover:cursor-pointer rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                    >
                      <div className="aspect-video animate-[pulse_2s_ease-in-out]">
                        <Image
                          src={
                            blog.image && blog.image?.trim() !== ""
                              ? blog.image
                              : "/react.webp"
                          }
                          height={500}
                          width={500}
                          alt="blog thumbnail"
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">
                          {blog.title}
                        </h3>
                        <p className="text-gray-600">{blog.description}</p>
                      </div>
                    </div>
                  );
                }
                return null;
              })
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
