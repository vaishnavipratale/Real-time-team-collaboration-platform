import React from "react";

interface ToggleProps {
  label?: string;
  leftLabel: string;
  rightLabel: string;
  value: string;
  onChange: (value: string) => void;
}

const Toggle: React.FC<ToggleProps> = ({
  label = "Status",
  leftLabel,
  rightLabel,
  value,
  onChange,
}) => {
  const isLeftActive = value === leftLabel;
  const isRightActive = value === rightLabel;

  return (
    <div className="flex flex-col gap-2 w-fit">
      {/* Label */}
      <div className="text-form-label text-sm font-medium font-base leading-normal tracking-tight">
        {label}
      </div>

      {/* Toggle Group */}
      <div className="flex w-fit overflow-hidden rounded-[10px]">
        {/* Left Option */}
        <button
          type="button"
          onClick={() => onChange(leftLabel)}
          className={`w-28 h-10 transition-all duration-200 text-base font-medium tracking-tight cursor-pointer font-base
            ${
              isLeftActive
                ? "bg-success text-white border border-success"
                : "bg-white text-zinc-base border border-border-default"
            } rounded-l-[10px]`}
        >
          {leftLabel}
        </button>

        {/* Right Option */}
        <button
          type="button"
          onClick={() => onChange(rightLabel)}
          className={`w-28 h-10 transition-all duration-200 text-base font-medium tracking-tight cursor-pointer font-base
            ${
              isRightActive
                ? "bg-danger text-white border border-danger"
                : "bg-white text-zinc-base border border-border-default"
            } rounded-r-[10px] -ml-px`}
        >
          {rightLabel}
        </button>
      </div>
    </div>
  );
};

export default Toggle;
