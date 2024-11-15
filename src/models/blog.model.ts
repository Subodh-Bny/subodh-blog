import mongoose, { Schema } from "mongoose";

interface IBlog extends Document {
  title: string;
  slug: string;
  description: string;
  createdAt?: string;
  author: string;
  image: string;
  content: unknown;
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    author: { type: String, required: true },
    content: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;
