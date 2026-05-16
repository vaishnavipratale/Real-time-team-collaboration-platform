"use client";

import React from "react";
import { Icons } from "@components/icons";

interface ImagePreviewModalProps {
  isOpen: boolean;
  imageUrl: string;
  altText?: string;
  onClose: () => void;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  isOpen,
  imageUrl,
  altText = "Preview Image",
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
        aria-label="Close"
      >
        <Icons.X size={28} />
      </button>

      {/* Image */}
      <div className="max-w-5xl max-h-[90vh] p-4">
        <img
          src={imageUrl}
          alt={altText}
          className="rounded-lg object-contain max-h-[85vh] mx-auto"
        />
      </div>
    </div>
  );
};

export default ImagePreviewModal;
