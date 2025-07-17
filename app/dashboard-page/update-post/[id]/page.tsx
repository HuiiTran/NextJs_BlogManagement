"use client";

import { Post } from "@/app/post/[slug]/page";
import UpdateBlogForm from "@/app/ui/UpdateBlogForm";
import { postAPIURL } from "@/app/utils/paths";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}
const CreatePostPage = ({ params }: BlogPostPageProps) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [post, setPosts] = useState<Post>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    async function getPost() {
      const { id } = await params;
      try {
        console.log(id);
        const result = await fetch(postAPIURL + "/get", {
          method: "POST",
          body: JSON.stringify({ postId: id }),
          cache: "no-store",
        });
        const data = await result.json();
        await setPosts(data.posts[0]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getPost();
  }, [params]);

  if (!isLoaded) return null;
  if (loading)
    return <div className="text-center text-5xl pt-10">Loading...</div>;
  if (isSignedIn && user.publicMetadata?.isAdmin) {
    return (
      <div className="pt-10">
        <UpdateBlogForm
          post={post}
          user={String(user.publicMetadata.userMongoId)}
        />
      </div>
    );
  } else
    return (
      <>
        <h1 className="text-center py-10 text-5xl">
          You are not authorized to view this page
        </h1>
      </>
    );
};

export default CreatePostPage;
