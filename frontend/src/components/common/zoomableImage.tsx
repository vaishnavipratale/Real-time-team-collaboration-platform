import React, { useState } from "react";
import { Icons } from "@components/icons";

const ZoomableImage: React.FC<{ src: string; alt: string }> = ({
  src,
  alt,
}) => {
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: "50%", y: "50%" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x: `${x}%`, y: `${y}%` });
  };

  return (
    <div
      className={`relative w-full h-96 overflow-hidden  rounded-lg bg-white group ${
        zoom ? "cursor-zoom-out" : "cursor-zoom-in"
      }`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setZoom(true)}
      onMouseLeave={() => setZoom(false)}
    >
      {/* Main Image */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-contain transition-transform duration-300 ${
          zoom ? "scale-150" : "scale-100"
        }`}
        style={{
          transformOrigin: `${position.x} ${position.y}`,
        }}
      />

      {/* Zoom Icon (visible before zoom) */}
      {!zoom && (
        <div className="absolute top-2 right-2 bg-black/60 p-2 rounded-full opacity-100">
          <Icons.Search className="w-5 h-5 text-white" /> {/* Magnifier icon */}
        </div>
      )}
    </div>
  );
};

export default ZoomableImage;
