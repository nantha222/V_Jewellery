import React, { useState, useEffect } from "react";
import HandTracking from "../components/HandTracking";
import TryOn3D from "../components/TryOn3D";

const TryOnPage = () => {
  const [fingerPosition, setFingerPosition] = useState(null);
  const [modelUrl, setModelUrl] = useState(null);

  useEffect(() => {
    const fetchModelUrl = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jewellery"); // Replace with your actual API endpoint
        if (response.ok) {
          const data = await response.json();
          setModelUrl(data.modelUrl); // Adjust according to your API response structure
        } else {
          console.error("Failed to fetch model URL.");
        }
      } catch (error) {
        console.error("Error fetching model URL:", error);
      }
    };

    fetchModelUrl();
  }, []);

  const handleHandDetected = (landmarks) => {
    if (!landmarks || landmarks.length === 0) return;

    const ringFinger = landmarks[12]; // Ring finger tip
    setFingerPosition({ x: ringFinger.x, y: ringFinger.y, z: ringFinger.z });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h2 className="text-3xl font-bold mb-6">Try-On Feature</h2>

      <div className="relative w-[640px] h-[480px] border-2 border-gray-300 rounded-lg">
        <HandTracking onHandDetected={handleHandDetected} />
        {fingerPosition && modelUrl && <TryOn3D modelUrl={modelUrl} position={fingerPosition} />}
      </div>
    </div>
  );
};

export default TryOnPage;
