import React, { useState } from "react";
import { Icons } from "@components/icons";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  error?: string;
  className?: string;
  infoMessage?: string; 
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  error,
  rows = 4,
  className = "",
  infoMessage, 
  ...rest
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="form-container">
      {/* Label + Info Icon */}
      <div className="flex items-center gap-2">
        <label htmlFor={name} className="form-label flex items-center gap-1">
          {label} {required && <span className="form-required">*</span>}
        </label>

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

      {/* TextArea */}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`form-textarea form-placeholder ${
          error ? "form-border-error" : "form-border-default"
        } form-border-focus ${className}`}
        {...rest}
      />

      {/* Error Message */}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

export default TextArea;
