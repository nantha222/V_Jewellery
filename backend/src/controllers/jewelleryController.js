const Jewelry = require("../models/Jewellery");
const fs = require("fs");
const path = require("path");

// Upload Jewelry
exports.uploadJewelry = async (req, res) => {
    try {
        const { name, price, weight, description } = req.body;

        // Construct full URLs for image and model
        const imageUrl = req.files["imageFile"]?.[0]?.filename
            ? `${req.protocol}://${req.get("host")}/uploads/${req.files["imageFile"][0].filename}`
            : "";
        
        const modelUrl = req.files["modelFile"]?.[0]?.filename
            ? `${req.protocol}://${req.get("host")}/uploads/${req.files["modelFile"][0].filename}`
            : "";

        const newJewelry = new Jewelry({ name, price, weight, description, imageUrl, modelUrl });
        await newJewelry.save();

        res.status(201).json({ message: "Jewelry uploaded successfully", jewelry: newJewelry });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Fetch Jewelry Items
exports.fetchJewelry = async (req, res) => {
    try {
        const jewelries = await Jewelry.find();
        res.json(jewelries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Update Jewelry Item
exports.updateJewelry = async (req, res) => {
    try {
        const { price, weight, description } = req.body;

        const updatedJewelry = await Jewelry.findByIdAndUpdate(
            req.params.id,
            { price, weight, description },
            { new: true, runValidators: true }
        );

        if (!updatedJewelry) {
            return res.status(404).json({ message: "Jewelry not found" });
        }

        res.json({ message: "Updated successfully", jewelry: updatedJewelry });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Update failed" });
    }
};

// Delete Jewelry Item
exports.deleteJewelry = async (req, res) => {
    try {
        const jewelry = await Jewelry.findByIdAndDelete(req.params.id);
        if (!jewelry) return res.status(404).json({ message: "Jewelry not found" });

        // Delete associated image and model files
        if (jewelry.imageUrl) {
            const imagePath = path.join(__dirname, "..", "uploads", path.basename(jewelry.imageUrl));
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        if (jewelry.modelUrl) {
            const modelPath = path.join(__dirname, "..", "uploads", path.basename(jewelry.modelUrl));
            if (fs.existsSync(modelPath)) fs.unlinkSync(modelPath);
        }

        res.json({ message: "Jewelry deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
