const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// Import routes
const authRoutes = require("./src/routes/authRoute.js");
const jewelleryRoutes = require("./src/routes/jewelleryRoute.js");

// Load environment variables
dotenv.config();

const app = express();

// Middleware Setup
app.use(cors({ origin: "*" })); // Allow all origins
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Fix: Correct static file serving for "uploads"
app.use("/uploads", express.static(path.join(__dirname, "src", "uploads")));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI; // ✅ Fix: Load MongoDB URI

if (!MONGO_URI) {
    console.error("❌ MONGO_URI is not defined in .env file");
    process.exit(1);
}

// ✅ Fix: Correct MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        process.exit(1);
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
