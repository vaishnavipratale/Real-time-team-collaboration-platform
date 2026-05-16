import React from "react";

interface CheckboxProps {
  label: string;
  name: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  error?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  checked,
  onChange,
  disabled = false,
  className = "",
  error,
}) => {
  const id = `checkbox-${name}`;

  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className={`relative flex items-center gap-2 cursor-pointer ${className}`}
      >
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="peer hidden"
        />
        {/* Custom checkbox appearance */}
        <div
          className={`w-4 h-4 flex items-center justify-center border rounded border-form-border bg-white peer-checked:bg-green-dark 
            peer-checked:border-green-dark transition-colors duration-150`}
        >
          {/* Tick icon */}
          {checked && (
            <svg
              className="w-3 h-3 text-white"
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
        <span className="form-label-inline">{label}</span>
      </label>

      {/* Error message */}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

export default Checkbox;
