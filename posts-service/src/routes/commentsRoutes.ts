import { Router } from "express";
import { verifyUser } from "../middlewares/verifyUser";
import commentsController from "../controller/commentsController";
const router = Router();

router.post('/:postId', verifyUser,commentsController.addComment)
router.patch('/:commentId', verifyUser,commentsController.editComment)
router.delete('/:commentId', verifyUser,commentsController.deleteComment)

export default router;
