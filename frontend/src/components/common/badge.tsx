import React from "react";
 
type Variant = "primary" | "success" | "warning" | "danger" | "info";
type Size = "sm" | "md" | "lg";
 
interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}
 
const variantClasses: Record<Variant, string> = {
  primary: "bg-green-base text-white border border-green-light",
  success: "bg-green-base text-white",
  warning: "bg-yellow-base text-white border border-yellow-light",
  danger: "bg-red-light text-white",
  info: "bg-blue-light text-white",
};
 
const sizeClasses: Record<Size, string> = {
  sm: "text-xs px-2 py-0.5 rounded-md min-w-[70px] text-center",
  md: "text-sm px-3 py-1 rounded-lg min-w-[90px] text-center",
  lg: "text-base px-4 py-1.5 rounded-lg min-w-[110px] text-center",
};
 
const cn = (...classes: (string | undefined | false | null)[]) =>
  classes.filter(Boolean).join(" ");
 
const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  size = "sm",
  className,
}) => {
  return (
    <span
      className={cn(
        "inline-block font-medium",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
};
 
export default Badge;
 
 