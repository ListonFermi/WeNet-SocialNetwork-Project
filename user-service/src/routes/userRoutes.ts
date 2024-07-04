import { Router } from "express";
import userController from "../controllers/userController";
import { verifyUser } from "../middlewares/verifyUser";
import profileController from "../controllers/profileController";
import upload from "../utils/multer";

const router = Router();

// User routes
const userRoutes = Router();
userRoutes.post("/signup", userController.signupController);
userRoutes.post("/signup/sendOTP", userController.sendOTPController);
userRoutes.post("/signup/verifyOTP", userController.verifyOTPController);
userRoutes.post("/login", userController.loginController);
userRoutes.post("/login/googleSignin", userController.googleSigninController);

//forgot and change password
userRoutes.post('/forgotPassword', userController.forgotPassword)
userRoutes.patch('/changePassword', verifyUser, userController.changePassword)

// Profile routes
const profileRoutes = Router();
profileRoutes.get('/:username', profileController.getProfileData)
profileRoutes.get("/userData",  verifyUser, profileController.getUser);
profileRoutes.patch("/userData", verifyUser, profileController.editUser);
profileRoutes.post(
  "/userData/image/:imageType",
  verifyUser,
  upload.single("image"),
  profileController.updatePic,
  profileController.editUser
);
// /toggleFollow/${userId}
profileRoutes.get("/isFollowing/:userId", verifyUser, profileController.isFollowing);
profileRoutes.post("/toggleFollow/:userToFollow", verifyUser, profileController.toggleFollow);

// Routes
router.use("/", userRoutes);
router.use("/profile", profileRoutes);

export default router;
