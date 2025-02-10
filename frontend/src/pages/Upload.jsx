import React, { useState } from "react";

const Upload = () => {
  const [jewelry, setJewelry] = useState({
    name: "",
    price: "",
    weight: "",
    description: "",
    imageFile: null,
    modelFile: null,
    imageUrl: "", // For previewing the uploaded image
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJewelry({ ...jewelry, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setJewelry({
        ...jewelry,
        [name]: files[0],
        imageUrl: name === "imageFile" ? URL.createObjectURL(files[0]) : jewelry.imageUrl,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jewelry.imageFile || !jewelry.modelFile) {
      setMessage("Please upload both an image and a 3D model.");
      return;
    }

    // Validate file extensions
    if (!jewelry.imageFile.name.toLowerCase().endsWith(".jpg")) {
      setMessage("Only .jpg files are allowed for images.");
      return;
    }
    if (!jewelry.modelFile.name.toLowerCase().endsWith(".glb")) {
      setMessage("Only .glb files are allowed for 3D models.");
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
      const response = await fetch("https://lj2dpdwr-5000.inc1.devtunnels.ms/api/jewellery/upload", {
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
    <div className="h-screen w-screen bg-gradient-to-br from-blue-900 flex justify-center items-center">
      <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Upload Jewelry Design</h2>

        {message && (
          <p
            className={`text-center font-medium mb-6 ${
              message.includes("Error") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-600 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={jewelry.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={jewelry.price}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Weight (g)</label>
            <input
              type="number"
              name="weight"
              value={jewelry.weight}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={jewelry.description}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Image Upload */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">Image (.jpg only)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center relative">
                <input
                  type="file"
                  name="imageFile"
                  accept=".jpg"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                {jewelry.imageUrl ? (
                  <img src={jewelry.imageUrl} alt="Preview" className="w-full h-32 object-cover rounded-md" />
                ) : (
                  <p className="text-gray-500">Click to upload image</p>
                )}
              </div>
            </div>

            {/* 3D Model Upload */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">3D Model (.glb only)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center relative">
                <input
                  type="file"
                  name="modelFile"
                  accept=".glb"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <p className="text-gray-500">
                  {jewelry.modelFile ? jewelry.modelFile.name : "Click to upload 3D model"}
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-101 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Uploading..." : "Upload Design"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
