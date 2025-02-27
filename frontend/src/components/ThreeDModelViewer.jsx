import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { fetchModel } from "../api/fetchModel";

const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
};

const ThreeDModelViewer = ({ jewelryType }) => {
  const [modelURL, setModelURL] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const url = await fetchModel(jewelryType);
      setModelURL(url);
    };
    loadModel();
  }, [jewelryType]);

  if (!modelURL) return <p>Loading...</p>;

  return (
    <Canvas camera={{ position: [0, 2, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Model url={modelURL} />
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeDModelViewer;
