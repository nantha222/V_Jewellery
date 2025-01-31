const Jewelry = require("../models/Jewellery.js");
const path = require("path");

exports.uploadJewelry = async (req, res) => {
    try {
        const { name, price, weight, description } = req.body;
        const imageUrl = req.files["imageFile"]?.[0]?.path || "";
        const modelUrl = req.files["modelFile"]?.[0]?.path || "";

        const newJewelry = new Jewelry({ name, price, weight, description, imageUrl, modelUrl });
        await newJewelry.save();

        res.status(201).json({ message: "Jewelry uploaded successfully", jewelry: newJewelry });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.fetchjewelry = async (req, res) => {
    try {
        const jewelries = await Jewelry.find();
        res.json(jewelries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.deleteJewelry = async (req, res) => {
    try {
        const jewelry = await Jewelry.findByIdAndDelete(req.params.id);  // Get id from URL params
        if (!jewelry) return res.status(404).json({ message: "Jewelry not found" });

        // Delete the corresponding image file
        const imagePath = path.join(__dirname, "..", jewelry.imageUrl);  // Ensure the path is correct
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

        res.json({ message: "Jewelry deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}; exports.deleteJewelry = async (req, res) => {
    try {
        const jewelry = await Jewelry.findByIdAndDelete(req.params.id);  // Get id from URL params
        if (!jewelry) return res.status(404).json({ message: "Jewelry not found" });

        // Delete the corresponding image file
        const imagePath = path.join(__dirname, "..", jewelry.imageUrl);  // Ensure the path is correct
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

        res.json({ message: "Jewelry deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}; 
exports.deleteJewelry = async (req, res) => {
    try {
        const jewelry = await Jewelry.findByIdAndDelete(req.params.id);  // Get id from URL params
        if (!jewelry) return res.status(404).json({ message: "Jewelry not found" });

        // Delete the corresponding image file
        const imagePath = path.join(__dirname, "..", jewelry.imageUrl);  // Ensure the path is correct
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

        res.json({ message: "Jewelry deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
