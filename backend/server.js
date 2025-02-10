const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const authRoutes = require("./src/routes/authRoute.js");
const jewelleryRoutes = require("./src/routes/jewelleryRoute.js");

// Load environment variables
dotenv.config();

const app = express();

// Middleware Setup
app.use(cors());
app.use(express.json()); // <-- Important for handling JSON requests
app.use(express.urlencoded({ extended: true })); // Handle form data

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("✅ Uploads directory created");
}

// Serve static files
app.use("/uploads", express.static(uploadsDir));

const PORT = process.env.PORT || 5000;

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Exit on failure
  }
};
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jewellery", jewelleryRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
