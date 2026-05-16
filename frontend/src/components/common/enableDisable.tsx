import React from "react";

interface EnableDisableProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  name: string;
  className?: string;
  disabled?: boolean;
}

const EnableDisable: React.FC<EnableDisableProps> = ({
  checked,
  onChange,
  label = "",
  name,
  className = "",
  disabled = false,
}) => {
  // Define the default className
  const defaultClassName = "flex items-center gap-3 cursor-pointer";

  // Merge default className with provided className
  const combinedClassName = `${defaultClassName} ${className}`.trim();

  const positionClass = "left-1";
  const transformClass = checked
    ? "transform translate-x-full"
    : "";

  return (
    <label
      dir="ltr"
      className={`${combinedClassName} ${disabled ? "cursor-not-allowed opacity-60" : ""}`.trim()}
    >
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          name={name}
          disabled={disabled}
        />
        <div
          className={`block w-10 h-6 rounded-full ${
            checked ? "bg-primary" : "bg-muted"
          }`}
        ></div>
        <div
          className={`absolute ${positionClass} top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${transformClass}`}
        ></div>
      </div>
      {label ? <span className="form-label-inline text-sm">{label}</span> : null}
    </label>
  );
};

export default EnableDisable;
