import RecentPosts from "@/app/ui/RecentPosts";
import RenderContent from "@/app/ui/Tiptap/RenderContent";
// import { postAPIURL } from "@/app/utils/paths";
import { getPostBySlug } from "@/app/utils/postApi";
import { Button } from "flowbite-react";
import Image from "next/image";
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
  updatedAt: string;
  image: string;
};
interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}
const PostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  let post: Post = {
    _id: "",
    content: "",
    title: "",
    category: "",
    slug: "",
    userId: "",
    createdAt: "",
    updatedAt: "",
    image: "",
  };
  try {
    post = await getPostBySlug(slug);
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
        <Button color="gray" pill size="xs" className="cursor-pointer">
          {post && post.category}
        </Button>
      </Link>
      <div className="pt-6 flex items-center justify-center">
        <Image
          className="rounded-l"
          width={250}
          height={200}
          src={"http://localhost:5035" + post.image}
          alt={""}
        />
      </div>
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
