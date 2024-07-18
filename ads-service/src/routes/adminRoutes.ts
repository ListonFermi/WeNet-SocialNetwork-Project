import { Router } from "express";
import adminController from "../controllers/adminController";
import { verifyAdmin } from "../middlewares/verifyAdmin";
const router = Router();

router.get("/adsManagementData", verifyAdmin, adminController.getAdsManagementData);
router.patch('/toggleStatus/:postId',verifyAdmin,  adminController.toggleStatus  )

export default router;
