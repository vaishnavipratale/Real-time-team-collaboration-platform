import React from "react";

export interface SegmentedTabItem {
  label: string;
  value: string;
}

interface SegmentedTabsProps {
  items: SegmentedTabItem[];
  active: string;
  onChange: (value: string) => void;
  className?: string;
}

const SegmentedTabs: React.FC<SegmentedTabsProps> = ({
  items,
  active,
  onChange,
  className = "",
}) => {
  return (
    <div
      className={`inline-flex items-center gap-1 rounded-xl border bg-white p-1 ${className}`}
      style={{ borderColor: "rgb(var(--border-default))" }}
    >
      {items.map((item) => {
        const isActive = active === item.value;
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium transition ${
              isActive
                ? "bg-[rgb(var(--zinc-light))] text-[rgb(var(--zinc-dark))]"
                : "text-[rgb(var(--zinc-base))] hover:bg-[rgb(var(--zinc-soft))]"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedTabs;
