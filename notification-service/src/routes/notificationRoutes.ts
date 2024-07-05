import { Router } from "express";
import { verifyUser } from "../middlewares/verifyUser";
import notificationController from "../controller/notificationController";
const router = Router();

router.get("/", verifyUser, notificationController.getNotifications );

export default router;
