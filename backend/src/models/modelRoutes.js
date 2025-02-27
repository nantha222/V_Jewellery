import express from "express";
import JewelryModel from "../models/JewelryModel.js";

const router = express.Router();

router.get("/getModel/:type", async (req, res) => {
  const { type } = req.params;

  try {
    const model = await JewelryModel.findOne({ type });

    if (!model) {
      return res.status(404).json({ error: "Model not found" });
    }

    res.json({ modelURL: model.url }); // Return the model URL
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
