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
router.get("/singlePost/:postId",verifyUser, postsController.getSinglePost);
router.patch("/editPost/:postId",verifyUser, postsController.editPost)
router.delete("/deletePost/:postId",verifyUser, postsController.deletePost)
router.patch('/toggleLike/:entity/:entityId', verifyUser,postsController.toggleLike)
router.patch('/toggleBookmark/:postId', verifyUser,postsController.toggleBookmark)

router.get("/publicFeed", postsController.getPublicFeed);
router.get("/feed",verifyUser, postsController.getFeed);
router.get("/profileFeed/:username",verifyUser, postsController.getProfileFeed);
router.get("/bookmarkedPosts", verifyUser,postsController.getBookmarkedPosts); 

export default router;
