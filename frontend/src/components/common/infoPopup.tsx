"use client";
import React from "react";
import { Icons } from "@components/icons";
import { Button } from "@components/component";

interface InfoPopupProps {
  title?: string;
  message: string | React.ReactNode;
  onClose: () => void;
}

const InfoPopup: React.FC<InfoPopupProps> = ({
  title = "Notice",
  message,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-5 relative animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <Icons.X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Icons.AlertCircle className="w-5 h-5 text-yellow-500" />
          {title}
        </h2>

        {/* Message */}
        <div className="text-sm text-gray-600">{message}</div>

        {/* Action Button */}
        <div className="mt-5 flex justify-end">
          <Button variant="primary" size="sm" onClick={onClose}>
            OK
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoPopup;
