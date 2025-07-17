import { getPosts } from "../api/blogPost/get/route";
import { Post } from "../post/[slug]/page";
import PostCard from "./PostCard";

export default async function RecentPosts({ limit }: { limit: number }) {
  let posts: Post[] = [];
  try {
    const result = await fetch(getPosts, {
      method: "POST",
      body: JSON.stringify({ limit: limit, order: "desc" }),
      cache: "no-store",
    });
    const data = await result.json();
    posts = data.posts;
  } catch (error) {
    console.log("Error getting post:", error);
  }
  return (
    <div className="flex flex-col justify-center items-center mb-5">
      <h1 className="text-xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-2xl">
        Recent articles
      </h1>
      <div className="flex flex-wrap gap-5 mt-5 justify-center">
        {posts && posts.map((post) => <PostCard key={post._id} post={post} />)}
      </div>
    </div>
  );
}
