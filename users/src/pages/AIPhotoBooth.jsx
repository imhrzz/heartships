import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

// Filters for the captured image
const filters = {
  none: "none",
  bw: "grayscale(100%)",
  sepia: "sepia(80%)",
  vintage: "contrast(80%) saturate(50%)",
  blur: "blur(3px)",
  bright: "brightness(120%)",
};

const PhotoBooth = () => {
  const [capturedImages, setCapturedImages] = useState([]);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("none");
  const [timer, setTimer] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error("Camera access denied", error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const ctx = canvas.getContext("2d");
      canvas.width = 400;
      canvas.height = 600;
      ctx.filter = filters[selectedFilter];
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/png");
    }
    return null;
  };

  const capturePhotosAutomatically = async () => {
    setIsCapturing(true);
    let photos = [];
    for (let i = 0; i < 4; i++) {
      for (let t = 3; t > 0; t--) {
        setTimer(t);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setTimer(null);
      const photo = capturePhoto();
      if (photo) photos.push(photo);
    }
    setCapturedImages(photos);
    setIsCapturing(false);
  };

  const downloadPhotoStrip = async () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 2000;
    ctx.fillStyle = "#f5e1c8";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await Promise.all(
      capturedImages.map((imgSrc, index) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = imgSrc;
          img.onload = () => {
            ctx.drawImage(img, 50, index * 500 + 50, 400, 500);
            resolve();
          };
        });
      })
    );

    ctx.font = "30px cursive";
    ctx.fillStyle = "gray";
    ctx.fillText("AI PhotoBooth", 150, 1950);

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "photo_strip.png";
    link.click();
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 relative">
      <motion.h1 className="text-4xl font-bold mb-6">
        Smile your heart out!
      </motion.h1>
      <video
        ref={videoRef}
        autoPlay
        className="w-80 h-60 rounded-md shadow-lg mb-4"
        style={{ filter: filters[selectedFilter] }}
      ></video>

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      <div className="flex gap-3">
        {!isCameraActive ? (
          <button
            onClick={startCamera}
            className="bg-[#3E2A28] hover:bg-[#5c443f] text-white px-4 py-2 rounded-md"
          >
          Start
          </button>
        ) : (
          <button
            onClick={stopCamera}
            className="bg-[#3E2A28] hover:bg-[#5c443f] text-white px-4 py-2 rounded-md"
          >
          Stop
          </button>
        )}
        <button
          onClick={capturePhotosAutomatically}
          disabled={isCapturing}
          className={`px-4 py-2 rounded-md text-white ${
            isCapturing ? "bg-gray-500 cursor-not-allowed" : "bg-[#3E2A28] hover:bg-[#5c443f]"
          }`}
        >
        Capture
        </button>
      </div>

      {timer !== null && (
        <motion.div
          className="absolute text-6xl font-bold text-red-500"
          initial={{ scale: 2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {timer}
        </motion.div>
      )}

      {capturedImages.length === 4 && (
        <button
          onClick={downloadPhotoStrip}
          className="mt-4 bg-[#3E2A28] hover:bg-[#5c443f] text-white px-4 py-2 rounded-md"
        >
          Download
        </button>
      )}

      <div className="mt-4 flex gap-2 flex-wrap justify-center">
        {Object.keys(filters).map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-3 py-1 rounded-md border ${
              selectedFilter === filter
                ? "bg-[#3E2A28] text-white"
                : "bg-white text-gray-800"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PhotoBooth;
