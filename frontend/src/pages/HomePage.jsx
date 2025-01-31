import React, { useState, useEffect } from "react";

const HomePage = () => {
  const [jewelryList, setJewelryList] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchJewelry = async () => {
      try {
        const response = await fetch("https://lj2dpdwr-5000.inc1.devtunnels.ms/api/jewellery");
        if (response.ok) {
          const data = await response.json();
          setJewelryList(data);
          console.log(data)
        } else {
          setMessage("Failed to fetch items.");
        }
      } catch (error) {
        setMessage("An error occurred while fetching items.");
      }
    };

    fetchJewelry();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/jewellery/delete/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        setJewelryList(jewelryList.filter((item) => item._id === id));
        setMessage("Failed to delete item.");
        
      } else {
        setMessage("Item deleted successfully!");
        // Reload the page to auto-refresh
        window.location.reload();
      }
    } catch (error) {
      setMessage("An error occurred while deleting the item.");
    }
  };
  

  return (
    <div className="h-full w-screen bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white bg-opacity-10 p-8 rounded-lg shadow-2xl">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">Uploaded Jewelry</h2>
        {message && (
          <p className={`text-center font-medium mb-6 ${message.includes("Failed") ? "text-red-400" : "text-green-400"}`}>
            {message}
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {jewelryList.map((item) => (
            <div key={item._id} className="bg-white bg-opacity-90 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
              <img
                src={`http://localhost:5000/${item.imageUrl.replace(/\\/g, "/")}`}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-3">
                <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                <p className="text-gray-700">Price: ₹{item.price}</p>
                <p className="text-gray-700">Weight: {item.weight}g</p>
                <p className="text-gray-600 text-sm">{item.description}</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => alert("Edit feature coming soon!")}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
