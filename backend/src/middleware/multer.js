const multer = require("multer");

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store in memory for processing
const upload = multer({
  storage: storage,
  limits: { fileSize: 250 * 1024 * 1024 }, // 250MB limit
}).fields([
  { name: "imageFile", maxCount: 1 },
  { name: "modelFile", maxCount: 1 },
]);

module.exports = upload;
