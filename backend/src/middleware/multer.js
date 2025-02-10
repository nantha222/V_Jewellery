const multer = require("multer");
const path = require("path");

// Configure storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Directory to save files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    },
});

// File filter for allowed file types
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/octet-stream", "model/gltf-binary"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only .jpg, .png, and .glb are allowed."), false);
    }
};

// Multer middleware
const upload = multer({ storage, fileFilter });

module.exports = upload;
