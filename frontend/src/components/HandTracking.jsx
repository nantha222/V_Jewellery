import React, { useEffect, useRef } from "react";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";

const HandTracking = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  let hands;

  useEffect(() => {
    const initializeMediaPipe = async () => {
      hands = new Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      hands.onResults(onResults);

      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          await hands.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });

      camera.start();
    };

    const onResults = (results) => {
      if (results.multiHandLandmarks) {
        console.log("Hand detected:", results.multiHandLandmarks);
      } else {
        console.log("No hands detected.");
      }
    };

    initializeMediaPipe().catch(console.error);

    return () => {
      if (hands) {
        hands.close();
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline width="640" height="480" />
      <canvas ref={canvasRef} width="640" height="480" style={{ position: "absolute", top: 0, left: 0 }} />
    </div>
  );
};

export default HandTracking;
