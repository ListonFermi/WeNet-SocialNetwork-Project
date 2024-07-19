import { Router } from "express";
import messageControllers from "../controllers/messageControllers";
import upload from "../utils/multer";
import { verifyUser } from "../middlewares/verifyUser";
const router = Router();

router.post(
  "/createConversation/:participantId",
  verifyUser,
  messageControllers.createConversation
);
router.get("/convoList", verifyUser, messageControllers.getConvoList);
router.get("/unreadCount", verifyUser, messageControllers.unreadCount);

router.get("/:convoId", verifyUser, messageControllers.getConvoMessages);
router.post(
  "/:convoId",
  verifyUser,
  upload.any(),
  messageControllers.sendMessage
);

export default router;
