"use client";
import React, { useState } from "react";
import { Icons } from "@components/icons";

interface ImageCarouselProps {
  images: string[];
  startIndex: number;
  onClose: () => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  startIndex,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/20 transition"
        onClick={onClose}
        aria-label="Close Preview"
      >
        <Icons.X className="w-6 h-6" />
      </button>

      {/* Previous Button */}
      {images.length > 1 && (
        <button
          className="absolute left-6 text-white p-2 rounded-full hover:bg-white/20 transition"
          onClick={prev}
          aria-label="Previous Image"
        >
          <Icons.ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {/* Image */}
      <img
        src={images[currentIndex]}
        alt={`Preview ${currentIndex + 1}`}
        className="max-h-[80vh] max-w-[80vw] object-contain rounded-lg shadow-lg"
      />

      {/* Next Button */}
      {images.length > 1 && (
        <button
          className="absolute right-6 text-white p-2 rounded-full hover:bg-white/20 transition"
          onClick={next}
          aria-label="Next Image"
        >
          <Icons.ChevronRight className="w-8 h-8" />
        </button>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-6 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
