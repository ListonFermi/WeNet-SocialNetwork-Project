import { Router } from "express";
import { verifyUser } from "../middlewares/verifyUser";
import adsControllers from "../controllers/adsControllers";
const router = Router();

router.post('/addTransaction', verifyUser,  adsControllers.addTransaction  )

export default router;
