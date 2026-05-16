"use client";

import React from "react";
import { Icons } from "@components/icons";

const RoleToggle: React.FC<{
  label: "View" | "Add/Edit" | "Delete";
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ label, checked, onChange }) => {
  const active = checked
    ? "bg-green-50 text-green-500 border-green-300"
    : "bg-white text-zinc-500 border-zinc-300";

  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={() => onChange(!checked)}
      className={`inline-flex items-center gap-2 px-4 py-3 rounded-md border text-sm font-medium transition-colors ${active}`}
    >
      <span
        className={`inline-flex items-center justify-center w-4 h-4 rounded-[4px] border ${
          checked ? "bg-green-500 border-green-500" : "bg-white border-zinc-300"
        }`}
      >
        {checked && <Icons.Check className="w-3 h-3 text-white" />}
      </span>
      {label}
    </button>
  );
};

export default RoleToggle;
