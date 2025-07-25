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


export const getAllPostsStatic = async (limit: number, setTotalPosts: (totalPosts: number) => void, setLastMonthPosts: (lastMonthPosts: number) => void) =>{
    await unAuthAxiosInstance.get("/v1/posts?page=1&limit=10" + limit)
        .then(response => {
            setTotalPosts(response.data.pagination.total);
            setLastMonthPosts(response.data.lastMonthPosts);
        })
        .catch(err => {
            const message = err?.response?.data?.message || "Something went wrong, please try again";
            console.log(message);
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
            window.location.reload();
        })
        .catch((error) => {
            const message =
                error?.response?.data?.message ||
                "Something went wrong, please try again";
            console.log(message)
        });
}

export const updatePost = async (data: formValuesUpdate, postId: string | undefined) =>{
    if(!postId)
        return 
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
        })
        .catch((error) => {
            const message =
                error?.response?.data?.message ||
                "Something went wrong, please try again";
            console.log(message)
        });
}

export const deletePost = async (postIdToDelete: string, setPostIdToDelete: (postIdToDelete: string) => void, 
                                    userPosts: Post[], setUserPosts: (userPosts: Post[]) => void ) =>{
    await axiosInstance.delete("v1/posts/" + postIdToDelete)
    .then((response) =>{
        const newPosts = userPosts.filter(
          (post) => post._id !== postIdToDelete
        );
        setUserPosts(newPosts);
        setPostIdToDelete("")
        window.location.reload()
        console.log(response)
    })
    .catch((error) =>{
        const message =
                error?.response?.data?.message ||
                "Something went wrong, please try again";
            console.log(message)
    })
}