import { prisma } from "../../lib/prisma"
import { ICreatePostPayload } from "./post.interface"

const createPost =async(payload: ICreatePostPayload, userId: string)=>{
    const result = await prisma.post.create({
        data: {
            ...payload,
            authorId: userId
        }
    })
    return result
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