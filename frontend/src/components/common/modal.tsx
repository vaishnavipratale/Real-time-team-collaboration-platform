"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { X } from "lucide-react";
import Button from "./button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
  overlayClickClose?: boolean;
  showActionButton?: boolean;
  actionButtonText?: string;
  onActionButtonClick?: () => void;
  actionVariant?: "primary" | "add" | "danger" | "warning" | "secondary";
  hideHeader?: boolean;
  contentClassName?: string;
  panelClassName?: string;
}

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title = "",
  message,
  size = "md",
  showCloseButton = true,
  overlayClickClose = true,
  showActionButton = true,
  actionButtonText = "Close",
  onActionButtonClick,
  actionVariant = "primary",
  hideHeader = false,
  contentClassName,
  panelClassName,
}) => {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (show) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [show, onClose]);

  useLayoutEffect(() => {
    if (isOpen) {
      setShow(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
      const timeout = setTimeout(() => setShow(false), 220);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!show) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (overlayClickClose && e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleActionClick = () => {
    if (onActionButtonClick) {
      onActionButtonClick();
      return;
    }
    onClose();
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0"
      )}
      style={{ backgroundColor: "rgb(var(--overlay-backdrop) / 0.78)" }}
      onClick={handleOverlayClick}
    >
      <div
        className={cn(
          "relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-2xl shadow-xl transition-all duration-300",
          sizeClasses[size],
          panelClassName,
          visible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-4 scale-95 opacity-0"
        )}
        style={{ backgroundColor: "rgb(var(--surface-elevated))" }}
      >
        {!hideHeader && (
          <div
            className="flex items-center justify-between border-b px-5 py-4"
            style={{ borderColor: "rgb(var(--border-default))" }}
          >
            <h2 className="text-base font-semibold text-[rgb(var(--zinc-dark))]">
              {title}
            </h2>
            {showCloseButton ? (
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-1 transition"
                style={{ color: "rgb(var(--zinc-base))" }}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            ) : null}
          </div>
        )}

        {hideHeader && showCloseButton ? (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full p-1 transition text-[rgb(var(--zinc-base))]"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        ) : null}

        <div
          className={cn(
            "flex-1 overflow-y-auto px-5 py-4 text-sm text-zinc-dark",
            contentClassName
          )}
        >
          {message}
        </div>

        {showActionButton ? (
          <div
            className="flex justify-end border-t p-4"
            style={{ borderColor: "rgb(var(--border-default))" }}
          >
            <Button variant={actionVariant} size="sm" onClick={handleActionClick}>
              {actionButtonText}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Modal;

