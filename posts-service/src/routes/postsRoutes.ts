import { Router } from "express";
import { verifyUser } from "../middlewares/verifyUser";
import upload from "../utils/multer";
import postsController from "../controller/postsController";

const router = Router();

router.post(
  "/createPost/image",
  verifyUser,
  upload.single("image"),
  postsController.createPost
);
router.post("/createPost", verifyUser, postsController.addCaption);
router.get("/singlePost/:postId", postsController.getSinglePost); //protect route
router.patch("/editPost/:postId",verifyUser, postsController.editPost)
router.delete("/deletePost/:postId",verifyUser, postsController.deletePost)
router.patch('/toggleLike/:entity/:entityId', verifyUser,postsController.toggleLike)

export default router;
