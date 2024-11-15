import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Editor from "@/components/Editor";
import { OutputData } from "@editorjs/editorjs";
import { useCreateBlog, useUpdateBlog } from "@/services/api/blogApi";
import axios from "axios";

const EditForm = ({
  post,
  setIsEditing,
}: {
  post?: IBlog;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IBlog>();

  const [content, setContent] = useState<OutputData | unknown>();
  const { mutate } = useCreateBlog({
    onSuccess: () => {
      console.log("Blog saved successfully");
    },
  });

  const { mutate: updateBlog } = useUpdateBlog();

  useEffect(() => {
    if (post) {
      setContent(post.content);
      setValue("_id", post._id);
      setValue("title", post.title);
      setValue("author", post.author);
      setValue("description", post.description);
      setValue("slug", post.slug);
      //   setValue("image", post.image);
    }
  }, [post]);

  const handleSaveData: SubmitHandler<IBlog> = async (data) => {
    const formData = new FormData();

    if (data?.image && data.image.length > 0) {
      formData.append("file", data?.image[0]);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_UPLOAD_PRESET as string
      );
      formData.append(
        "cloud_name",
        process.env.NEXT_PUBLIC_CLOUD_NAME as string
      );
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/" +
            process.env.NEXT_PUBLIC_CLOUD_NAME +
            "/image/upload",
          formData
        );
        const imageUrl = response.data.secure_url;
        data.image = imageUrl;

        if (!data._id?.trim()) {
          mutate({ ...data, content });
        } else {
          updateBlog({ ...data, content });
        }
        // console.log("Blog saved:", response);
      } catch (error) {
        console.error("Error saving blog:", error);
      }
    } else {
      if (!data._id?.trim()) {
        mutate({ ...data, content });
      } else {
        updateBlog({ ...data, content });
      }
    }
  };
  return (
    <Card className="w-full max-w-xl mx-auto mt-3">
      <CardHeader>
        <CardTitle>Create New Blog Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleSaveData)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              {...register("title", { required: "Title is required" })}
              placeholder="Enter blog title"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">
              Slug <span className="text-red-500">*</span>
            </Label>
            <Input
              id="slug"
              {...register("slug", { required: "Slug is required" })}
              placeholder="e.g. blog-slug"
            />
            {errors.slug && (
              <p className="text-sm text-red-500">{errors.slug.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Enter description"
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">
              Author <span className="text-red-500">*</span>
            </Label>
            <Input
              id="author"
              {...register("author", { required: "Author is required" })}
              placeholder="Enter blog author name"
            />
            {errors.author && (
              <p className="text-sm text-red-500">{errors.author.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Image</Label>
            <Input id="image" type="file" {...register("image")} />
          </div>

          <div className="space-y-2">
            <Label>
              Content <span className="text-red-500">*</span>
            </Label>
            {/* <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter blog content"
            rows={6}
          /> */}
            <Editor onChange={setContent} />
          </div>
          <div className="space-x-2">
            <Button type="submit">Save Blog</Button>
            <Button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditForm;
