import { Router } from "express";
import adsControllers from "../controllers/adsControllers";
import { verifyUser } from "../middlewares/verifyUser";
const router = Router();

router.post('/addTransaction',  adsControllers.addTransaction  )
router.get('/getPosts', verifyUser,  adsControllers.getPosts  )

export default router;
