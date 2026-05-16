import React, { useState, useRef, useEffect } from "react";
import { Icons } from "@components/icons";

interface InputWithDropdownProps {
  label: string;
  name: string;
  inputValue: string;
  dropdownValue: string;
  onInputChange: (value: string) => void;
  onDropdownChange: (value: string) => void;
  dropdownOptions: string[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  inputError?: string;
  dropdownError?: string;
  className?: string;
}

const InputWithDropdown: React.FC<InputWithDropdownProps> = ({
  label,
  name,
  inputValue,
  dropdownValue,
  className,
  onInputChange,
  onDropdownChange,
  dropdownOptions,
  placeholder = "",
  required = false,
  disabled = false,
  inputError,
  dropdownError,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`flex flex-col gap-1 w-full ${className || ""}`} ref={ref}>
      <label htmlFor={name} className="form-label flex items-center gap-1">
        {label}
        {required && <span className="form-required">*</span>}
      </label>

      <div className="relative">
        <div
          className={`flex items-center rounded-md border ${
            inputError || dropdownError ? "border-error" : "border-form-border"
          } focus-within:border-form-border-focus`}
        >
          <input
            id={name}
            name={name}
            type="text"
            value={inputValue}
            onChange={(e) => {
              const value = e.target.value;

              const isValid = /^(\d+\.?\d{0,2})?$/.test(value);
              if (isValid || value === "") {
                onInputChange(value);
              }
            }}
            inputMode="decimal"
            pattern="^\d*\.?\d*$"
            placeholder={placeholder}
            className="flex-1 px-3 py-2 text-sm border-none rounded-md focus:outline-none bg-form-bg text-form-text"
            required={required}
            disabled={disabled}
          />

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 px-3 py-2 text-sm text-text-base bg-gray-light border-l border-border-muted  rounded-r-[5px] hover:bg-gray-base focus:outline-none"
            disabled={disabled}
          >
            {dropdownValue || "Select"}
            {isOpen ? (
              <Icons.ChevronUp className="w-4 h-4 ml-1" />
            ) : (
              <Icons.ChevronDown className="w-4 h-4 ml-1" />
            )}
          </button>
        </div>

        {isOpen && (
          <ul
            className="absolute z-10 right-0 mt-1 w-28 bg-bg-surface border border-border-default rounded-md shadow-lg"
            style={{ top: "100%" }}
          >
            {dropdownOptions.map((unit) => (
              <li
                key={unit}
                onClick={() => {
                  onDropdownChange(unit);
                  setIsOpen(false);
                }}
                className="px-3 py-1.5 text-sm text-text-base hover:bg-gray-soft cursor-pointer"
              >
                {unit}
              </li>
            ))}
          </ul>
        )}
      </div>

      {(inputError || dropdownError) && (
        <p className="text-sm text-text-error mt-1">
          {inputError || dropdownError}
        </p>
      )}
    </div>
  );
};

export default InputWithDropdown;
