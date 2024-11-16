"use client";

import React, { useEffect, useMemo, useState } from "react";
import { notFound } from "next/navigation";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import { unified } from "unified";
import { useGetAllBlogs } from "@/services/api/blogApi";
import { OutputData } from "@editorjs/editorjs";
import { IBlog } from "@/types";

const editorJsToHtml = (content: OutputData) => {
  return content.blocks
    .map((block) => {
      switch (block.type) {
        case "header":
          return `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
        case "paragraph":
          return `<p>${block.data.text}</p>`;
        case "list":
          const tag = block.data.style === "ordered" ? "ol" : "ul";
          const items = block.data.items
            .map((item: string) => `<li>${item}</li>`)
            .join("");
          return `<${tag}>${items}</${tag}>`;
        case "image":
          return `<img src="${block.data.file.url}" alt="${block.data.caption}" />`;
        default:
          return "";
      }
    })
    .join("");
};

const BlogPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { data: blogs, isLoading, isError } = useGetAllBlogs();
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const slug = React.use(params).slug;
  console.log(slug);
  const blog = useMemo(
    () => blogs?.find((b: IBlog) => b.slug === slug),
    [blogs, slug]
  );

  useEffect(() => {
    const convertContent = async () => {
      if (blog) {
        const rawHtmlContent = editorJsToHtml(blog.content);

        const processedContent = await unified()
          .use(rehypeParse, { fragment: true }) // Parse the raw HTML
          .use(rehypePrettyCode, {
            theme: "catppuccin-mocha",
            transformers: [
              transformerCopyButton({
                visibility: "always",
                feedbackDuration: 3000,
              }),
            ],
          })
          .use(rehypeDocument, { title: blog.title })
          .use(rehypeFormat)
          .use(rehypeStringify)
          .process(rawHtmlContent);

        setHtmlContent(String(processedContent));
      }
    };

    convertContent();
  }, [blog]);

  if (isLoading) {
    return <p className="text-center">Loading blog...</p>;
  }

  if (isError || !blogs) {
    return notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <article className="rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            {blog?.title}
          </h1>
          <p className="text-base mb-4 border-l-4 border-gray-500 pl-4 italic">
            &quot;{blog?.description}&quot;
          </p>

          <div className="flex items-center space-x-4 mb-8 border-b border-gray-100 pb-6">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {blog?.author.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-lg font-medium">{blog?.author}</p>
              <p className="text-sm font-medium text-gray-500">
                {new Date(blog?.createdAt as string).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div
            className="prose dark:prose-invert prose-xl prose-p:text-justify prose-purple prose-p:text-gray-700 dark:prose-p:text-white prose-a:text-purple-600 prose-headings:"
            dangerouslySetInnerHTML={{ __html: htmlContent as string }}
          />
        </article>
      </div>
    </div>
  );
};

export default BlogPage;
