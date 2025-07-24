"use client";
import { Button, Select, TextInput } from "flowbite-react";
import React from "react";
import Tiptap from "./Tiptap/Tiptap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller, useWatch, Control } from "react-hook-form";
import { postAPIURL } from "../utils/paths";
import { UploadIcon } from "lucide-react";
import { createPost } from "../utils/postApi";

const formSchema = yup.object({
  title: yup.string().required("Blog's title is required"),
  category: yup.string().required("Please choose 1 category"),
  content: yup.string().required("Please enter some contents"),
  image: yup
    .mixed<FileList>()
    .test(
      "fileRequired",
      "File is required",
      (value) => value && value.length > 0
    )
    .required("File is required"),
});
export type formValues = yup.InferType<typeof formSchema>;

function ImgName({ control }: { control: Control<formValues> }) {
  const img = useWatch({
    control,
    name: "image",
    defaultValue: undefined,
  });
  return (
    <div className="w-[378px] text-black truncate">
      {img && img.length > 0 ? (
        <div className="font-[500]">
          Chosen file:{" "}
          <span className="font-[300] underline">{img[0].name}</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

const CreateBlogForm = ({ user }: { user: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<formValues>({
    resolver: yupResolver(formSchema),
  });
  const onSubmit = async (data: formValues) => {
    await createPost(data, reset);
    // const response = await fetch(postAPIURL + "/create", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ ...data, user }),
    // });
    // if (!response.ok) {
    //   console.log("Failed to create blog post");
    //   return;
    // }
    // reset();
    //window.location.reload();
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[810px] m-auto flex flex-col gap-2"
      >
        <div className="flex flex-row gap-5">
          <div className="flex flex-col gap-1 w-full">
            <TextInput
              id="base"
              type="text"
              sizing="md"
              className="w-full"
              placeholder="Blog's title"
              {...register("title")}
            />
            {errors.title && (
              <div className="text-red-700">{errors.title.message}</div>
            )}
          </div>
          <Select className="w-[160px] lowercase" {...register("category")}>
            <option value="uncategorized">Uncategorized</option>
            <option value="health">Health</option>
            <option value="cuisine">Cuisine</option>
            <option value="code">Code</option>
            <option value="cloth">Cloth</option>
          </Select>
          {errors.category && (
            <div className="text-red-700">{errors.category.message}</div>
          )}
        </div>
        <div className="w-full h-[150px]">
          <div className={errors.image && "border-red-400 border-2 rounded-lg"}>
            <div className={"flex items-center justify-center"}>
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-[120px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center">
                  <UploadIcon className="w-6 h-6 text-gray-400" />
                  <p className="text-sm font-[500] text-gray-500 dark:text-gray-400">
                    Drag and drop here to upload
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    png, .jpg, 1000x1000px
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  accept=".png, .jpg"
                  className="hidden"
                  {...register("image")}
                />
              </label>
            </div>
          </div>
          <ImgName control={control} />
          {errors.image && (
            <div className="text-[#FF3333] text-[12px]">
              {errors.image.message}
            </div>
          )}
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

        {errors.content && (
          <div className="text-red-700">{errors.content.message}</div>
        )}
        <Button disabled={isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default CreateBlogForm;
