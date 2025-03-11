const express = require("express");
const User = require("../models/User");

const {
  register,
  login,
  getProtected,
} = require("../controllers/authcontroller");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/protected", authenticateToken, getProtected);

router.get("/users", authenticateToken, async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
