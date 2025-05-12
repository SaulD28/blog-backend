import { Router } from "express";
import { createComment, deleteComment, getCommentsByPost } from "./comment.controller.js";

const router = Router();

router.post("/comments", createComment);
router.get("/comments/:postId", getCommentsByPost);
router.delete("/comments/:id", deleteComment);

export default router;