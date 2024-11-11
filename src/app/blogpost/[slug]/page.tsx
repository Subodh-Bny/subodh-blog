import React from "react";

const Blogpost = ({ params }: { params: { slug: string } }) => {
  return <section>My post: {params.slug}</section>;
};

export default Blogpost;
