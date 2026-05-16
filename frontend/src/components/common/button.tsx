// "use client";

// import React from "react";
// import { Icons } from "@components/icons";

// type Variant = "primary" | "add" | "danger" | "warning" | "secondary";
// type Size = "sm" | "md" | "lg";

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: Variant;
//   size?: Size;
//   isLoading?: boolean;
//   leftIcon?: React.ReactNode;
//   rightIcon?: React.ReactNode;
// }

// const variantClasses: Record<Variant, string> = {
//   primary:
//     "bg-green-base text-white hover:bg-green-dark border border-green-base",

//   add: "bg-teal-600 text-white hover:bg-teal-700 border border-teal-600",

//   danger: "bg-red-base text-white hover:bg-red-light",

//   warning: "bg-yellow-light text-white hover:bg-yellow-dark",

//   secondary: "bg-white text-slate-700 border border-gray-200 hover:bg-gray-50",
// };

// const sizeClasses: Record<Size, string> = {
//   sm: "text-sm px-3 py-2",
//   md: "text-sm px-4 py-2.5",
//   lg: "text-base px-5 py-3",
// };

// const cn = (...classes: (string | undefined | false | null)[]) =>
//   classes.filter(Boolean).join(" ");

// const Button: React.FC<ButtonProps> = ({
//   children,
//   variant = "primary",
//   size = "md",
//   isLoading = false,
//   leftIcon,
//   rightIcon,
//   disabled,
//   className,
//   ...props
// }) => {
//   const isDisabled = disabled || isLoading;

//   return (
//     <button
//       disabled={isDisabled}
//       className={cn(
//         "inline-flex items-center justify-center gap-2 rounded-xl transition shadow-sm focus:outline-none",
//         variantClasses[variant],
//         sizeClasses[size],
//         isDisabled && "opacity-50 cursor-not-allowed",
//         className
//       )}
//       {...props}
//     >
//       {isLoading ? (
//         <Icons.Loader className="w-4 h-4 animate-spin" />
//       ) : (
//         <>
//           {leftIcon && <span>{leftIcon}</span>}
//           {children && <span>{children}</span>}
//           {rightIcon && <span>{rightIcon}</span>}
//         </>
//       )}
//     </button>
//   );
// };

// export default Button;
"use client";

import React from "react";
import { Icons } from "@components/icons";

type Variant = "primary" | "add" | "danger" | "warning" | "secondary";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground font-semibold hover:bg-primary/90 border border-primary transition-colors",
  add: "bg-teal-600 text-white hover:bg-teal-700 border border-teal-600",
  danger:
    "bg-destructive text-destructive-foreground font-semibold hover:bg-destructive/90 transition-colors",
  warning:
    "bg-warning text-warning-foreground font-semibold hover:bg-warning/90 transition-colors",
  secondary:
    "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80 font-base font-medium transition-colors",
};


const sizeClasses: Record<Size, string> = {
  sm: "text-sm px-3 py-2",
  md: "text-sm px-4 py-2.5",
  lg: "text-base px-5 py-3",
};

const cn = (...classes: (string | undefined | false | null)[]) =>
  classes.filter(Boolean).join(" ");

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  className,
  ...props
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      disabled={isDisabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl transition shadow-sm focus:outline-none",
        variantClasses[variant],
        sizeClasses[size],
        isDisabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Icons.Loader className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {leftIcon && <span>{leftIcon}</span>}
          {children && <span>{children}</span>}
          {rightIcon && <span>{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
