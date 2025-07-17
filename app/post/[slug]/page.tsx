import RecentPosts from "@/app/ui/RecentPosts";
import RenderContent from "@/app/ui/Tiptap/RenderContent";
import { Button } from "flowbite-react";
import Link from "next/link";
import React from "react";
export type Post = {
  _id: string;
  content: string;
  title: string;
  category: string;
  slug: string;
  userId: string;
  createdAt: string;
};
interface BlogPostPageProps {
  params: {
    slug: string;
  };
}
export const getPostsURL = "http://localhost:3000/api/blogPost/get";
const PostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = params;
  let post: Post = {
    _id: "",
    content: "",
    title: "",
    category: "",
    slug: "",
    userId: "",
    createdAt: "",
  };
  try {
    const result = await fetch(getPostsURL, {
      method: "POST",
      body: JSON.stringify({ slug: slug }),
      cache: "no-store",
    });
    const data = await result.json();
    post = data.posts[0];
  } catch (error) {
    post.title = "Failed to load post";
    console.log(error);
  }
  if (!post || post.title === "Failed to load post") {
    return (
      <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <h2 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          Post not found
        </h2>
      </main>
    );
  }
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        href={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {post && post.category}
        </Button>
      </Link>
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post?.content?.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      {post && <RenderContent initialContent={post.content} />}
      <div>
        <RecentPosts limit={3} />
      </div>
    </main>
  );
};

export default PostPage;
