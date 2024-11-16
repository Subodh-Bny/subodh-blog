"use client";

import { useState } from "react";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteBlog, useGetAllBlogs } from "@/services/api/blogApi";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import { IBlog } from "@/types";

const EditForm = dynamic(() => import("./blog/EditForm"), { ssr: false });

export default function BlogPage() {
  const { data: blogs, isError, isLoading } = useGetAllBlogs();
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<IBlog>({
    _id: "",
    title: "",
    content: { blocks: [] },
    slug: "",
    description: "",
    author: "",
    image: "",
  });
  const { mutate: deleteBlog } = useDeleteBlog({
    onSuccess: () => {
      toast.success("Blog deleted successfully!");
    },
  });

  const handleAddNew = () => {
    setIsEditing(true);
    setCurrentPost({
      _id: "",
      title: "",
      content: { blocks: [] },

      slug: "",
      description: "",
      author: "",
      image: "",
    });
  };

  const handleEdit = (post: IBlog) => {
    setIsEditing(true);
    setCurrentPost({ ...post });
  };

  const handleDelete = (id: string) => {
    deleteBlog(id);
  };

  if (isLoading) return <p>Loading blogs...</p>;
  if (isError) return <p>Failed to load blogs. Please try again later.</p>;

  return (
    <div className="w-full h-full min-h-screen bg-gray-100 dark:bg-black">
      <main className="p-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
            Blog Posts
          </h1>
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Post
          </Button>
        </div>
        {isEditing ? (
          <EditForm post={currentPost} setIsEditing={setIsEditing} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs &&
                blogs.map((post) => (
                  <TableRow key={post._id}>
                    <TableCell>{post.title || "Untitled"}</TableCell>
                    <TableCell>
                      {post?.createdAt
                        ? new Date(post.createdAt).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell>{post.author || "Unknown"}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(post)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(post._id || "")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </main>
    </div>
  );
}
