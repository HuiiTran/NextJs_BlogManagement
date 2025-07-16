"use client";

import Tiptap from "@/app/ui/Tiptap/Tiptap";
import { useUser } from "@clerk/nextjs";
import { Select, TextInput } from "flowbite-react";
const CreatePostPage = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) return null;

  if (isSignedIn && user.publicMetadata?.isAdmin) {
    return (
      <div className="w-[810px] m-auto flex flex-col gap-2">
        <div className="flex flex-row gap-5">
          <TextInput
            id="base"
            type="text"
            sizing="md"
            className="w-full"
            placeholder="Blog's title"
          />
          <Select id="countries" className="w-[160px]" required>
            <option selected>Category</option>
            <option value="health">Health</option>
            <option value="cuisine">Cuisine</option>
            <option value="code">Code</option>
            <option value="cloth">Cloth</option>
          </Select>
        </div>
        <Tiptap content={""} />
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
