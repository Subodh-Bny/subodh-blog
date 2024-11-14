"use client";

import { useState } from "react";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

const initialPosts = [
  {
    id: 1,
    title: "My First Blog Post",
    date: "2024-03-15",
    status: "Published",
  },
  { id: 2, title: "Thoughts on React", date: "2024-03-20", status: "Draft" },
  {
    id: 3,
    title: "Next.js 14 Features",
    date: "2024-03-25",
    status: "Published",
  },
];

export default function BlockPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState({
    id: null,
    title: "",
    content: "",
  });

  const handleAddNew = () => {
    setIsEditing(true);
    setCurrentPost({ id: null, title: "", content: "" });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (post: any) => {
    setIsEditing(true);
    setCurrentPost({ ...post, content: "Sample content for " + post.title });
  };

  const handleDelete = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleSave = () => {
    if (currentPost.id) {
      setPosts(
        posts.map((post) =>
          post.id === currentPost.id
            ? { ...post, title: currentPost.title }
            : post
        )
      );
    } else {
      const newPost = {
        id: posts.length + 1,
        title: currentPost.title,
        date: new Date().toISOString().split("T")[0],
        status: "Draft",
      };
      setPosts([...posts, newPost]);
    }
    setIsEditing(false);
    setCurrentPost({ id: null, title: "", content: "" });
  };

  return (
    <div className="w-full h-screen bg-gray-100 dark:bg-black">
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
          <div className="bg-white dark:bg-black  p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              {currentPost.id ? "Edit Post" : "Add New Post"}
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={currentPost.title}
                  onChange={(e) =>
                    setCurrentPost({ ...currentPost, title: e.target.value })
                  }
                  placeholder="Enter post title"
                />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={currentPost.content}
                  onChange={(e) =>
                    setCurrentPost({ ...currentPost, content: e.target.value })
                  }
                  placeholder="Enter post content"
                  rows={10}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save</Button>
              </div>
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell>{post.status}</TableCell>
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
                        onClick={() => handleDelete(post.id)}
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
