const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId:   { type: String, required: true },
  name:      String,
  phone:     String,
  address:   String,
  meal:      String,
  price:     Number,
  quantity:  Number,
  mealTime:  String,
  total:     Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);