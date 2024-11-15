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

import { useRouter } from "next/navigation";
import { useGetAllBlogs } from "@/services/api/blogApi";
import EditForm from "./blog/EditForm";

export default function BlockPage() {
  const { data: blogs } = useGetAllBlogs();
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<IBlog>({
    _id: "",
    title: "",
    content: "",
    slug: "",
    description: "",
    author: "",
    image: "",
  });

  // const router = useRouter();

  const handleAddNew = () => {
    setCurrentPost({
      _id: "",
      title: "",
      content: "",
      slug: "",
      description: "",
      author: "",
      image: "",
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (post: any) => {
    // router.push("/dashboard/blog/edit");
    setIsEditing(true);

    setCurrentPost({ ...post });
  };

  const handleSave = () => {
    if (currentPost._id) {
      // setPosts(posts.map(post => post.id === currentPost.id ? { ...post, title: currentPost.title } : post))
    } else {
      // const newPost = {
      //   id: posts.length + 1,
      //   title: currentPost.title,
      //   date: new Date().toISOString().split('T')[0],
      //   status: 'Draft'
      // }
      // setPosts([...posts, newPost])
    }
    setIsEditing(false);
    setCurrentPost({
      _id: "",
      title: "",
      content: "",
      slug: "",
      description: "",
      author: "",
      image: "",
    });
  };

  const handleDelete = (id: string) => {};

  return (
    <div className="w-full h-full min-h-screen bg-gray-100 dark:bg-black">
      <main className=" p-8">
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
                    <TableCell>{post.title}</TableCell>
                    <TableCell>
                      {post?.createdAt
                        ? new Date(post.createdAt).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell>{post.author}</TableCell>
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
