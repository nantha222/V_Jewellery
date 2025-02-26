import React, { useEffect, useRef } from "react";
import "@google/model-viewer";

const ThreeDViewer = ({ modelUrl, position }) => {
  const modelViewerRef = useRef(null);

  useEffect(() => {
    if (position && modelViewerRef.current) {
      const modelViewer = modelViewerRef.current;

      // Convert hand tracking position to 3D space
      const xPos = (position.x - 0.5) * 1.5; // Normalize X
      const yPos = (0.5 - position.y) * 1.5; // Normalize Y (invert)
      const zPos = -0.5; // Depth (tweak if needed)

      // Update the model's position
      modelViewer.setAttribute("camera-target", `${xPos} ${yPos} ${zPos}`);
    }
  }, [position]);

  return (
    <model-viewer
      ref={modelViewerRef}
      src={modelUrl}
      alt="3D Model"
      auto-rotate
      camera-controls
      ar
      shadow-intensity="1"
      exposure="1.2"
      environment-image="neutral"
      rotation-per-second="30deg"
      style={{ width: "100%", height: "500px" }}
    />
  );
};

export default ThreeDViewer;
