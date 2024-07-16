import { Router } from "express";
import PayUControllers from "../controllers/PayUControllers";
const router = Router();

router.post('/payment', PayUControllers.payment)
router.post('/response', PayUControllers.response)
router.post('/response/saveData', PayUControllers.saveData)


export default router;
