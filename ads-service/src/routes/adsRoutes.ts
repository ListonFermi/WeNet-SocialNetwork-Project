import { Router } from "express";
import { verifyUser } from "../middlewares/verifyUser";
const router = Router();

// router.get("/", verifyUser, notificationController.getNotifications );
router.get('/',(req,res)=>res.send('hello'))

export default router;
