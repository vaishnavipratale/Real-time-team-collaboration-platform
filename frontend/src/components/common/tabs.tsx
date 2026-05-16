import React from "react";

export interface Tab {
  label: string;
  value: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (value: string) => void;
  className?: string;
  fitContentWidth?: boolean;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = "",
  fitContentWidth = false,
}) => {
  return (
    <div className={`${className}`}>
      <div className={`${fitContentWidth ? "inline-flex" : "flex"} border-b px-2`}>
        {" "}
      
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={`relative py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === tab.value
                ? "text-green-base"
                : "text-gray-dark hover:text-zinc-dark"
            }`}
          >
            {tab.label}
            {activeTab === tab.value && (
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-green-light"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
