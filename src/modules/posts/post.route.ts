import { Router } from "express";
import { auth } from "../../auth/auth";
import { Role } from "../../../generated/prisma/enums";
import { postController } from "./post.controller";

const router = Router()


router.post('/',
    auth(Role.ADMIN, Role.AUTHOR, Role.USER),
    postController.createPost
);

router.get("/", postController.getAllPosts)

router.get("/stats", auth(Role.ADMIN), postController.getPostStats);

router.get("/my-posts",  auth(Role.ADMIN, Role.AUTHOR, Role.USER), postController.getMyPosts);

router.get("/:postId", postController.getPostById);

router.patch("/:postId", auth(Role.ADMIN, Role.AUTHOR, Role.USER), postController.updatePost)

router.delete("/:postId", auth(Role.ADMIN, Role.AUTHOR, Role.USER), postController.deletePost)

export const postRouters = router