"use client";
 
import React, { useEffect, useRef, useState } from "react";
 
let activePopupId: string | null = null;
 
interface StackablePopupProps {
  id: string;
  trigger?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  variant?: "dropdown" | "modal";
  overlayClassName?: string;
}
 
const StackablePopup: React.FC<StackablePopupProps> = ({
  id,
  trigger,
  children,
  className = "",
  isOpen,
  onOpenChange,
  variant = "dropdown",
  overlayClassName = "",
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const isControlled = typeof isOpen === "boolean";
  const popupIsOpen = isControlled ? isOpen : internalIsOpen;

  const setPopupOpen = (nextIsOpen: boolean) => {
    if (!isControlled) {
      setInternalIsOpen(nextIsOpen);
    }
    onOpenChange?.(nextIsOpen);
  };
 
  // Handle open/close logic
  const togglePopup = () => {
    if (popupIsOpen && activePopupId === id) {
      activePopupId = null;
      setPopupOpen(false);
    } else {
      activePopupId = id;
      setPopupOpen(true);
    }
  };
 
  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        if (activePopupId === id) {
          activePopupId = null;
          setPopupOpen(false);
        }
      }
    };
 
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [id, popupIsOpen]);
 
  // Close if another popup opens
  useEffect(() => {
    if (popupIsOpen && activePopupId !== null && activePopupId !== id) {
      setPopupOpen(false);
    }
  }, [popupIsOpen, id]);

  useEffect(() => {
    if (popupIsOpen) {
      activePopupId = id;
      return;
    }

    if (activePopupId === id) {
      activePopupId = null;
    }
  }, [id, popupIsOpen]);

  if (variant === "modal") {
    if (!popupIsOpen) {
      return trigger ? (
        <div onClick={togglePopup} className="cursor-pointer">
          {trigger}
        </div>
      ) : null;
    }

    return (
      <>
        {trigger ? (
          <div onClick={togglePopup} className="cursor-pointer">
            {trigger}
          </div>
        ) : null}
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center ${overlayClassName}`}
        >
          <div ref={popupRef} className={className}>
            {children}
          </div>
        </div>
      </>
    );
  }
 
  return (
<div className="relative inline-block" ref={popupRef}>
      {/* Trigger */}
{trigger && <div onClick={togglePopup} className="cursor-pointer">
        {trigger}
</div>}
 
      {/* Popup Content */}
      {popupIsOpen && (
<div
          className={`absolute z-50 mt-2 bg-white border rounded-xl shadow-lg ${className}`}
>
          {children}
</div>
      )}
</div>
  );
};
 
export default StackablePopup;
