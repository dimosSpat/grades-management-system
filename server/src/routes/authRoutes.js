const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authMiddleware");

const {
  register,
  login,
  me,
} = require("../controllers/authController");

router.get("/me", authenticateToken, me);
router.post("/register", register);
router.post("/login", login);

module.exports = router;