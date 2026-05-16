"use client";

import React from "react";
import { Search } from "lucide-react";

type SearchInputWithPlaceholderProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

export default function SearchInputWithPlaceholder({
  value,
  onChange,
  placeholder,
}: SearchInputWithPlaceholderProps) {
  return (
    <div className="w-full">
      <div className="flex items-center h-[48px] rounded-xl border border-gray-200 bg-white px-4">
        <Search className="w-5 h-5 text-gray-400 mr-3" />
        <input
          type="search"
          name="documents-search"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
        />
      </div>
    </div>
  );
}

