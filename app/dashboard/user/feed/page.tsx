"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import api from "@/lib/api";
import { LoaderCircleIcon } from 'lucide-react';

interface Post {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  comments: Comment[];
}

interface Comment {
  id: string;
  commenter: string;
  content: string;
  timestamp: string;
}

const UserFeedPage = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!session) return;

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/users/${session?.user?.id}/feed`);
        setPosts(res?.data?.data);
      } catch (error: any) {
        if (isAxiosError(error)) {
          toast.error(error?.response?.data?.message ?? "Something went wrong");
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [session]);

  const handleAddComment = async (postId: string, commentContent: string) => {
    try {
      const res = await api.post(`/api/posts/${postId}/comments`, {
        content: commentContent,
      });

      if (res?.data?.success) {
        toast.success("Comment added successfully!");
        setPosts((prevPosts) =>
          prevPosts?.map((post) =>
            post?.id === postId
              ? { ...post, comments: [...post?.comments, res?.data?.data] }
              : post
          )
        );
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="container px-4 md:px-6 py-6">
          <ScrollArea className="w-full whitespace-nowrap">
            {loading ? (
              <div className="flex justify-center items-center">
                <LoaderCircleIcon className="animate-spin" />
              </div>
            ) : (
              posts?.map((post) => (
                <Card key={post?.id}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar>
                      <AvatarImage src={`https://picsum.photos/seed/${post?.author}/200`} alt={post?.author} />
                      <AvatarFallback>{post?.author?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium">{post?.author}</p>
                      <p className="text-xs text-muted-foreground">{new Date(post?.timestamp).toLocaleString()}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{post?.content}</p>
                  </CardContent>
                  <CardFooter className="space-y-4">
                    <div className="text-sm">
                      {post?.comments?.map((comment) => (
                        <div key={comment?.id} className="flex flex-col">
                          <span className="font-medium">{comment?.commenter}</span>
                          <p>{comment?.content}</p>
                          <span className="text-muted-foreground text-xs">{new Date(comment?.timestamp).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" onClick={() => handleAddComment(post?.id, "New Comment")}>
                      Add Comment
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </ScrollArea>
        </section>
      </main>
    </div>
  );
};

export default UserFeedPage;