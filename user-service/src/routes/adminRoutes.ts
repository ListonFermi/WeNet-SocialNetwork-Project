import { Router } from "express";
import adminController from "../controllers/adminController";
import { verifyAdmin } from "../middlewares/verifyAdmin";
const router = Router();

router.post("/login", adminController.login);

router.get("/usermanagement", verifyAdmin, adminController.userManagement);
router.get(
  "/dashboardCardData",
  verifyAdmin,
  adminController.dashboardCardData
);
router.get(
  "/dashboardChartData",
  verifyAdmin,
  adminController.dashboardChartData
);
router.get(
  "/dashboardChartData/AccountType",
  verifyAdmin,
  adminController.dashboardChartDataAccountType
);
router.get(
  "/getTickRequestsData",
  verifyAdmin,
  adminController.getTickRequestsData
);
router.patch(
  "/changeTickRequestStatus/:requestId",
  verifyAdmin,
  adminController.changeTickRequestStatus
);

export default router;
