import React, { useState, useRef, useEffect } from "react";
import { Icons } from "@components/icons";

interface DropdownOption {
  label: string;
  value: string | number;
}

interface DropdownProps {
  label: string;
  name: string;
  options: DropdownOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  required?: boolean;
  error?: string;
}

const OptionDropdown: React.FC<DropdownProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  required,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Find the selected option's label for display
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="form-container" ref={ref}>
      {/* Label */}
      <label htmlFor={name} className="form-label">
        {label} {required && <span className="form-required">*</span>}
      </label>

      {/* Dropdown Trigger */}
      <div className="relative">
        <div
          className={`form-input flex items-center justify-between cursor-pointer ${
            error ? "form-border-error" : "form-border-default"
          } form-border-focus`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`w-full truncate ${
              value ? "text-form-text" : "text-form-text"
            }`}
          >
            {selectedOption ? selectedOption.label : `Select ${label}`}
          </span>
          <div className="pointer-events-none ml-2">
            {isOpen ? (
              <Icons.ChevronUp className="w-5 h-5 text-form-text" />
            ) : (
              <Icons.ChevronDown className="w-5 h-5 text-form-text" />
            )}
          </div>
        </div>

        {/* Dropdown Options */}
        {isOpen && (
          <div
            className="absolute z-10 w-full mt-1 bg-form-bg border border-border-default
  rounded-[10px] shadow-lg max-h-60 overflow-auto"
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="px-4 py-2 text-sm text-zinc-base font-base hover:bg-zinc-soft cursor-pointer transition"
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

export default OptionDropdown;
