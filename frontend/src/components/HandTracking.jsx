import React, { useEffect, useRef } from "react";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";

const HandTracking = ({ onHandDetected }) => {
  const videoRef = useRef(null);
  const handsRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults((results) => {
      if (results.multiHandLandmarks.length > 0) {
        onHandDetected(results.multiHandLandmarks[0]); // Send first detected hand
      }
    });

    handsRef.current = hands;

    const camera = new Camera(videoElement, {
      onFrame: async () => {
        if (handsRef.current) {
          await handsRef.current.send({ image: videoElement });
        }
      },
      width: 640,
      height: 480,
    });

    cameraRef.current = camera;
    camera.start();

    return () => {
      if (handsRef.current) {
        handsRef.current.close();
        handsRef.current = null;
      }

      if (cameraRef.current) {
        cameraRef.current.stop();
        cameraRef.current = null;
      }
    };
  }, [onHandDetected]);

  return (
    <div className="flex flex-col items-center">
      <video
        ref={videoRef}
        className="w-[640px] h-[480px] border-2 border-gray-300 rounded-lg"
        autoPlay
      />
    </div>
  );
};

export default HandTracking;
