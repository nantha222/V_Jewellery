const Jewelry = require("../models/Jewellery");
const fs = require("fs");
const path = require("path");

// Upload Jewelry
exports.uploadJewellery = async (req, res) => {
    try {
        const { name, price, weight, description } = req.body;
        
        if (!req.files || !req.files.imageFile || !req.files.modelFile) {
            return res.status(400).json({ message: "Image and model files are required" });
        }

        const imageFileId = req.files.imageFile[0].id;
        const modelFileId = req.files.modelFile[0].id;
        const modelFileName = req.files.modelFile[0].originalname.toLowerCase();

        let modelType = "unknown";
        if (modelFileName.includes("ring")) modelType = "ring";
        else if (modelFileName.includes("bangle") || modelFileName.includes("bracelet")) modelType = "bangle";

        const jewellery = new Jewelry({ 
            name, 
            price, 
            weight, 
            description, 
            imageFileId, 
            modelFileId, 
            modelType
        });

        await jewellery.save();
        res.status(201).json({ message: "Jewellery uploaded successfully", modelType });

    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ message: "Upload failed", error: error.message });
    }
};


// Fetch Jewelry Itemsexports.fetchJewelry = async (req, res) => {
    try {
        const jewelries = await Jewelry.find();
        const updatedJewelries = jewelries.map(jewelry => ({
            ...jewelry._doc,
            imageUrl: `/uploads/${jewelry.imageFileId}`, // Modify based on actual storage path
            modelUrl: `/models/${jewelry.modelFileId}`
        }));
        res.json(updatedJewelries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }


// Update Jewelry Item
exports.updateJewelry = async (req, res) => {
    try {
        const { price, weight, description } = req.body;
        const jewelry = await Jewelry.findByIdAndUpdate(req.params.id, { price, weight, description }, { new: true });

        if (!jewelry) return res.status(404).json({ message: "Jewelry not found" });

        res.json({ message: "Updated successfully", jewelry });
    } catch (error) {
        res.status(500).json({ message: "Update failed." });
    }
};

// Delete Jewelry Item
exports.deleteJewelry = async (req, res) => {
    try {
        const jewelry = await Jewelry.findByIdAndDelete(req.params.id);
        if (!jewelry) return res.status(404).json({ message: "Jewelry not found" });

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
