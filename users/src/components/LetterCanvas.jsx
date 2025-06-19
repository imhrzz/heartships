import { useEffect, useRef } from "react";
import { fabric } from "fabric";

const LetterCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 500,
      height: 300,
      backgroundColor: "#f8f8f8",
    });

    const text = new fabric.Text("Your Letter Here", {
      left: 50,
      top: 100,
      fontSize: 20,
      fill: "#333",
    });

    canvas.add(text);
  }, []);

  return <canvas ref={canvasRef} className="border border-gray-300" />;
};

export default LetterCanvas;
