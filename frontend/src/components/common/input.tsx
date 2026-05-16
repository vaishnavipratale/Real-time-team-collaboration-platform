import React, { useState } from "react";
import { Icons } from "@components/icons";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name?: string;
  error?: string;
  infoMessage?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  error,
  infoMessage,
  ...rest
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="form-container">
      {/* Label + Info Icon */}
      <div className="flex items-center gap-2">
        {label && (
          <label htmlFor={name} className="form-label flex items-center gap-1">
            {label} {required && <span className="form-required">*</span>}
          </label>
        )}

        {/* Info Icon + Tooltip */}
        {infoMessage && (
          <div
            className="relative flex items-center"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <Icons.Info className="form-tooltip-icon" />

            {showTooltip && <div className="form-tooltip">{infoMessage}</div>}
          </div>
        )}
      </div>

      {/* Input Field */}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`form-input form-placeholder ${
          error ? "form-border-error" : "form-border-default"
        } form-border-focus`}
        {...rest}
      />

      {/* Error Message */}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

export default Input;
