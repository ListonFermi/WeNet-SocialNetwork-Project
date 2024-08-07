import { Router } from "express";
import userController from "../controllers/userController";
import { verifyUser } from "../middlewares/verifyUser";
// import { verifyUser } from '@wenet/auth'
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
userRoutes.post("/forgotPassword", userController.forgotPassword);
userRoutes.patch("/changePassword", verifyUser, userController.changePassword);

//account type
userRoutes.patch(
  "/changeAccountType",
  verifyUser,
  userController.changeAccountType
);

//WeNet-tick routes
userRoutes.post(
  "/requestWenetTick",
  verifyUser,
  upload.single("image"),
  profileController.uploadWeNetTickRequestPic,
  userController.requestWenetTick
);
userRoutes.get(
  "/hasRequestedTick",
  verifyUser,
  userController.hasRequestedTick
);
userRoutes.get("/hasWenetTick/:username", userController.hasWenetTick);

// Profile routes
const profileRoutes = Router();
profileRoutes.get("/userData", verifyUser, profileController.getUser);
profileRoutes.patch("/userData", verifyUser, profileController.editUser);
profileRoutes.post(
  "/userData/image/:imageType",
  verifyUser,
  upload.single("image"),
  profileController.updatePic,
  profileController.editUser
);
profileRoutes.get("/search", verifyUser, profileController.searchUsers);

profileRoutes.get(
  "/isFollowing/:userId",
  verifyUser,
  profileController.isFollowing
);
profileRoutes.post(
  "/toggleFollow/:userToFollow",
  verifyUser,
  profileController.toggleFollow
);

profileRoutes.get(
  "/isBlocked/:userId",
  verifyUser,
  profileController.isBlocked
);
profileRoutes.post(
  "/toggleBlock/:userId",
  verifyUser,
  profileController.toggleBlockUser
);
profileRoutes.get(
  "/getBlockedUsers",
  verifyUser,
  profileController.getBlockedUsers
),
  profileRoutes.get(
    "/getFollowing",
    verifyUser,
    profileController.getFollowingUsers
  );

profileRoutes.get("/:username", profileController.getProfileData);
// Routes
router.use("/", userRoutes);
router.use("/profile", profileRoutes);

export default router;
