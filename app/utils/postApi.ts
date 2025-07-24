import { UseFormReset } from "react-hook-form";
import { formValues } from "../ui/CreateBlogForm";
import axiosInstance, { unAuthAxiosInstance } from "./axiosInstance";
import { Post } from "../post/[slug]/page";
import { formValuesUpdate } from "../ui/UpdateBlogForm";

export const getAllPosts = async (limit: number) : Promise<Post[]> =>{
    return await unAuthAxiosInstance.get("/v1/posts?page=1&limit=10" + limit)
        .then(response => {
            const posts = response.data.data;
            return posts;
        })
        .catch(err => {
            const message = err?.response?.data?.message || "Something went wrong, please try again";
            console.log(message);
            return;
        });
}

export const getPostBySlug = async (slug: string) : Promise<Post> =>{
    return await unAuthAxiosInstance.get("/v1/posts/slug/" + slug)
        .then(response => {
            const post = response.data.data;
            return post;
        })
        .catch(err => {
            const message = err?.response?.data?.message || "Something went wrong, please try again";
            console.log(message);
            return;
        });
}

export const getPostById = async (id: string) : Promise<Post> =>{
    return await unAuthAxiosInstance.get("/v1/posts/Id/" + id)
        .then(response => {
            const post = response.data.data;
            return post;
        })
        .catch(err => {
            const message = err?.response?.data?.message || "Something went wrong, please try again";
            console.log(message);
            return;
        });
}

export const createPost = async (data: formValues, reset: UseFormReset<formValues>) =>{
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("title", data.title)
    formData.append("category", data.category);
    formData.append("content", data.content);
    console.log(data)
    await axiosInstance.post("v1/posts/", formData)
        .then((response)=>{
            console.log(response)
            reset()
        })
        .catch((error) => {
            const message =
                error?.response?.data?.message ||
                "Something went wrong, please try again";
            console.log(message)
        });
}

export const updatePost = async (data: formValuesUpdate,postId: string, reset: UseFormReset<formValues>) =>{
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("title", data.title)
    formData.append("category", data.category);
    formData.append("content", data.content);
    formData.append("postId", postId)
    console.log(data)
    await axiosInstance.put("v1/posts/", formData)
        .then((response)=>{
            console.log(response)
            reset()
        })
        .catch((error) => {
            const message =
                error?.response?.data?.message ||
                "Something went wrong, please try again";
            console.log(message)
        });
}