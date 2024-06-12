import { Router } from 'express';
import userController from '../controllers/userController';
import { verifyUser } from '../middlewares/verifyUser';
import profileController from '../controllers/profileController';
import upload from '../utils/multer';
const router = Router();

router.post('/signup', userController.signupController);
router.post('/signup/sendOTP', userController.sendOTPController);
router.post('/signup/verifyOTP', userController.verifyOTPController);
router.post('/login', userController.loginController);
router.post('/login/googleSignin', userController.googleSigninController);

//------------------------------------------------- Profile Routes------------------------------------------------------------//

router.get('/profile/userData',verifyUser, profileController.getUserController )
router.patch('/profile/userData',verifyUser, profileController.editUserController)
router.post('/profile/userData/image/profilePic',verifyUser,  upload.single('image'), profileController.updateProfilePic , profileController.editUserController)

export default router;