const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);

// update profile akun sendiri
router.put("/profile", auth, authController.updateProfile);

// ganti password akun sendiri
router.put("/change-password", auth, authController.changePassword);

module.exports = router;