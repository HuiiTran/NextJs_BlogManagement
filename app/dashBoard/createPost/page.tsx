"use client";

import { useUser } from "@clerk/nextjs";
const CreatePostPage = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) return null;

  if (isSignedIn && user.publicMetadata?.isAdmin) {
    return <>CreatePostPage</>;
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
