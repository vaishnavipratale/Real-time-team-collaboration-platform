import React from "react";
 
interface RadioOption {
  label: string;
  value: string;
}
 
interface RadioGroupProps {
  label?: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  direction?: "row" | "column";
}
 
const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  options,
  value,
  onChange,
  error,
  required = false,
  direction = "row",
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="form-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
 
      <div
        className={`flex ${
          direction === "row" ? "flex-row gap-6" : "flex-col gap-3"
        }`}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              id={option.value}
              name={label}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="relative float-left me-2 h-5 w-5 appearance-none rounded-full border border-form-border
                before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-['']
                after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-['']
                checked:border-green-base checked:before:opacity-[0.16]
                checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-green-base checked:after:bg-green-base checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)]
                hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60
                focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s]
                checked:focus:border-green-base checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
            />
            <label
              htmlFor={option.value}
              className="mt-px inline-block hover:cursor-pointer text-sm text-text-base"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
 
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};
 
export default RadioGroup;