const express = require("express");
const router = express.Router();
const { uploadJewelry, fetchJewelry, deleteJewelry, updateJewelry } = require("../controllers/jewelleryController");
const upload = require("../middleware/multer");

// Route for uploading jewellery (image & 3D model)
router.post(
    "/upload",
    upload.fields([{ name: "imageFile", maxCount: 1 }, { name: "modelFile", maxCount: 1 }]),
    uploadJewelry
);

// Route for fetching all jewellery items
router.get("/", fetchJewelry);

// Route for updating a jewellery item
router.patch("/update/:id", updateJewelry);

// Route for deleting a jewellery item
router.delete("/delete/:id", deleteJewelry);

module.exports = router;
