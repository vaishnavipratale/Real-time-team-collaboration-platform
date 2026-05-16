"use client";
import React, { useRef, useState } from "react";
import { Icons } from "@components/icons";
import { Button } from "@components/component";
import { fileToBase64 } from "@utils/fileToBase64";
import ImageCarousel from "./imageCarousel"; //  Importing the new ImageCarousel component

interface ImageUploadGridProps {
  label?: string;
  maxImages?: number;
  images: string[];
  onChange: (images: string[]) => void;
  infoText?: string;
  maxFileSizeMB?: number;
  error?: string;
}

const ImageUploadGrid: React.FC<ImageUploadGridProps> = ({
  label = "Product Images",
  maxImages = 9,
  images,
  onChange,
  infoText = "You can rearrange images by dragging them.",
  maxFileSizeMB = 1,
  error,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  //  Preview Carousel State
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  /** File Select Handler */
  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;
    setErrorMessage("");

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter((file) => {
      if (file.size > maxFileSizeMB * 1024 * 1024) {
        setErrorMessage(
          `Some files exceed the ${maxFileSizeMB}MB limit. Please upload smaller images.`
        );
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    const newImages = await Promise.all(
      validFiles.map((file) => fileToBase64(file))
    );
    const updatedImages = [...images, ...newImages].slice(0, maxImages);
    onChange(updatedImages);
  };

  const handleRemove = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onChange(updatedImages);
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  /** Drag Events */
  const handleDragStart = (index: number) => setDraggedIndex(index);
  const handleDragOverImage = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    const updatedImages = [...images];
    const draggedImage = updatedImages[draggedIndex];
    updatedImages.splice(draggedIndex, 1);
    updatedImages.splice(index, 0, draggedImage);
    setDraggedIndex(index);
    onChange(updatedImages);
  };

  const handleDropUpload = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <label className="block text-lg font-medium text-gray-800">
            {label}
          </label>
          <p className="text-sm text-gray-500 mb-5">
            Uploaded: {images.length} of {maxImages}. {infoText} (Max size:{" "}
            {maxFileSizeMB}MB)
          </p>
        </div>
        <Button
          variant="add"
          size="sm"
          onClick={triggerFileInput}
          leftIcon={<Icons.Upload className="w-4 h-4" />}
        >
          Upload Multiple Images
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
        />
      </div>

      {/* Error Message */}
      {/* Error Message */}
      {(errorMessage || error) && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-md p-2 text-xs">
          <Icons.AlertCircle className="w-4 h-4" />
          {errorMessage || error}
        </div>
      )}

      {/* Upload Grid */}
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 rounded-lg ${
          isDragging ? "border-2 border-blue-500 bg-blue-50" : ""
        }`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropUpload}
      >
        {/* Uploaded Images */}
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative border border-gray-300 rounded-lg overflow-hidden bg-gray-50 group w-full h-36 sm:h-40 md:h-44 cursor-pointer"
            draggable
            onClick={() => setPreviewIndex(idx)}
            onDragStart={() => handleDragStart(idx)}
            onDragOver={(e) => handleDragOverImage(e, idx)}
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
            {idx === 0 && (
              <span className="absolute bottom-2 left-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded">
                Primary
              </span>
            )}
          </div>
        ))}

        {/* Upload Slots */}
        {Array.from({ length: maxImages - images.length }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-soft/50 w-full h-36 sm:h-40 md:h-44 transition"
            onClick={triggerFileInput}
          >
            <Icons.ImagePlus className="w-10 h-10 text-gray-700 mb-2" />
            <span className="text-sm text-gray-700 font-medium">Upload</span>
          </div>
        ))}
      </div>

      {/*  Image Carousel */}
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

export default ImageUploadGrid;
