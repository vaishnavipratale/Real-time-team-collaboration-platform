import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export default function Button({ variant = "primary", style, children, ...rest }: ButtonProps) {
  const base: React.CSSProperties = {
    borderRadius: 14,
    padding: "14px 20px",
    fontWeight: 700,
    cursor: "pointer",
    border: "none",
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: "linear-gradient(135deg, rgb(var(--primary-start)), rgb(var(--primary-end)))",
      color: "#fff",
    },
    ghost: {
      background: "transparent",
      color: "rgb(var(--muted-text))",
      border: "1px solid rgba(0,0,0,0.06)",
    },
  };

  return (
    <button style={{ ...base, ...variants[variant], ...style }} {...rest}>
      {children}
    </button>
  );
}
