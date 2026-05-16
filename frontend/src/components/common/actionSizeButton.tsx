import React from "react";
import Button from "./button";

type ActionButtonSize = "sm" | "md" | "lg";

interface ActionSizeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  sizeVariant?: ActionButtonSize;
  label: string;
  leftIcon?: React.ReactNode;
  variant?: "primary" | "add" | "danger" | "warning" | "secondary";
  className?: string;
}

const sizeClassMap: Record<ActionButtonSize, string> = {
  sm: "h-[40px] min-w-[110px] rounded-lg",
  md: "h-[46px] min-w-[140px] rounded-xl",
  lg: "h-[48px] min-w-[160px] rounded-xl",
};

const ActionSizeButton: React.FC<ActionSizeButtonProps> = ({
  sizeVariant = "md",
  label,
  leftIcon,
  variant = "add",
  className = "",
  ...props
}) => {
  return (
    <Button
      variant={variant}
      leftIcon={leftIcon}
      className={`${sizeClassMap[sizeVariant]} ${className}`}
      {...props}
    >
      {label}
    </Button>
  );
};

export default ActionSizeButton;

