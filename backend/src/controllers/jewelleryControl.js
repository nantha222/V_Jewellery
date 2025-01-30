import Jewelry from "../models/Jewelry";
import fs from "fs";

export async function uploadJewelry(req, res) {
  try {
    // Check if files are uploaded
    const imageFile = req.files.imageFile[0];
    const modelFile = req.files.modelFile[0];

    // Collect data from request
    const { name, category, price, description } = req.body;

    // Save the new jewelry item in the database
    const newJewelry = new Jewelry({
      name,
      category,
      price,
      description,
      imageURL: `/uploads/${imageFile.filename}`, // Save image URL
      modelURL: `/uploads/${modelFile.filename}`, // Save model URL
    });

    await newJewelry.save();

    res.status(201).json({ message: "Jewelry uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload jewelry", error: error.message });
  }
}
