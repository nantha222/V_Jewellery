import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const ThreeDViewer = ({ modelUrl }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!modelUrl) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 500 / 500, 0.1, 1000);
    camera.position.set(0, 1, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(500, 500);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);

    // Load 3D Model
    const loader = new GLTFLoader();
    let model;
    loader.load(
      modelUrl,
      (gltf) => {
        model = gltf.scene;
        model.scale.set(1.5, 1.5, 1.5);
        model.position.set(0, -1, 0);
        scene.add(model);
      },
      undefined,
      (error) => console.error("Error loading GLB model:", error)
    );

    // OrbitControls for manual rotation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth rotation
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 1;
    controls.enableZoom = true; // Allow zoom
    controls.enablePan = true; // Allow panning
    controls.target.set(0, 0, 0); // Focus point

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup function
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [modelUrl]);

  return <div ref={mountRef} className="w-full h-full"></div>;
};

export default ThreeDViewer;
