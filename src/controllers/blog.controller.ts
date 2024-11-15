import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/blog.model";
import { NextApiRequest } from "next";
import mongoose from "mongoose";

const createBlog = async (req: Request) => {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed." },
      { status: 404 }
    );
  }

  try {
    await dbConnect();

    const { title, description, content, author, image, slug } =
      await req.json();

    if (
      title.trim() === "" ||
      !title ||
      !content ||
      (author && author.trim() === "") ||
      !author ||
      (slug && slug.trim() === "") ||
      !slug
    ) {
      return NextResponse.json(
        { message: "Enter required fields." },
        { status: 404 }
      );
    }

    const newBlog = new Blog({
      title,
      description,
      content,
      author,
      image,
      slug,
    });
    await newBlog.save();

    return NextResponse.json(
      { message: "Blog created successfully", data: newBlog },
      { status: 201 }
    );
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
};

const getAllBlogs = async (req: Request) => {
  if (req.method !== "GET") {
    return NextResponse.json(
      { message: "Method not allowed." },
      { status: 404 }
    );
  }
  try {
    await dbConnect();

    const blogs = await Blog.find({});

    return NextResponse.json(
      { message: "Blogs fetched successfully", data: blogs },
      { status: 201 }
    );
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
};
const updateBlog = async (req: NextApiRequest) => {
  if (req.method !== "PUT") {
    return NextResponse.json(
      { message: "Method not allowed." },
      { status: 405 } // 405 for "Method Not Allowed"
    );
  }

  try {
    await dbConnect();
    const { id } = req.query;
    if (!id) {
      return NextResponse.json(
        { message: "Blog ID is required." },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return NextResponse.json(
        { message: "Blog ID invalid." },
        { status: 400 }
      );
    }

    const { title, description, content, author, image, slug } = await req.body;

    if (
      !title?.trim() ||
      !content?.trim() ||
      !author?.trim() ||
      !slug?.trim()
    ) {
      return NextResponse.json(
        { message: "Please provide all required fields." },
        { status: 400 }
      );
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, description, content, author, image, slug },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog not found." }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog updated successfully.", data: updatedBlog },
      { status: 200 }
    );
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
};

export { createBlog, getAllBlogs, updateBlog };
