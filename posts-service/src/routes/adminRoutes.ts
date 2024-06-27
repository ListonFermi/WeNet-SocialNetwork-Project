import { Router } from "express";
import adminController from "../controller/adminController";
import postsController from "../controller/postsController";
const router = Router();

router.get("/reports", adminController.getReportsData);
router.patch("/reports/:reportId", adminController.resolveReport);

router.delete("/deletePost/:postId", postsController.deletePost)

export default router;
