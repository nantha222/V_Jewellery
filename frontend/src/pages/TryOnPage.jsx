import React, { useState, useEffect, useRef } from "react";
import HandTracking from "../components/HandTracking";
import TryOn3D from "../components/TryOn3D";
import { FiInfo, FiDownload } from "react-icons/fi";

const TryOnPage = () => {
  const [fingerPosition, setFingerPosition] = useState(null);
  const [modelUrl, setModelUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchModelUrl = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jewellery");
        if (response.ok) {
          const data = await response.json();
          setModelUrl(data[0].modelUrl); // Adjust according to your API response structure
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching model URL:", error);
        setLoading(false);
      }
    };

    fetchModelUrl();
  }, []);

  const handleHandDetected = (landmarks) => {
    if (!landmarks || landmarks.length === 0) return;

    const ringFinger = landmarks[12]; // Ring finger tip
    setFingerPosition({
      x: ringFinger.x,
      y: ringFinger.y,
      z: ringFinger.z,
    });
  };

  const takeSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    const image = new Image();
    image.src = modelUrl;
    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const link = document.createElement("a");
      link.download = "snapshot.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex flex-col items-center py-12 px-4 w-full">
      <div className="max-w-6xl w-full">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-2">Virtual Try-On Studio</h2>
          <p className="text-gray-300 flex items-center justify-center gap-2">
            <FiInfo className="inline-block" />
            Position your hand in front of the camera to try the jewelry
          </p>
        </div>

        {/* Main Try-On Area */}
        <div className="relative w-full aspect-video bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
              <div className="animate-pulse text-white">Loading model...</div>
            </div>
          )}

          <HandTracking onHandDetected={handleHandDetected} />

          {fingerPosition && modelUrl && (
            <>
              <TryOn3D modelUrl={modelUrl} position={fingerPosition} />
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                Hand Detected ✓
              </div>
            </>
          )}

          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>

        {/* Save/Share Section */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={takeSnapshot}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-colors"
          >
            <FiDownload size={18} />
            Take Snapshot
          </button>
        </div>
      </div>
    </div>
  );
};

export default TryOnPage;
