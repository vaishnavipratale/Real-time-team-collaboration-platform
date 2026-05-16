// components/CollapsibleSection.tsx
"use client";

import React, { useState } from "react";
import { Icons } from "@components/icons";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  showBorder?: boolean;
  icon?: React.ReactNode;
  onToggle?: (isExpanded: boolean) => void;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  defaultExpanded = false,
  className = "",
  headerClassName = "",
  contentClassName = "",
  showBorder = true,
  icon,
  onToggle,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <div
      className={`${
        showBorder ? "border border-border-muted" : ""
      } rounded-lg overflow-hidden ${className}`}
    >
      <button
        type="button"
        onClick={handleToggle}
        className={`w-full flex justify-between items-center p-4 bg-gray-soft/30 hover:bg-gray-soft/50 transition-colors ${headerClassName}`}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <h3 className="text-lg font-semibold text-left">{title}</h3>
        </div>
        <Icons.ChevronDown
          className={`w-5 h-5 transform transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className={`p-1 ${contentClassName}`} aria-hidden={!isExpanded}>
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleSection;
