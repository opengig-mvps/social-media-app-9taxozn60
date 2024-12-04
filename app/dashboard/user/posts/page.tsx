"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LoaderCircleIcon } from "lucide-react";
import api from "@/lib/api";
import { useSession } from "next-auth/react";

interface PostFormData {
  content: string;
}

const PostPage: React.FC = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [editContent, setEditContent] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PostFormData>({
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data: PostFormData) => {
    try {
      setLoading(true);
      const payload = {
        content: data?.content,
      };

      const response = await api.post(
        `/api/users/${session?.user?.id}/posts`,
        payload
      );

      if (response?.data?.success) {
        toast.success("Post created successfully!");
        reset();
      }
    } catch (error: any) {
      toast.error("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (content: string) => {
    setEditContent(content);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await api.delete(
        `/api/users/${session?.user?.id}/posts/${editContent}`
      );

      if (response?.data?.success) {
        toast.success("Post deleted successfully!");
        setEditContent(null);
      }
    } catch (error: any) {
      toast.error("Failed to delete post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Post Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Textarea
                {...register("content", { required: "Content is required" })}
                placeholder="Write your post content here..."
              />
              {errors?.content && (
                <p className="text-red-500 text-sm">{errors?.content?.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />
                  Creating Post...
                </>
              ) : (
                "Create Post"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {editContent && (
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="outline">Delete Post</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                post.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                {loading ? (
                  <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  "Delete"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default PostPage;