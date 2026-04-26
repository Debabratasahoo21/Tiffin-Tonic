const express = require("express");
const cors    = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const app = express();

// ✅ STEP 1: Allow frontend to talk to backend (CORS fixed)
app.use(cors({
  origin: "*",             // Allow everyone during development
  methods: ["GET", "POST"]
}));

// ✅ STEP 2: Tell server to understand JSON (MUST be before routes!)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ STEP 3: Test route - open browser and go to http://10.179.203.27:5000/
app.get("/", (req, res) => {
  res.send("✅ Tiffin Tonic API is Running!");
});

// ✅ STEP 4: Connect routes
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/auth",   require("./routes/authRoutes"));

// ✅ STEP 5: Handle unknown errors
app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err);
  res.status(500).json({ success: false, message: "Server Error" });
});

// ✅ STEP 6: Start everything
const PORT = 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server is ON → http://10.179.203.27:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
  }
};

startServer();