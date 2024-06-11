import { Router } from 'express';
import userController from '../controllers/userController';
import { verifyUser } from '../middlewares/verifyUser';
import profileController from '../controllers/profileController';
const router = Router();

router.post('/signup', userController.signupController);
router.post('/signup/sendOTP', userController.sendOTPController);
router.post('/signup/verifyOTP', userController.verifyOTPController);
router.post('/login', userController.loginController);
router.post('/login/googleSignin', userController.googleSigninController);

//------------------------------------------------- Profile Routes------------------------------------------------------------//

router.get('/userData',verifyUser, profileController.getUserController )
router.patch('/userData',verifyUser, profileController.editUserController )

export default router;
