import React, { useState, useRef, useEffect } from "react";
import { Icons } from "@components/icons";

interface DimensionInputProps {
  length: string;
  width: string;
  height: string;
  unit: string;
  onChange: (field: "length" | "width" | "height", value: string) => void;
  onUnitChange: (unit: string) => void;
  unitOptions?: string[];
  // NEW: error messages
  lengthError?: string;
  widthError?: string;
  heightError?: string;
}

const DimensionInput: React.FC<DimensionInputProps> = ({
  length,
  width,
  height,
  unit,
  onChange,
  onUnitChange,
  unitOptions = ["cm"], // "inch" removed can be add later
  lengthError,
  widthError,
  heightError,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Shared number input validation logic
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    value: string
  ) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      "Home",
      "End",
    ];
    const isDigitOrDot = /^[0-9.]$/.test(e.key);
    const isAllowed = allowedKeys.includes(e.key);

    if (e.key === "." && value.includes(".")) e.preventDefault(); // block multiple dots
    if (!isDigitOrDot && !isAllowed) e.preventDefault(); // block letters and symbols
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("Text");
    if (!/^\d*\.?\d*$/.test(pasted)) e.preventDefault();
  };

  return (
    <div className="flex gap-2 items-start max-w-xl">
      {/* Length */}
      <div className="flex flex-col">
        <label className="form-label">Length</label>
        <input
          type="text"
          value={length}
          onChange={(e) => onChange("length", e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, length)}
          onPaste={handlePaste}
          className={`px-3 py-2 border ${
            lengthError ? "border-error" : "border-form-border"
          } focus:outline-none rounded-md bg-form-bg text-form-text text-sm w-24`}
        />
        {lengthError && <span className="form-error mt-1">{lengthError}</span>}
      </div>

      <span className="h-[40px] flex items-center text-text-base mt-6">
        <Icons.X className="w-4 h-4" />
      </span>

      {/* Width */}
      <div className="flex flex-col">
        <label className="form-label">Width</label>
        <input
          type="text"
          value={width}
          onChange={(e) => onChange("width", e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, width)}
          onPaste={handlePaste}
          className={`px-3 py-2 border ${
            widthError ? "border-error" : "border-form-border"
          } rounded-md bg-form-bg text-form-text focus:outline-none text-sm w-24`}
        />
        {widthError && <span className="form-error mt-1">{widthError}</span>}
      </div>

      <span className="h-[40px] flex items-center text-text-base mt-6">
        <Icons.X className="w-4 h-4" />
      </span>

      {/* Height */}
      <div className="flex flex-col">
        <label className="form-label">Height</label>
        <input
          type="text"
          value={height}
          onChange={(e) => onChange("height", e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, height)}
          onPaste={handlePaste}
          className={`px-3 py-2 border ${
            heightError ? "border-error" : "border-form-border"
          } focus:outline-none rounded-md bg-form-bg text-form-text text-sm w-24`}
        />
        {heightError && <span className="form-error mt-1">{heightError}</span>}
      </div>

      {/* Unit Dropdown */}
      <div className="flex flex-col" ref={dropdownRef}>
        <label className="form-label">Unit</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center justify-between px-3 py-1.5 border border-form-border bg-gray-light text-text-base rounded-md w-24"
          >
            {unit}
            {isOpen ? (
              <Icons.ChevronUp className="w-4 h-4 ml-1 mt-1" />
            ) : (
              <Icons.ChevronDown className="w-4 h-4 ml-1 mt-1" />
            )}
          </button>

          {isOpen && (
            <ul className="absolute z-10 mt-1 w-full bg-bg-surface border border-border-default rounded-md shadow-md">
              {unitOptions.map((option) => (
                <li
                  key={option}
                  onClick={() => {
                    onUnitChange(option);
                    setIsOpen(false);
                  }}
                  className="px-3 py-2 text-sm text-text-base hover:bg-gray-soft cursor-pointer"
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DimensionInput;
