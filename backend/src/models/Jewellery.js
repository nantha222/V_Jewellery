const mongoose = require("mongoose");

const jewellerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  weight: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  modelUrl: { type: String, required: true },
});

module.exports = mongoose.model("Jewellery", jewellerySchema);
