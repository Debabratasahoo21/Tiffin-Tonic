const express = require("express");
const router  = express.Router();
const User    = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false, message: "All fields required",
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false, message: "User already exists",
      });
    }

    const user = new User({ name, email, phone, password });
    await user.save();

    res.json({ success: true, message: "Registered successfully!" });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({
        success: false, message: "Invalid credentials",
      });
    }

    res.json({ success: true, message: "Login successful!" });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;