import { Router } from "express";
import adsControllers from "../controllers/adsControllers";
const router = Router();

router.post('/addTransaction',  adsControllers.addTransaction  )

export default router;
