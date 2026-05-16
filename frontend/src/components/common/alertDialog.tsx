"use client";

import React from "react";
import Button from "./button";
import { CheckCircle, Info, AlertTriangle, XCircle } from "lucide-react";

interface AlertDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  type?: "success" | "error" | "warning" | "info";
  onConfirm: () => void;
  onCancel: () => void;
}

const typeStyles = {
  success: {
    container: "bg-green-100 text-green-900 border-green-200",
    icon: <CheckCircle className="w-6 h-6 text-green-600" />,
    borderTop: "bg-green-500",
    iconBg: "bg-green-100",
  },
  error: {
    container: "bg-red-50 text-red-800 border-red-200",
    icon: <XCircle className="w-6 h-6 text-red-600" />,
    borderTop: "bg-red-500",
    iconBg: "bg-red-100",
  },
  warning: {
    container: "bg-yellow-50 text-yellow-800 border-yellow-200",
    icon: <AlertTriangle className="w-6 h-6 text-yellow-600" />,
    borderTop: "bg-yellow-500",
    iconBg: "bg-yellow-100",
  },
  info: {
    container: "bg-blue-50 text-blue-800 border-blue-200",
    icon: <Info className="w-6 h-6 text-blue-600" />,
    borderTop: "bg-blue-500",
    iconBg: "bg-blue-100",
  },
};

const AlertDialog: React.FC<AlertDialogProps> = ({
  isOpen,
  title,
  description,
  type = "warning",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const { container, icon } = typeStyles[type];

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center bg-opacity-50 modal-overlay">
      <div
        className={`bg-white text-gray-dark rounded-xl shadow-2xl w-[90%] max-w-md px-6 py-5 border animate-fade-in ${container}`}
      >
        {/* Top border
        <div className={`h-1 w-full ${borderTop}`} /> */}

        {/* Icon + Heading */}
        <div className="flex items-start gap-3 mb-4 mt-4">
          <div
            // className={`h-10 w-10 rounded-full  flex items-center justify-center`}
            className="h-10 w-10 rounded-full bg-gray-soft flex items-center justify-center text-red-base"
          >
            {icon}
          </div>
          <div>
            <h2 className="text-lg font-semibold font-[Poppins]">{title}</h2>
            <p className="text-sm text-gray-dark leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="secondary"
            size="sm"
            onClick={onCancel}
            aria-label="Cancel"
          >
            Cancel
          </Button>
          <Button
            variant={
              type === "error" || type === "warning" ? "danger" : "primary"
            }
            size="sm"
            onClick={onConfirm}
            aria-label="Confirm"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
