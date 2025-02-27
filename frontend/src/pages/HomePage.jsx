import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const HomePage = () => {
  const [jewelryList, setJewelryList] = useState([]);
  const [message, setMessage] = useState("");
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const fetchJewelry = async () => {
      try {
        const response = await fetch("https://lj2dpdwr-5000.inc1.devtunnels.ms/api/jewellery");
        if (response.ok) {
          const data = await response.json();
          setJewelryList(data);
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
      const response = await fetch(`https://lj2dpdwr-5000.inc1.devtunnels.ms/api/jewellery/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setJewelryList(jewelryList.filter((item) => item._id !== id));
        setMessage("Item deleted successfully!");
      } else {
        setMessage("Failed to delete item.");
      }
    } catch (error) {
      setMessage("An error occurred while deleting the item.");
    }
  };

  const handleEdit = (item) => {
    setEditItem({ ...item });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://lj2dpdwr-5000.inc1.devtunnels.ms/api/jewellery/update/${editItem._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price: editItem.price,
          weight: editItem.weight,
          description: editItem.description,
        }),
      });

      if (response.ok) {
        setJewelryList(
          jewelryList.map((item) => (item._id === editItem._id ? editItem : item))
        );
        setMessage("Item updated successfully!");
        setEditItem(null);
      } else {
        setMessage("Failed to update item.");
      }
    } catch (error) {
      setMessage("An error occurred while updating the item.");
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
        Jewelry Collection
        <span className="block text-base md:text-lg text-emerald-600 mt-2">
          Manage Your Designs
        </span>
      </h1>

      {message && (
        <div className={`text-center mb-6 p-3 rounded-lg ${
          message.includes("success") ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
        }`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jewelryList.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] group"
          >
            <div className="h-60 bg-gray-100 relative">
              <img
                src={`http://localhost:5000${item.imageUrl}`}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-emerald-100 text-emerald-600 shadow-sm"
                >
                  <FiEdit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-red-100 text-red-600 shadow-sm"
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
              <div className="flex gap-4 mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                  ₹{item.price}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                  {item.weight}g
                </span>
              </div>
              <p className="text-gray-600 line-clamp-3">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Edit Item</h3>
            <input
              type="number"
              value={editItem.price}
              onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
              className="w-full p-3 mb-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="Price"
            />
            <input
              type="number"
              value={editItem.weight}
              onChange={(e) => setEditItem({ ...editItem, weight: e.target.value })}
              className="w-full p-3 mb-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="Weight"
            />
            <textarea
              value={editItem.description}
              onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
              className="w-full p-3 mb-6 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 h-32"
              placeholder="Description"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditItem(null)}
                className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-5 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
