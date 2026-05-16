"use client";

import React from "react";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  error?: string;
}

const PermissionCheckbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  className = "",
  error,
}) => {
  const id = `checkbox-${label}-${Math.random().toString(36).substr(2, 9)}`; // Unique ID for accessibility

  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className={`relative flex items-center gap-2 cursor-pointer ${className}`}
      >
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => {
            console.log(`Checkbox ${label} changed to: ${e.target.checked}`);
            onChange(e.target.checked);
          }}
          disabled={disabled}
          className="peer hidden"
        />
        {/* Custom checkbox appearance */}
        <div
          className={`w-4 h-4 flex items-center justify-center border rounded border-form-border bg-white peer-checked:bg-green-dark peer-checked:border-green-dark transition-colors duration-180 ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {/* Tick icon */}
          {checked && (
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
        <span className="text-sm form-label-inline">{label}</span>
      </label>

      {/* Error message */}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

export default PermissionCheckbox;
