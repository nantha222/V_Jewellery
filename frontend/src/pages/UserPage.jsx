import React, { useEffect, useState } from "react";
import ThreeDViewer from "../components/ThreeDViewer"; // Ensure correct import path

const UserPage = () => {
  const [catalog, setCatalog] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);

  useEffect(() => {
    const fetchJewellery = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jewellery");
        if (response.ok) {
          const data = await response.json();
          setCatalog(data);
        }
      } catch (error) {
        console.error("Failed to fetch jewellery catalog.", error);
      }
    };

    fetchJewellery();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">Jewellery Catalog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {catalog.map((item) => (
          <div key={item._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-700 mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-2">Price: ₹{item.price}</p>
              <p className="text-gray-600 mb-2">Weight: {item.weight}g</p>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <button
                onClick={() => setSelectedModel(item.modelUrl)}
                className="text-green-500 hover:underline"
              >
                View as 3D
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedModel && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => {
                setSelectedModel(null);
                window.location.reload(); // Refresh the page
              }}
              className="absolute top-2 right-2 text-red-600 text-xl"
            >
              ✖
            </button>
            <ThreeDViewer modelUrl={selectedModel} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
