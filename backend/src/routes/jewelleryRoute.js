const express = require("express");
const router = express.Router();
const { uploadJewelry, fetchjewelry, deleteJewelry } = require("../controllers/jewelleryController.js");
const multer = require("multer");
const path = require("path");

// Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post(
  "/upload",
  upload.fields([{ name: "imageFile", maxCount: 1 }, { name: "modelFile", maxCount: 1 }]),
  uploadJewelry
);

router.get("/", fetchjewelry);
router.delete('/delete/:id', deleteJewelry); 

module.exports = router;
