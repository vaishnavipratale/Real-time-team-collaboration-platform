// import React, { forwardRef } from "react";
// import DatePickerLib from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { CalendarDays } from "lucide-react";

// interface DatePickerProps {
//   label: string;
//   name: string;
//   value: Date | null;
//   onChange: (date: Date | null) => void;
//   placeholder?: string;
//   required?: boolean;
//   error?: string;
//   minDate?: Date;
//   maxDate?: Date;
// }

// const CustomInput = forwardRef<HTMLButtonElement, any>(
//   ({ value, onClick, placeholder = "Select date", name, error }: any, ref) => {
//     const displayValue =
//       value && value !== "" && !isNaN(new Date(value).getTime())
//         ? new Date(value).toLocaleDateString()
//         : placeholder;

//     return (
//       <button
//         type="button"
//         onClick={onClick}
//         ref={ref}
//         name={name}
//         className={`w-full h-10 px-4 rounded-[10px] bg-white text-sm font-[Poppins] border ${
//           error ? "border-red-500" : "border-gray-300"
//         } focus:border-primary focus:outline-none flex items-center justify-between`}
//       >
//         <span className="truncate flex-1 text-left pl-2">{displayValue}</span>
//         <span className="flex items-center pl-3 ml-3 border-l border-gray-300 text-gray-500 h-full">
//           <CalendarDays className="w-4 h-4" />
//         </span>
//       </button>
//     );
//   }
// );

// CustomInput.displayName = "CustomInput";

// const DatePicker: React.FC<DatePickerProps> = ({
//   label,
//   name,
//   value,
//   onChange,
//   placeholder = "Select date",
//   required,
//   error,
//   minDate,
//   maxDate,
// }) => {
//   return (
//     <div className="form-container">
//       {/* Label */}
//       <label htmlFor={name} className="form-label">
//         {label} {required && <span className="form-required">*</span>}
//       </label>

//       {/* Date Picker */}
//       <DatePickerLib
//         selected={value}
//         onChange={onChange}
//         customInput={
//           <CustomInput name={name} error={error} placeholder={placeholder} />
//         }
//         dateFormat="dd/MM/yyyy"
//         showYearDropdown
//         scrollableYearDropdown
//         yearDropdownItemNumber={100}
//         maxDate={maxDate}
//         minDate={minDate}
//       />

//       {/* Error */}
//       {error && <span className="form-error">{error}</span>}
//     </div>
//   );
// };

// export default DatePicker;

import React, { forwardRef } from "react";
import DatePickerLib from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays } from "lucide-react";

interface DatePickerProps {
  label: string;
  name: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  readOnly?: boolean;
}

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
  name?: string;
  error?: string | boolean;
  disabled?: boolean;
  readOnly?: boolean;
}

const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  ({ value, onClick, placeholder = "Select date", name, error }: CustomInputProps, ref) => {
    const formatLocalYMD = (d: Date) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    };

    const displayValue =
      value && value !== "" && !isNaN(new Date(value).getTime())
        ? formatLocalYMD(new Date(value))
        : placeholder;

    return (
      <button
        type="button"
        onClick={onClick}
        ref={ref}
        name={name}
        className={`w-full h-10 px-4 rounded-[10px] bg-white text-sm font-[Poppins] border ${
          error ? "border-red-500" : "border-gray-300"
        } focus:border-primary focus:outline-none flex items-center justify-between`}
      >
        <span className="truncate text-zinc-base flex-1 text-left ">
          {displayValue}
        </span>
        <span className="flex items-center pl-3 ml-3 border-l border-gray-300 text-gray-500 h-full">
          <CalendarDays className="w-4 h-4" />
        </span>
      </button>
    );
  }
);

CustomInput.displayName = "CustomInput";

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder = "Select date",
  required,
  error,
  minDate,
  maxDate,
  readOnly,
  disabled,
}) => {
  return (
    <div className="form-container">
      {/* Label */}
      <label htmlFor={name} className="form-label">
        {label} {required && <span className="form-required">*</span>}
      </label>

      {/* Date Picker */}
      <DatePickerLib
        selected={value}
        onChange={onChange}
        customInput={
          <CustomInput
            name={name}
            error={error}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
          />
        }
        dateFormat="yyyy-MM-dd"
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100}
        maxDate={maxDate}
        minDate={minDate}
        disabled={disabled}
      />

      {/* Error */}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

export default DatePicker;
