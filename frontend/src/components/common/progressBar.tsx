import React from "react";

interface ProgressBarProps {
  value: number; // percentage (0-100)
  color?: string; // optional Tailwind color class
  height?: string; // optional height (e.g., "h-2")
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color,
  height = "h-2",
}) => {
  // Dynamic color logic (default if no color provided)
  const barColor =
    color ||
    (value >= 75
      ? "bg-green-base"
      : value >= 50
      ? "bg-yellow-base"
      : "bg-red-base");

  return (
    <div
      className={`relative w-full bg-gray-soft rounded-full overflow-hidden ${height}`}
    >
      <div
        className={`absolute top-0 left-0 h-full rounded-full ${barColor}`}
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
