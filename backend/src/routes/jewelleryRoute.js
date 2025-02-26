const express = require('express');
const router = express.Router();
const Jewelry = require('../models/Jewellery.js');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // Limit file size to 200 MB
  fileFilter: function (req, file, cb) {
    if (file.fieldname === 'imageFile' && !file.mimetype.match(/jpe|jpg|png/)) {
      return cb(new Error('Only jpg and png image files are allowed!'));
    }
    
    cb(null, true);
  },
});

// Upload a new jewelry item
router.post('/upload', upload.fields([{ name: 'imageFile' }, { name: 'modelFile' }]), async (req, res) => {
  const { name, price, weight, description } = req.body;
  const imageFile = req.files['imageFile'][0];
  const modelFile = req.files['modelFile'][0];

  if (!imageFile || !modelFile) {
    return res.status(400).json({ message: 'Both image and 3D model files are required.' });
  }

  // ✅ Identify modelType based on the file name
  const modelFileName = modelFile.originalname.toLowerCase();
  let modelType = "unknown";
  if (modelFileName.includes("ring")) modelType = "ring";
  else if (modelFileName.includes("bangle") || modelFileName.includes("bracelet")) modelType = "bangle";

  const newJewelry = new Jewelry({
    name,
    price,
    weight,
    description,
    imageUrl: `/uploads/${imageFile.filename}`,
    modelUrl: `/uploads/${modelFile.filename}`,
    modelType, // ✅ Save detected modelType
  });

  try {
    await newJewelry.save();
    res.status(201).json({ message: 'Jewelry uploaded successfully!', jewelry: newJewelry });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading jewelry.', error: error.message });
  }
});


// Fetch all jewelry items
router.get('/', async (req, res) => {
  try {
    const jewelryList = await Jewelry.find();
    res.status(200).json(jewelryList);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jewelry items.', error: error.message });
  }
});

// Delete a jewelry item by ID
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedJewelry = await Jewelry.findByIdAndDelete(id);
    if (!deletedJewelry) {
      return res.status(404).json({ message: 'Jewelry item not found.' });
    }
    res.status(200).json({ message: 'Jewelry item deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting jewelry item.', error: error.message });
  }
});

// Update a jewelry item by ID
router.patch('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { price, weight, description } = req.body;

  try {
    const updatedJewelry = await Jewelry.findByIdAndUpdate(
      id,
      { price, weight, description },
      { new: true }
    );
    if (!updatedJewelry) {
      return res.status(404).json({ message: 'Jewelry item not found.' });
    }
    res.status(200).json({ message: 'Jewelry item updated successfully!', jewelry: updatedJewelry });
  } catch (error) {
    res.status(500).json({ message: 'Error updating jewelry item.', error: error.message });
  }
});

module.exports = router;
