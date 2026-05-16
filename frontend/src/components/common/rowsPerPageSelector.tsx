import React, { useState, useEffect, useRef } from "react";
import { Icons } from "@components/icons";

interface RowsPerPageSelectorProps {
  value: string;
  options?: string[];
  onSelect?: (value: string) => void;
  isOpen?: boolean;
}

const RowsPerPageSelector: React.FC<RowsPerPageSelectorProps> = ({
  value,
  options = ["10", "20", "30", "50", "100"],
  onSelect,
  isOpen: controlledIsOpen,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isOpen = controlledIsOpen ?? internalOpen;

  const toggleDropdown = () => {
    if (controlledIsOpen === undefined) {
      setInternalOpen((prev) => !prev);
    }
  };

  const handleSelect = (val: string) => {
    onSelect?.(val);
    if (controlledIsOpen === undefined) {
      setInternalOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (controlledIsOpen === undefined) {
          setInternalOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [controlledIsOpen]);

  return (
    <div
      ref={dropdownRef}
      className="relative w-full max-w-[96px] sm:max-w-[96px] h-9"
    >
      <button
        onClick={toggleDropdown}
        className="w-full h-9 bg-white border form-border-default rounded-[8px]  flex items-center justify-between gap-2 px-3 cursor-pointer"
      >
        <span
          className={`text-sm font-normal font-base truncate ${
            value === "10" ? "text-form-text" : "text-form-text"
          }`}
        >
          {value}
        </span>

        {isOpen ? (
          <Icons.ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-form-text" />
        ) : (
          <Icons.ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-form-text" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-[42px] left-0 w-full bg-white border border-border-default rounded-[5px] shadow-md z-20">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              className="w-full px-3 py-[6px] text-sm text-form-text hover:bg-gray-soft text-left font-base flex  transition"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RowsPerPageSelector;
