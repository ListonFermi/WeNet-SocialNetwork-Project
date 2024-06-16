import { Router } from "express";
import { postController } from "../controllers/postController";
import { postService } from "../services/postService";
import { postRepository } from "../repositories/postRepository";

const router = Router();
const controller = postController(postService(postRepository));

router.post("/", controller.createPost);
router.get("/:id", controller.getPost);
router.get("/user/:userId", controller.getPostsByUser);

export { router as postRoutes };
