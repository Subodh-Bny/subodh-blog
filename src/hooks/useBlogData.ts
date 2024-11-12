import path from "path";
import fs from "fs";
import matter from "gray-matter";

export const useBlogData = () => {
  const contentDirectory = path.join(process.cwd(), "src", "content");
  const dirContent = fs.readdirSync(contentDirectory, "utf-8");
  const blogs = dirContent.map((file) => {
    const fileContent = fs.readFileSync(`src/content/${file}`, "utf-8");
    const { data } = matter(fileContent);

    return data;
  });
  return blogs;
};
