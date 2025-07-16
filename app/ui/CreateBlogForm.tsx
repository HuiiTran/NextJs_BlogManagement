"use client";
import { Select, TextInput } from "flowbite-react";
import React from "react";
import Tiptap from "./Tiptap/Tiptap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const formSchema = yup.object({
  blogTitle: yup.string().required("Blog's title is required"),
  blogCategory: yup.string().required("Please chose 1 category"),
});

const CreateBlogForm = () => {
  return (
    <>
      <div className="w-[810px] m-auto flex flex-col gap-2">
        <div className="flex flex-row gap-5">
          <TextInput
            id="base"
            type="text"
            sizing="md"
            className="w-full"
            placeholder="Blog's title"
          />
          <Select className="w-[160px]" required>
            <option selected>Category</option>
            <option value="health">Health</option>
            <option value="cuisine">Cuisine</option>
            <option value="code">Code</option>
            <option value="cloth">Cloth</option>
          </Select>
        </div>
        <Tiptap content={""} />
      </div>
    </>
  );
};

export default CreateBlogForm;
