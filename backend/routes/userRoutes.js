const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  updateProfilePicture,
} = require('../controllers/userControllers');

const { authGuard } = require('../middleware/authMiddleware');


router.post("/register", registerUser);
router.post("/login", loginUser);
//要加入authGuard才能使用
router.get("/profile", authGuard, userProfile);
router.put("/updateProfile", authGuard, updateProfile);
router.put("/updateProfilePicture", authGuard, updateProfilePicture);

module.exports = router;
