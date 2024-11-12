import React from "react";
import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { reporter } from "vfile-reporter";

const BlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;

  const filepath = `src/content/${slug}.md`;
  if (!fs.existsSync(filepath)) {
    return notFound();
  }
  const fileContent = fs.readFileSync(filepath, "utf-8");
  const { data: blog, content } = matter(fileContent);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeDocument, { title: "" })
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(content);

  const htmlContent = String(processedContent);

  return (
    <div className="min-h-screen ">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <article className=" rounded-2xl shadow-xl p-8">
          <h1 className="text-5xl font-extrabold  tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            {blog.title}
          </h1>
          <p className="text-base mb-4 border-l-4 border-gray-500 pl-4 italic">
            &quot;{blog.description}&quot;
          </p>

          <div className="flex items-center space-x-4 mb-8 border-b border-gray-100 pb-6">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {blog.author.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-lg font-medium ">{blog.author}</p>
              <p className="text-sm font-medium text-gray-500">
                {blog.date.toLocaleDateString()}
              </p>
            </div>
          </div>

          <div
            className="prose prose-xl prose-purple prose-p:text-gray-700 prose-a:text-purple-600 prose-headings:"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>
      </div>
    </div>
  );
};

export default BlogPage;
