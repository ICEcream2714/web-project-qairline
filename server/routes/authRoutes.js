// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { validateLogin, validateRegister } = require("../utils/validation");

// Đăng ký
router.post("/register", validateRegister, authController.register);

// Đăng nhập
router.post("/login", validateLogin, authController.login);

module.exports = router;
