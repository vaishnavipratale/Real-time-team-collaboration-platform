"use client";

import React, { useLayoutEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Icons } from "@components/icons";

interface ActionDropdownProps {
  options: {
    label: string;
    action: () => void;
    icon?: React.ReactNode;
    className?: string;
  }[];
  iconType?: "vertical" | "horizontal";
}

interface DropdownPortalProps {
  mounted: boolean;
  open: boolean;
  position: { top: number; left: number };
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  options: ActionDropdownProps["options"];
  setOpen: (open: boolean) => void;
}

const DropdownPortal: React.FC<DropdownPortalProps> = ({
  mounted,
  open,
  position,
  dropdownRef,
  options,
  setOpen,
}) => {
  if (!mounted || !open) return null;

  return createPortal(
    <div
      ref={dropdownRef}
      className="fixed z-[99999] min-w-[11rem] w-max max-w-[calc(100vw-1rem)] border rounded-md shadow-lg transition-all duration-200 ease-in-out"
      style={{
        top: position.top,
        left: position.left,
        backgroundColor: "rgb(var(--surface-elevated))",
        borderColor: "rgb(var(--border-default))",
        opacity: open ? 1 : 0,
        transform: open
          ? "scale(1) translateY(0)"
          : "scale(0.95) translateY(-8px)",
        pointerEvents: open ? "auto" : "none",
      }}
    >
      {options.map((opt, idx) => (
        <div
          key={idx}
          onClick={(e) => {
            e.stopPropagation();
            opt.action();
            setOpen(false);
          }}
          className={`px-4 py-2 text-sm cursor-pointer transition font-base first:rounded-t-md last:rounded-b-md flex items-center gap-2 ${
            opt.className ?? "text-form-text hover:bg-gray-soft"
          }`}
        >
          {opt.icon ? opt.icon : null}
          {opt.label}
        </div>
      ))}
    </div>,
    document.body
  );
};

const ActionDropdown: React.FC<ActionDropdownProps> = ({
  options,
  iconType = "horizontal",
}) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Outside click handler
  const handleClickOutside = (event: MouseEvent) => {
    if (
      buttonRef.current &&
      dropdownRef.current &&
      !buttonRef.current.contains(event.target as Node) &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useLayoutEffect(() => {
    setMounted(true);

    const closeOthers = () => setOpen(false);

    window.addEventListener("closeAllActionDropdowns", closeOthers);
    window.addEventListener("scroll", closeOthers, true);
    window.addEventListener("resize", closeOthers);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("closeAllActionDropdowns", closeOthers);
      window.removeEventListener("scroll", closeOthers, true);
      window.removeEventListener("resize", closeOthers);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Calculate dropdown position
  const calculatePosition = () => {
    if (!buttonRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const dropdownWidth = 176; // min-w-[11rem]
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const gutter = 8;

    // Prefer right-aligned dropdown for action columns near right edge.
    let left = buttonRect.right - dropdownWidth;

    if (left < gutter) left = gutter;
    if (left + dropdownWidth > windowWidth - gutter) {
      left = windowWidth - dropdownWidth - gutter;
    }

    const dropdownHeight = options.length * 40 + 8; // approx
    const spaceBelow = windowHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;

    let top = buttonRect.bottom + 4;
    if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
      top = buttonRect.top - dropdownHeight - 4;
    }

    if (top < gutter) top = gutter;
    if (top + dropdownHeight > windowHeight - gutter) {
      top = Math.max(gutter, windowHeight - dropdownHeight - gutter);
    }

    setPosition({ top, left });
  };

  const toggleDropdown = () => {
    if (open) {
      setOpen(false);
    } else {
      window.dispatchEvent(new Event("closeAllActionDropdowns"));
      calculatePosition();
      setOpen(true);
    }
  };

  return (
    <>
      <div className="relative inline-block text-left">
        <button
          ref={buttonRef}
          className="p-1 rounded-md transition"
          style={{ color: "rgb(var(--zinc-base))" }}
          aria-label="Open actions"
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown();
          }}
        >
          {iconType === "vertical" ? (
            <Icons.MoreVertical className="w-4 h-4 text-form-text" />
          ) : (
            <Icons.MoreHorizontal className="w-4 h-4 text-form-text" />
          )}
        </button>
      </div>
      <DropdownPortal
        mounted={mounted}
        open={open}
        position={position}
        dropdownRef={dropdownRef}
        options={options}
        setOpen={setOpen}
      />
    </>
  );
};

export default ActionDropdown;
