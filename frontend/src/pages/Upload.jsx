import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

const Upload = () => {
  const [jewelry, setJewelry] = useState({
    name: "",
    price: "",
    weight: "",
    description: "",
    imageFile: null,
    modelFile: null,
    imageUrl: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJewelry({ ...jewelry, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      setJewelry({
        ...jewelry,
        [name]: files[0],
        imageUrl: name === "imageFile" ? URL.createObjectURL(files[0]) : jewelry.imageUrl,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!jewelry.imageFile || !jewelry.modelFile) {
      setMessage("Please upload both image and 3D model files");
      return;
    }

    const formData = new FormData();
    formData.append("name", jewelry.name);
    formData.append("price", jewelry.price);
    formData.append("weight", jewelry.weight);
    formData.append("description", jewelry.description);
    formData.append("imageFile", jewelry.imageFile);
    formData.append("modelFile", jewelry.modelFile);

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/jewellery/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("Jewelry uploaded successfully!");
        setJewelry({
          name: "",
          price: "",
          weight: "",
          description: "",
          imageFile: null,
          modelFile: null,
          imageUrl: "",
        });
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
        Upload Design
        <span className="block text-base md:text-lg text-emerald-600 mt-2">
          Create New Jewelry Entry
        </span>
      </h2>

      {message && (
        <div className={`mb-6 p-3 rounded-lg ${
          message.includes("success") ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={jewelry.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={jewelry.price}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weight (g)</label>
            <input
              type="number"
              name="weight"
              value={jewelry.weight}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={jewelry.description}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 h-32"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Product Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center relative h-48">
              <input
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              {jewelry.imageUrl ? (
                <img src={jewelry.imageUrl} alt="Preview" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <FiUploadCloud className="w-8 h-8 text-emerald-500 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload image</p>
                  <p className="text-xs text-gray-400">JPEG, PNG (max 5MB)</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">3D Model</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center relative h-48">
              <input
                type="file"
                name="modelFile"
                accept=".glb"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="flex flex-col items-center justify-center h-full">
                <FiUploadCloud className="w-8 h-8 text-emerald-500 mb-2" />
                <p className="text-sm text-gray-500">Click to upload 3D model</p>
                <p className="text-xs text-gray-400">GLB format only</p>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Uploading..." : "Publish Design"}
        </button>
      </form>
    </div>
  );
};

export default Upload;
