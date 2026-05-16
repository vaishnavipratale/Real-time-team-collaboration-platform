import React, { useState } from "react";
import { Icons } from "@components/icons";

interface ReloadButtonProps {
  onReload: () => void;
}

const ReloadButton: React.FC<ReloadButtonProps> = ({ onReload }) => {
  const [isRotating, setIsRotating] = useState(false);

  const handleClick = () => {
    setIsRotating(true);
    onReload();

    setTimeout(() => setIsRotating(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center w-9 h-9 border border-form-border rounded-full bg-gray-soft transition-transform duration-300 ${
        isRotating ? "rotate-180" : ""
      }`}
    >
      <Icons.RotateCw className="w-5 h-5 text-text-base" />
    </button>
  );
};

export default ReloadButton;
