import React from "react";
import { Icons } from "@components/icons";

interface RoundButtonProps {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const RoundButton: React.FC<RoundButtonProps> = ({
  onClick,
  title,
  children,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`flex items-center justify-center w-8 h-8 rounded-full border border-gray-light bg-white text-gray-dark hover:bg-gray-100 hover:scale-110 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

export default RoundButton;