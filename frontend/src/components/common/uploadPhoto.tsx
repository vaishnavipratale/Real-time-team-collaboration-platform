import React, { useRef, useState } from "react";

interface UploadPhotoProps {
  onImageSelect: (file: File) => void;
  previewUrl?: string;
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({
  onImageSelect,
  previewUrl,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(
    previewUrl || null
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLocalPreview(URL.createObjectURL(file));
      onImageSelect(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-32 h-32 rounded-[16px] overflow-hidden bg-gray-100 border border-zinc-300 flex items-center justify-center">
        {localPreview ? (
          <img
            src={localPreview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <svg
            className="w-12 h-12 text-zinc-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        )}
      </div>

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="text-green-600 text-sm font-[Poppins] hover:underline"
      >
        Upload Photo
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadPhoto;
