import { Router } from "express";
import adminController from "../controller/adminController";
import postsController from "../controller/postsController";
import { verifyAdmin } from "../middlewares/verifyAdmin";
const router = Router();

router.get("/reports", verifyAdmin, adminController.getReportsData);
router.patch("/reports/:reportId", verifyAdmin, adminController.resolveReport);

router.delete("/deletePost/:postId", verifyAdmin, postsController.deletePost)

export default router;
