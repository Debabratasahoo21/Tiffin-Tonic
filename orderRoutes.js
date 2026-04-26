const express = require("express");
const router  = express.Router();
const Order   = require("../models/Order");

// Place Order
router.post("/place", async (req, res) => {
  try {
    console.log("📦 Incoming Order:", req.body);

    const { name, phone, address, meal, price, quantity, mealTime } = req.body;

    if (!name || !phone || !address || !meal) {
      return res.status(400).json({
        success: false,
        message: "Missing fields",
      });
    }

    const total   = price * quantity;
    const orderId = "TT-" + Date.now();

    const newOrder = new Order({
      orderId, name, phone, address,
      meal, price, quantity, mealTime, total,
    });

    await newOrder.save();
    console.log("✅ Order Saved!");

    res.json({ success: true, orderId, total });

  } catch (err) {
    console.error("❌ Order Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;