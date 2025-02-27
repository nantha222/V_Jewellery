import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThreeDViewer from "../components/ThreeDViewer";
import { FiDollarSign, FiTrendingUp, FiAnchor, FiEye, FiShoppingBag, FiStar, FiArrowRight } from "react-icons/fi";

const UserPage = () => {
  const [catalog, setCatalog] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [activeSection, setActiveSection] = useState("products");
  const navigate = useNavigate();

  // Sample data for popular jewelry models
  const popularCollections = [
    {
      name: "Solitaire Rings",
      image: "/img/solitaire.jpg",
      description: "Timeless elegance in pure diamond perfection"
    },
    {
      name: "Pearl Necklaces",
      image: "/img/pearl.jpg",
      description: "Classic luxury from the ocean's depths"
    },
    {
      name: "Diamond Bracelets",
      image: "/img/bracelet.jpg",
      description: "Sparkling elegance for your wrist"
    }
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-400 w-full px-6 py-12">
      {/* Navigation Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            Try_On <span className="text-blue-200">Jewel</span>
          </h1>

          <div className="flex gap-4 bg-white/20 backdrop-blur-sm p-2 rounded-full">
            <button
              onClick={() => setActiveSection("products")}
              className={`px-6 py-2 rounded-full transition-all ${activeSection === "products" ? "bg-blue-600 text-white" : "text-blue-100 hover:bg-white/10"}`}
            >
              <FiShoppingBag className="inline mr-2" />
              Products
            </button>
            <button
              onClick={() => setActiveSection("why-gold")}
              className={`px-6 py-2 rounded-full transition-all ${activeSection === "why-gold" ? "bg-blue-600 text-white" : "text-blue-100 hover:bg-white/10"}`}
            >
              <FiAnchor className="inline mr-2" />
              Why Gold?
            </button>
            <button
              onClick={() => setActiveSection("trends")}
              className={`px-6 py-2 rounded-full transition-all ${activeSection === "trends" ? "bg-blue-600 text-white" : "text-blue-100 hover:bg-white/10"}`}
            >
              <FiTrendingUp className="inline mr-2" />
              Trends
            </button>
          </div>
        </div>

        {/* Section Content */}
        {activeSection === "products" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {catalog.map((item) => (
              <div
                key={item._id}
                className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden transition-transform hover:scale-105 duration-300 group"
              >
                <div className="relative h-72">
                  <img
                    src={`http://localhost:5000${item.imageUrl}`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white">{item.name}</h3>
                    <div className="flex gap-2 mt-2">
                      <span className="px-3 py-1 bg-blue-600/30 text-blue-100 rounded-full text-sm">
                        ₹{item.price}
                      </span>
                      <span className="px-3 py-1 bg-emerald-600/30 text-emerald-100 rounded-full text-sm">
                        {item.weight}g
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-blue-100 text-sm mb-4">{item.description}</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedModel(`http://localhost:5000${item.modelUrl}`)}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all"
                    >
                      <FiEye />
                      3D View
                    </button>
                    <button
                      onClick={() => navigate(`/tryon?model=${encodeURIComponent(item.modelUrl)}`)}
                      className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition-all"
                    >
                      <FiShoppingBag />
                      Try On
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === "why-gold" && (
          <div className="grid md:grid-cols-2 gap-8 text-white">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Why Invest in Gold?</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-600/30 rounded-lg">
                    <FiDollarSign size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Hedge Against Inflation</h4>
                    <p className="text-blue-100 text-sm">
                      Gold maintains its value over time, protecting your wealth from currency devaluation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-600/30 rounded-lg">
                    <FiStar size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Diversification</h4>
                    <p className="text-blue-100 text-sm">
                      Adding gold to your portfolio can reduce overall risk and volatility.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-600/30 rounded-lg">
                    <FiAnchor size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Safe Haven</h4>
                    <p className="text-blue-100 text-sm">
                      Gold is often seen as a safe haven during times of economic uncertainty.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-600/30 rounded-lg">
                    <FiTrendingUp size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Long-Term Growth</h4>
                    <p className="text-blue-100 text-sm">
                      Historically, gold has shown steady growth over long periods.
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate("/gold-rates")}
                className="mt-4 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition-all w-full"
              >
                <FiArrowRight />
                View Current Gold Rates
              </button>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Gold Investment Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-600/20 rounded-xl text-center">
                  <div className="text-3xl font-bold mb-1">+15%</div>
                  <div className="text-lg text-blue-200">Annual Appreciation</div>
                  <p className="text-blue-100 text-lg mt-2">
                    Explanation: Gold has historically shown an average annual increase in value of about 15%. This means that if you invest in gold, its value tends to go up by around 15% each year.
                  </p>
                </div>
                <div className="p-4 bg-blue-600/20 rounded-xl text-center">
                  <div className="text-3xl font-bold mb-1">$2T</div>
                  <div className="text-lg text-blue-200">Global Market Size</div>
                  <p className="text-blue-100 text-lg mt-2 ">
                    Explanation: The total value of all the gold in the world that is traded and held as investments is approximately $2 trillion. This indicates the significance and scale of gold as a global asset.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "trends" && (
          <div className="grid md:grid-cols-3 gap-8">
            {popularCollections.map((collection, index) => (
              <div key={index} className="relative group overflow-hidden rounded-xl h-96">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-bold text-white mb-2">{collection.name}</h3>
                  <p className="text-blue-200 text-sm">{collection.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3D Viewer Modal */}
      {selectedModel && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl max-w-4xl w-full mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold">3D Preview</h3>
              <button
                onClick={() => setSelectedModel(null)}
                className="text-2xl hover:text-red-600 transition-colors"
              >
                ✖
              </button>
            </div>
            <div className="h-[600px] p-4">
              <ThreeDViewer modelUrl={selectedModel} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
