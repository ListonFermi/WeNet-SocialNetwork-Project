import { Router } from "express";
import messageControllers from "../controllers/messageControllers";
import upload from "../utils/multer";
import { verifyUser } from "../middlewares/verifyUser";
const router = Router();

router.get('/:convoId', verifyUser, messageControllers.getConvoMessages)
router.post('/:convoId', verifyUser, upload.any(), messageControllers.sendMessage)

router.post('/createChat/:participantId',messageControllers.createChat)

export default router;
