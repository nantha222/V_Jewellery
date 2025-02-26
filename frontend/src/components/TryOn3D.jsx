import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const TryOn3D = ({ modelUrl, position }) => {
  const modelRef = useRef();
  const { scene } = useGLTF(modelUrl);

  useEffect(() => {
    if (modelRef.current && position) {
      modelRef.current.scale.set(0.2, 0.2, 0.2); // Adjust model size
    }
  }, [position]);

  useFrame(() => {
    if (modelRef.current && position) {
      modelRef.current.position.x = (position.x - 0.5) * 2;
      modelRef.current.position.y = -(position.y - 0.5) * 2;
      modelRef.current.position.z = -position.z * 5;
    }
  });

  return (
    <Canvas
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      camera={{ position: [0, 0, 2], fov: 50 }}
    >
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} />
      <primitive ref={modelRef} object={scene} />
    </Canvas>
  );
};

export default TryOn3D;
