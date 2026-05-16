import React, { useState, useRef } from "react";
import { Icons } from "@components/icons";
import { useAlert } from "@context/alertContext";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void | Promise<any>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  value,
  onChange,
  onSearch,
}) => {
  const [searching, setSearching] = useState(false);
  const { showAlert } = useAlert();

  // cleanup refs for listener/timeout
  const cleanupRef = useRef<null | (() => void)>(null);

  const stopSearching = () => {
    cleanupRef.current?.();
    cleanupRef.current = null;
    setSearching(false);
  };

  const handleSearch = async () => {
    if (searching) return;
    if (value.trim() === "") {
      // showAlert("error", "Please enter search criteria");
      showAlert("info", "Enter a keyword or order detail to search.");
      return;
    }

    setSearching(true);

    // one-shot listener for global event
    const cleanupFns: Array<() => void> = [];
    const lastFetchedHandler = () => stopSearching();
    if (typeof window !== "undefined") {
      const opts: AddEventListenerOptions | boolean = { once: true };
      window.addEventListener(
        "app:last-fetched",
        lastFetchedHandler as EventListener,
        opts
      );
      cleanupFns.push(() =>
        window.removeEventListener(
          "app:last-fetched",
          lastFetchedHandler as EventListener
        )
      );
    }

    // safety timeout so we never get stuck
    const tid = window.setTimeout(() => stopSearching(), 3000);
    cleanupFns.push(() => window.clearTimeout(tid));

    cleanupRef.current = () => {
      cleanupFns.forEach((fn) => {
        try {
          fn();
        } catch {}
      });
    };

    try {
      const maybe = onSearch?.();
      if (maybe && typeof (maybe as any).then === "function") {
        await (maybe as Promise<any>);
        // if no global event, stop now
        stopSearching();
      }
    } catch {
      stopSearching();
    }
  };

  return (
    <div className="flex flex-col items-center w-[250px]">
      <div className="flex items-center h-9 w-full rounded-[8px] border border-form-border bg-white overflow-hidden">
        <div className="ml-2 text-form-text">
          <Icons.Search className="w-4 h-4" />
        </div>

        <input
          type="text"
          placeholder={placeholder || "Search..."}
          value={value}
          onChange={onChange}
          onKeyDown={(e) => e.key === "Enter" && !searching && handleSearch()}
          className="flex-1 min-w-0 bg-transparent outline-none text-sm font-base text-form-text ml-2 placeholder:opacity-0"
        />

        {/* BUTTON: className unchanged */}
        <button
          onClick={handleSearch}
          // disabled={searching}
          // className="h-full px-3 border-l border-form-border bg-gray-soft font-base text-text-base text-xs font-medium flex items-center justify-center min-w-[60px]"

          disabled={searching || value.trim() === ""}
          className={`h-full px-3 border-l border-form-border font-base text-text-base text-xs font-medium flex items-center justify-center min-w-[60px] ${
            searching || value.trim() === ""
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-soft hover:bg-gray-100"
          }`}

        >
          {searching ? "SEARCH" : "SEARCH"}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
