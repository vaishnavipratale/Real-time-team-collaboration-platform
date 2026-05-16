"use client";

import React from "react";

type CommonStatCardProps = {
  label: string;
  value: number | string;
  Icon?: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  iconBg?: string;
  iconColor?: string;
  className?: string;
  onClick?: () => void;
  footerText?: string;
  footerColor?: string;
  disableHoverShadow?: boolean;
};

const CommonStatCard: React.FC<CommonStatCardProps> = ({
  label,
  value,
  Icon,
  iconBg = "rgb(var(--gray-soft))",
  iconColor = "rgb(var(--zinc-base))",
  className = "",
  onClick,
  footerText,
  footerColor = "rgb(var(--green-base))",
  disableHoverShadow = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border bg-[rgb(var(--white))] px-4 py-4 shadow-sm ${
        onClick
          ? `cursor-pointer transition-all ${
              disableHoverShadow ? "" : "hover:shadow-md"
            }`
          : ""
      } ${className}`}
      style={{
        borderColor: "rgb(var(--border-default))",
      }}
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{
              backgroundColor: iconBg,
            }}
          >
            <Icon
              className="h-[18px] w-[18px]"
              style={{
                color: iconColor,
              }}
            />
          </div>
        )}

        <div className="min-w-0">
          <p className="text-sm font-medium leading-5 text-[rgb(var(--zinc-base))]">
            {label}
          </p>

          <h3 className="mt-1 text-md font-semibold leading-none text-[rgb(var(--black))]">
            {value}
          </h3>

          {footerText && (
            <p
              className="mt-2 text-sm"
              style={{
                color: footerColor,
              }}
            >
              {footerText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommonStatCard;
