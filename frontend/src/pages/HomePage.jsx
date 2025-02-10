import React, { useState, useEffect } from "react";

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
    <div className="min-h-screen w-screen bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-12 px-6">
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
              <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" />
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
                    onClick={() => handleEdit(item)}
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

      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Edit Jewelry</h3>
            <input
              type="number"
              value={editItem.price}
              onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
              className="w-full p-2 border  text-black border-gray-300 rounded-md mb-3"
              placeholder="Price"
            />
            <input
              type="number"
              value={editItem.weight}
              onChange={(e) => setEditItem({ ...editItem, weight: e.target.value })}
              className="w-full p-2 border text-black border-gray-300 rounded-md mb-3"
              placeholder="Weight"
            />
            <textarea
              value={editItem.description}
              onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
              className="w-full p-2 border  text-black border-gray-300 rounded-md mb-3"
              placeholder="Description"
            ></textarea>
            <div className="flex justify-end space-x-4">
              <button onClick={() => setEditItem(null)} className="px-4 py-2 bg-gray-400 rounded-md">Cancel</button>
              <button onClick={handleUpdate} className="px-4 py-2 bg-green-500 text-white rounded-md">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
