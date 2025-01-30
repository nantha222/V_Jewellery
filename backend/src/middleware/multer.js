import multer from "multer";
import path from "path";

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique file name
  },
});

// File filter for allowed file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpg", "image/png", "application/octet-stream"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only .jpg, .png, and .glb are allowed."), false);
  }
};

// Multer middleware
const upload = multer({ storage, fileFilter });

export default upload;
