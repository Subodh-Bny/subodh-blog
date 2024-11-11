import React from "react";

const BlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  return <div>My Post: {slug}</div>;
};

export default BlogPage;
