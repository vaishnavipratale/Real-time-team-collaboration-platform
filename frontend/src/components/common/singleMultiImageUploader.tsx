"use client";
import React, { useRef, useState } from "react";
import { Icons } from "@components/icons";
import { Button } from "@components/component";
import { fileToBase64 } from "@utils/fileToBase64";
import ImageCarousel from "./imageCarousel";

interface SingleMultiImageUploaderProps {
  maxImages?: number;
  images: string[];
  onChange: (images: string[]) => void;
  maxFileSizeMB?: number;
  error?: string;
  required?: boolean;
}

const SingleMultiImageUploader: React.FC<SingleMultiImageUploaderProps> = ({
  maxImages = 9,
  images,
  onChange,
  maxFileSizeMB = 1,
  error,
  required = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  /** File Select Handler */
  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;
    setErrorMessage("");

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter((file) => {
      if (file.size > maxFileSizeMB * 1024 * 1024) {
        setErrorMessage(
          `File exceeds ${maxFileSizeMB}MB. Please upload a smaller image.`
        );
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    const newImages = await Promise.all(
      validFiles.map((file) => fileToBase64(file))
    );
    const updatedImages =
      maxImages === 1
        ? [newImages[0]]
        : [...images, ...newImages].slice(0, maxImages);
    onChange(updatedImages);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onChange(updatedImages);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  // Show required error only if required and no images
  const showRequiredError = required && images.length === 0 && !errorMessage && !error;
  const displayError = error || errorMessage || (showRequiredError ? "Primary image is required" : "");

  return (
    <div className="space-y-3">
      {/* Upload Button (Only if maxImages > 1) */}
      {maxImages > 1 && (
        <Button
          variant="add"
          size="sm"
          onClick={triggerFileInput}
          leftIcon={<Icons.Upload className="w-4 h-4" />}
        >
          Upload Images
        </Button>
      )}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        multiple={maxImages > 1}
        className="hidden"
        onChange={(e) => handleFileSelect(e.target.files)}
      />

      {/* Error Message */}
      {displayError && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-md p-2 text-xs">
          <Icons.AlertCircle className="w-4 h-4" />
          {displayError}
        </div>
      )}

      {/* Upload Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {/* Uploaded Images */}
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative border border-gray-300 rounded-lg overflow-hidden bg-gray-50 group w-full h-36 sm:h-40 md:h-44 cursor-pointer"
            onClick={() => setPreviewIndex(idx)}
          >
            <img
              src={img}
              alt={`Uploaded ${idx + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(idx);
              }}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
            >
              <Icons.Trash className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Empty Upload Slot (if space available) */}
        {images.length < maxImages && (
          <div
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-soft/50 w-full h-36 sm:h-40 md:h-44 transition ${
              showRequiredError ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            onClick={triggerFileInput}
          >
            <Icons.ImagePlus className={`w-10 h-10 mb-2 ${
              showRequiredError ? 'text-red-500' : 'text-gray-700'
            }`} />
            <span className={`text-sm font-medium ${
              showRequiredError ? 'text-red-600' : 'text-gray-700'
            }`}>Upload</span>
          </div>
        )}
      </div>

      {/* Image Carousel Preview */}
      {previewIndex !== null && (
        <ImageCarousel
          images={images}
          startIndex={previewIndex}
          onClose={() => setPreviewIndex(null)}
        />
      )}
    </div>
  );
};

export default SingleMultiImageUploader;