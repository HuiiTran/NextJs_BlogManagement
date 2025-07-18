"use client";
import { Button, Select, TextInput } from "flowbite-react";
import Tiptap from "./Tiptap/Tiptap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { postAPIURL } from "../utils/paths";
import { Post } from "../post/[slug]/page";

const formSchema = yup.object({
  title: yup.string().required("Blog's title is required"),
  category: yup.string().required("Please choose 1 category"),
  content: yup.string().required("Please enter some contents"),
});
export type formValues = yup.InferType<typeof formSchema>;
const UpdateBlogForm = ({
  user,
  post,
}: {
  user: string;
  post: Post | undefined;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
  } = useForm<formValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      title: post?.title,
      category: post?.category,
      content: post?.content,
    },
  });
  const postId = post?._id;
  const onSubmit = async (data: formValues) => {
    const response = await fetch(postAPIURL + "/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, postId, user }),
    });
    if (!response.ok) {
      console.log("Failed to update blog post");
      return;
    }
    window.location.reload();
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
          <Select className="w-[160px] lowercase" {...register("category")}>
            <option value="uncategorized">Uncategorized</option>
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
        <Button disabled={!isDirty} color={"dark"} type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default UpdateBlogForm;
