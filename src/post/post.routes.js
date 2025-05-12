import { Router } from "express";
import { createDefaultPosts, getPostsByCourseName } from "./post.controller.js";

const router = Router();


router.post('/posts/default', async (req, res) => {
    await createDefaultPosts();
    res.status(201).json({ message: "Posts creados por defecto" });
})
router.get("/posts/:courseName", getPostsByCourseName);

export default router;