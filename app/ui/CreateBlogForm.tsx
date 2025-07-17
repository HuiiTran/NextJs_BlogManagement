"use client";
import { Button, Select, TextInput } from "flowbite-react";
import React from "react";
import Tiptap from "./Tiptap/Tiptap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";

const formSchema = yup.object({
  blogTitle: yup.string().required("Blog's title is required"),
  blogCategory: yup.string().required("Please choose 1 category"),
  content: yup.string().required("Please enter some contents"),
});
export type formValues = yup.InferType<typeof formSchema>;
const CreateBlogForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    control,
  } = useForm<formValues>({
    resolver: yupResolver(formSchema),
  });
  const onSubmit = async (data: formValues) => {
    console.log(data);
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
            {...register("blogTitle")}
          />
          {errors.blogTitle && <div>{errors.blogTitle.message}</div>}
          <Select className="w-[160px]" {...register("blogCategory")}>
            <option defaultValue="uncategorized">Uncategorized</option>
            <option value="health">Health</option>
            <option value="cuisine">Cuisine</option>
            <option value="code">Code</option>
            <option value="cloth">Cloth</option>
          </Select>
          {errors.blogCategory && <div>{errors.blogCategory.message}</div>}
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
