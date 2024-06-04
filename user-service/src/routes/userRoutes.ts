import { Router } from 'express';
import userController from '../controllers/userController';
const router = Router();

router.post('/signup', userController.signupController);

export default router;
