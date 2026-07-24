import { Router } from "express";
import { auth } from "../../auth/auth";
import { Role } from "../../../generated/prisma/enums";
import { commentController } from "./comment.controller";

const router = Router()

router.post("/",auth(Role.ADMIN, Role.AUTHOR, Role.USER), commentController.createComment)

router.get("/author/:authorId", commentController.getCommentByAuthorId)

router.get("/:commentId",  commentController.getCommentByCommentId)

router.patch("/:commentId", auth(Role.ADMIN, Role.AUTHOR, Role.USER), commentController.updateComment)

router.delete("/:commentId", auth(Role.ADMIN, Role.AUTHOR, Role.USER), commentController.deleteComment)

router.put("/:commentId/moderate", auth(Role.ADMIN, Role.AUTHOR, Role.USER), commentController.moderateComment)
export const commentRouters  = router;