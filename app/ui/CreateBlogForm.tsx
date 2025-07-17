"use client";
import { Button, Select, TextInput } from "flowbite-react";
import React from "react";
import Tiptap from "./Tiptap/Tiptap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";

const formSchema = yup.object({
  title: yup.string().required("Blog's title is required"),
  category: yup.string().required("Please choose 1 category"),
  content: yup.string().required("Please enter some contents"),
});
export type formValues = yup.InferType<typeof formSchema>;
const CreateBlogForm = ({ user }: { user: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<formValues>({
    resolver: yupResolver(formSchema),
  });
  const onSubmit = async (data: formValues) => {
    const response = await fetch("/api/blogPost/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, user }),
    });
    if (!response.ok) {
      console.log("Failed to create blog post");
      return;
    }
    const result = await response.json();
    console.log("Blog post created:", result);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[810px] m-auto flex flex-col gap-2"
      >
        <div className="flex flex-row gap-5">
          <TextInput
            id="base"
            type="text"
            sizing="md"
            className="w-full"
            placeholder="Blog's title"
            {...register("title")}
          />
          {errors.title && <div>{errors.title.message}</div>}
          <Select className="w-[160px]" {...register("category")}>
            <option defaultValue="uncategorized">Uncategorized</option>
            <option value="health">Health</option>
            <option value="cuisine">Cuisine</option>
            <option value="code">Code</option>
            <option value="cloth">Cloth</option>
          </Select>
          {errors.category && <div>{errors.category.message}</div>}
        </div>
        <Controller
          name="content"
          control={control}
          render={({ field }) => {
            return (
              <Tiptap initialContent={field.value} onChange={field.onChange} />
            );
          }}
        />

        {errors.content && <div>{errors.content.message}</div>}
        <Button disabled={isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default CreateBlogForm;
