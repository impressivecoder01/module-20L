import { ICreatePostPayload } from "./post.interface"

const createPost =(payload: ICreatePostPayload)=>{

}
const getAllPosts =()=>{}
const getPostStats =()=>{}
const getMyPosts =()=>{}
const getPostById =()=>{}
const updatePost =()=>{}
const deletePost =()=>{}

export const postService = {
    deletePost,
    updatePost,
    getPostById,
    getMyPosts,
    getPostStats,
    getAllPosts,
    createPost

}