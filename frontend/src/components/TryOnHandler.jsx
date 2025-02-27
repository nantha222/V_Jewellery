import React, { useState } from "react";
import HandTracking from "./HandTracking";
import ThreeDModelViewer from "./ThreeDModelViewer";

const TryOnHandler = () => {
  const [jewelryType, setJewelryType] = useState("ring");

  return (
    <div className="flex flex-col items-center space-y-6">
      <HandTracking onHandDetected={(hand) => console.log("Hand detected:", hand)} />
      <ThreeDModelViewer jewelryType={jewelryType} />
    </div>
  );
};

export default TryOnHandler;
