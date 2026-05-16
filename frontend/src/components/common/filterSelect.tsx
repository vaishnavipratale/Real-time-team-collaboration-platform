import React from "react";
import Dropdown from "./dropdown";

interface FilterSelectProps {
  name: string;
  value: string;
  options: Array<string | { label: string; value: string }>;
  onChange: (value: string) => void;
  widthClassName?: string;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  name,
  value,
  options,
  onChange,
  widthClassName = "w-full lg:w-[170px]",
}) => {
  return (
    <div className={widthClassName}>
      <Dropdown name={name} value={value} options={options} onChange={onChange} />
    </div>
  );
};

export default FilterSelect;
