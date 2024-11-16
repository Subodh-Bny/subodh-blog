import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/blog.model";
import mongoose from "mongoose";
import { internalError } from "./internalError";

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newFields: any = {};
    if (title?.trim()) newFields.title = title;
    if (description?.trim()) newFields.description = description;
    if (author?.trim()) newFields.author = author;
    if (typeof image === "string") newFields.image = image;
    if (slug?.trim()) newFields.slug = slug;

    const newBlog = new Blog({
      ...newFields,
      content,
    });
    await newBlog.save();

    return NextResponse.json(
      { message: "Blog created successfully", data: newBlog },
      { status: 201 }
    );
  } catch (error) {
    return internalError("Error in  createBlog  controller", error);
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
    return internalError("Error in  getAllBlog  controller", error);
  }
};

const updateBlog = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  if (req.method !== "PUT") {
    return NextResponse.json(
      { message: "Method not allowed." },
      { status: 405 } // 405 for "Method Not Allowed"
    );
  }

  try {
    await dbConnect();
    const id = (await params).id;
    if (!id) {
      return NextResponse.json(
        { message: "Blog ID is required." },
        { status: 400 }
      );
    }

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return NextResponse.json(
        { message: "Blog ID is invalid." },
        { status: 400 }
      );
    }

    const { title, description, content, author, image, slug } =
      await req.json();

    if (!title?.trim() || !author?.trim() || !slug?.trim()) {
      return NextResponse.json(
        { message: "Please provide all required fields." },
        { status: 400 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateFields: any = {};
    if (title?.trim()) updateFields.title = title;
    if (description?.trim()) updateFields.description = description;
    if (author?.trim()) updateFields.author = author;
    if (typeof image === "string") updateFields.image = image;
    if (slug?.trim()) updateFields.slug = slug;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { ...updateFields, content },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog not found." }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog updated successfully.", data: updatedBlog },
      { status: 200 }
    );
  } catch (error) {
    return internalError("Error in  updateBlog  controller", error);
  }
};

const deleteBlog = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  if (req.method !== "DELETE") {
    return NextResponse.json(
      { message: "Method not allowed." },
      { status: 405 } // 405 for "Method Not Allowed"
    );
  }

  try {
    await dbConnect();
    const id = (await params).id;
    if (!id) {
      return NextResponse.json(
        { message: "Blog ID is required." },
        { status: 400 }
      );
    }

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return NextResponse.json(
        { message: "Blog ID is invalid." },
        { status: 400 }
      );
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({ message: "Blog not found." }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog deleted successfully.", data: deletedBlog },
      { status: 200 }
    );
  } catch (error) {
    return internalError("Error in  deleteBlog  controller", error);
  }
};

export { createBlog, getAllBlogs, updateBlog, deleteBlog };
