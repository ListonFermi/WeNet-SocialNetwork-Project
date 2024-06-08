import { Router } from 'express';
import userController from '../controllers/userController';
const router = Router();

router.post('/signup', userController.signupController);
router.post('/signup/sendOTP', userController.sendOTPController);
router.post('/signup/verifyOTP', userController.verifyOTPController);

export default router;
