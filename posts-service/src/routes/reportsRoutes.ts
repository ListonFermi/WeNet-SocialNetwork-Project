import { Router } from "express";
import { verifyUser } from "../middlewares/verifyUser";
import reportsController from "../controller/reportsController";
const router = Router();

router.post('/:entityType/:entityId', verifyUser, reportsController.addReport)

export default router;
