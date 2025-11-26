"use client";
import { createPost } from "@/actions/posts-actions";
import PostForm from "@/components/post-form";

export default function NewPostPage() {
  // We pass the server action to a client component through props
  return <PostForm action={createPost} />;
}
