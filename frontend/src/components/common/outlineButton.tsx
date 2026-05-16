"use client";

import React from "react";

type Size = "sm" | "md";
interface OutlineButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size;
  iconLeft?: React.ReactNode;
}

const SIZES: Record<Size, string> = {
  sm: "h-11 px-5 text-md",
  md: "h-12 px-5 text-lg",
};

const OutlineButton: React.FC<OutlineButtonProps> = ({
  children,
  size = "sm",
  className = "",
  iconLeft,
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      {...props}
      className={[
        // outline look (subtle, like screenshot)
        "inline-flex items-center gap-2 rounded-md border border-green-light",
        "border-border-default text-green-dark bg-bg-surface",
        "hover:bg-green-soft active:bg-green-soft",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        SIZES[size],
        className,
      ].join(" ")}
    >
      {iconLeft ? <span aria-hidden>{iconLeft}</span> : null}
      {children}
    </button>
  );
};

export default OutlineButton;
