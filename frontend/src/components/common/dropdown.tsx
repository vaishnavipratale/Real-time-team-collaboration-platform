import React, { useState, useRef, useEffect } from "react";
import { Icons } from "@components/icons";

interface DropdownProps {
    label?: string;
    name: string;
    options: Array<string | { label: string; value: string }>;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    error?: string;
    infoMessage?: string;
    disabled?: boolean;
    readonly?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
                                               label,
                                               name,
                                               options,
                                               value,
                                               onChange,
                                               required,
                                               error,
                                               infoMessage,
                                               disabled = false,
                                               readonly = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const normalizedOptions = options.map((option) =>
        typeof option === "string" ? { label: option, value: option } : option
    );
    const selectedLabel =
        normalizedOptions.find((option) => option.value === value)?.label ?? value;

    return (
        <div
            className={`form-container ${disabled ? "opacity-60" : ""}`}
            ref={ref}
        >
            {/* Label + Info Icon */}
            {label && (
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
            )}

            {/* Dropdown Trigger */}
            <div className="relative">
                <div
                    role="button"
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-disabled={disabled}
                    className={`form-input flex items-center justify-between ${
                        disabled ? "bg-gray-soft cursor-not-allowed" : "cursor-pointer"
                    } ${error ? "form-border-error" : "form-border-default"} form-border-focus`}
                    onClick={() => {
                        if (!disabled && !readonly) setIsOpen(!isOpen);
                    }}
                >
          <span className="w-full truncate text-form-text">
            {selectedLabel || (label ? `Select ${label}` : "Select")}
          </span>
                    <div className="pointer-events-none ml-2">
                        {isOpen ? (
                            <Icons.ChevronUp className="w-5 h-5 text-form-text" />
                        ) : (
                            <Icons.ChevronDown className="w-5 h-5 text-form-text" />
                        )}
                    </div>
                </div>

                {/* Dropdown Options */}
                {isOpen && !disabled && (
                    <div className="absolute z-10 w-full mt-1 bg-form-bg border border-border-default rounded-[10px] shadow-lg max-h-60 overflow-auto">
                        {normalizedOptions.map((option) => (
                            <div
                                key={option.value}
                                onClick={() => {
                                    if (readonly) return; // block selection
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={`px-4 py-2 text-sm text-zinc-base font-base transition ${
                                    readonly
                                        ? "cursor-default text-form-text" // looks normal, no hover
                                        : "cursor-pointer hover:bg-zinc-soft"
                                }`}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Error Message */}
            {error && <span className="form-error">{error}</span>}
        </div>
    );
};

export default Dropdown;
