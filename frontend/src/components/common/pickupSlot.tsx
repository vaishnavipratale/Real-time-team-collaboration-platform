// src/components/pickup/PickupWindowPicker.tsx
"use client";

import React from "react";
import { Icons } from "@components/icons";

/** Account-configurable windows */
export type PickupWindow = {
    value: string;   // slot code, e.g. "MID_DAY"
    label: string;   // human label, can contain 24h times like "Mid Day 10:00 – 14:00"
    start: string;   // "HH:mm" -> will be sent as "HH:mm:ss"
    end?: string;    // optional "HH:mm" for nicer AM/PM rendering
};

type Props = {
    label?: string;
    name?: string;
    value: string | undefined;                 // selected slot code
    onChange: (slotCode: string) => void;
    windows?: PickupWindow[];                  // override per-account if needed
    required?: boolean;
    error?: string;
    disabled?: boolean;
    placeholder?: string;
    className?: string;

    /** If provided, windows with start < minStartHHmm will be disabled (use for "today") */
    minStartHHmm?: string | null;
};

/* ---------- Defaults ---------- */
export const DEFAULT_WINDOWS: PickupWindow[] = [
    { value: "MORNING_0930_1230",   label: "Morning 09:30 – 12:30",   start: "09:30", end: "12:30" },
    { value: "AFTERNOON_1315_1630", label: "Afternoon 01:15 – 04:30", start: "13:15", end: "16:30" },
];


/* ---------- Helpers (exported so popup can reuse) ---------- */
export const toHHmmss = (hhmm: string) =>
    hhmm && hhmm.length === 5 ? `${hhmm}:00` : hhmm || "";

/** Return the "HH:mm" start time for a given slot code */
export const getStartFromSlot = (
    slotCode: string | undefined,
    windows: PickupWindow[] = DEFAULT_WINDOWS
): string | undefined => {
    if (!slotCode) return undefined;
    return windows.find(w => w.value === slotCode)?.start;
};

/* ---------- Formatting utilities (AM/PM for display only) ---------- */
const pad2 = (n: number) => String(n).padStart(2, "0");

const parseHHmm = (s?: string) => {
    if (!s) return null;
    const [h, m] = s.split(":").map(Number);
    if (!Number.isFinite(h) || !Number.isFinite(m)) return null;
    return { h24: h, m };
};

const format24to12 = (hhmm?: string) => {
    const p = parseHHmm(hhmm || "");
    if (!p) return "";
    const mer = p.h24 < 12 ? "AM" : "PM";
    let h = p.h24 % 12;
    if (h === 0) h = 12;
    return `${h}:${pad2(p.m)} ${mer}`;
};

const cmpHHmm = (a: string, b: string) => {
    const pa = parseHHmm(a)!; const pb = parseHHmm(b)!;
    const va = pa.h24 * 60 + pa.m; const vb = pb.h24 * 60 + pb.m;
    return va - vb;
};

/* ---------- Component ---------- */
const PickupWindowPicker: React.FC<Props> = ({
                                                 label = "Default Pickup Slot",
                                                 name = "pickup_window",
                                                 value,
                                                 onChange,
                                                 windows = DEFAULT_WINDOWS,
                                                 required,
                                                 error,
                                                 disabled,
                                                 placeholder = "Select a pickup window",
                                                 className,
                                                 minStartHHmm, // when provided, grey-out past windows
                                             }) => {
    const [open, setOpen] = React.useState(false);

    const selected = React.useMemo(
        () => windows.find(w => w.value === value),
        [value, windows]
    );

    // If selected slot became invalid due to minStartHHmm (e.g., time passed), auto-clear
    React.useEffect(() => {
        if (!value || !minStartHHmm) return;
        const selStart = getStartFromSlot(value, windows);
        if (selStart && cmpHHmm(selStart, minStartHHmm) < 0) {
            onChange("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [minStartHHmm]);

    const getPretty = (w: PickupWindow) => {
        const start12 = format24to12(w.start);
        const end12 = w.end ? format24to12(w.end) : "";
        const title = w.label.replace(/\s*\d{1,2}:\d{2}.*$/,"").trim() || "";
        const range = end12 ? `${start12} – ${end12}` : start12;
        return title ? `${title} ${range}` : range;
    };

    const isPastWindow = (w: PickupWindow) =>
        !!minStartHHmm && cmpHHmm(w.start, minStartHHmm) < 0;

    const handleSelect = (slotCode: string, past: boolean) => {
        if (past) return; // ignore clicks on disabled windows
        onChange(slotCode);
        setOpen(false);
    };

    return (
        <div className={`form-container ${className || ""}`}>
            {/* Label (match your existing form styles) */}
            <label htmlFor={name} className="form-label">
                {label} {required && <span className="form-required">*</span>}
            </label>

            {/* Custom select shell — same tokens as your other inputs */}
            <div
                className={`relative w-full h-10 rounded-[10px] bg-white text-sm border ${
                    error ? "border-red-500" : "border-gray-300"
                } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"} 
           focus-within:border-primary`}
            >
                {/* Button face */}
                <button
                    type="button"
                    id={name}
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    disabled={disabled}
                    onClick={() => !disabled && setOpen(o => !o)}
                    className="w-full h-full px-4 flex items-center justify-between"
                >
          <span className={`truncate ${selected ? "text-zinc-base" : "text-gray-400"}`}>
            {selected ? getPretty(selected) : placeholder}
          </span>
                    <Icons.ChevronDown className={`w-4 h-4 ml-2 transition-transform ${open ? "rotate-180" : ""}`} />
                </button>

                {/* Options dropdown */}
                {open && !disabled && (
                    <div
                        role="listbox"
                        tabIndex={-1}
                        className="absolute z-50 mt-1 w-full max-h-56 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg"
                    >
                        {windows.map(w => {
                            const active = w.value === value;
                            const past = isPastWindow(w);
                            return (
                                <div
                                    key={w.value}
                                    role="option"
                                    aria-selected={active}
                                    onClick={() => handleSelect(w.value, past)}
                                    className={`px-4 py-2 text-sm flex items-center justify-between
                    ${past ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-50 cursor-pointer"}
                    ${active ? "bg-gray-100 font-medium" : ""}`}
                                >
                                    <span className="truncate">{getPretty(w)}</span>
                                    {active ? <Icons.Check className="w-4 h-4" /> : null}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Help / error */}
            <div className="mt-1 text-xs text-gray-500">
                Pickup will be attempted during the selected window.
            </div>
            {error && <span className="form-error">{error}</span>}

            {/* Click-away */}
            {open && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpen(false)}
                    aria-hidden
                />
            )}
        </div>
    );
};

export default PickupWindowPicker;
