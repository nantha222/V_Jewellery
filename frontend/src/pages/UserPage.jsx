import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import ThreeDViewer from "../components/ThreeDViewer";

const UserPage = () => {
  const [catalog, setCatalog] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchJewellery = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jewellery");
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Data:", data);
          setCatalog(data);
        }
      } catch (error) {
        console.error("Failed to fetch jewellery catalog.", error);
      }
    };

    fetchJewellery();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
        Jewellery Collection
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {catalog.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300"
          >
            <img
              src={`http://localhost:5000${item.imageUrl}`}
              alt={item.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-600 text-sm mt-1">
                Price: <span className="font-medium text-gray-900">₹{item.price}</span>
              </p>
              <p className="text-gray-600 text-sm">Weight: {item.weight}g</p>
              <p className="text-gray-500 text-sm mt-2">{item.description}</p>

              {/* View in 3D Button */}
              <button
                onClick={() => setSelectedModel(`http://localhost:5000${item.modelUrl}`)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
              >
                View in 3D
              </button>

              {/* Try-On Button */}
              <button
                onClick={() => navigate(`/tryon?model=${encodeURIComponent(item.modelUrl)}&type=${item.type}`)}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all"
              >
                Try On
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 3D Model Viewer Modal */}
      {selectedModel && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full relative">
            <button
              onClick={() => setSelectedModel(null)}
              className="absolute top-2 right-2 text-red-600 text-xl"
            >
              ✖
            </button>
            <div className="w-full h-[500px]">
              <ThreeDViewer modelUrl={selectedModel} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
