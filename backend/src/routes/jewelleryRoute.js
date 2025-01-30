const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const Jewellery = require("../models/Jewellery");

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Save files to the uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filenames
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpg|jpeg|png|gltf|glb/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (extname) {
      return cb(null, true);
    }
    cb(new Error("Only .jpg, .jpeg, .png, .gltf, and .glb formats are allowed!"));
  },
});

// Add a new jewellery item
router.post("/", upload.fields([{ name: "imageFile" }, { name: "modelFile" }]), async (req, res) => {
  try {
    const { name, price, weight, description } = req.body;

    const imageUrl = req.files.imageFile
      ? `/uploads/${req.files.imageFile[0].filename}`
      : null;

    const modelUrl = req.files.modelFile
      ? `/uploads/${req.files.modelFile[0].filename}`
      : null;

    const newJewellery = new Jewellery({
      name,
      price,
      weight,
      description,
      imageUrl,
      modelUrl,
    });

    const savedJewellery = await newJewellery.save();
    res.status(201).json(savedJewellery);
  } catch (error) {
    console.error("Error saving jewellery:", error);
    res.status(500).json({ message: "Failed to save jewellery item" });
  }
});

// Get all jewellery items
router.get("/", async (req, res) => {
  try {
    const jewelleryItems = await Jewellery.find();
    res.status(200).json(jewelleryItems);
  } catch (error) {
    console.error("Error fetching jewellery:", error);
    res.status(500).json({ message: "Failed to fetch jewellery items" });
  }
});

module.exports = router;
