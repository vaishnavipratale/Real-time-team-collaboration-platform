import React from "react";

interface PageWrapperProps {
  title: string;
  children: React.ReactNode;
  headerAction?: React.ReactNode;
  subtitle?: string;
  contentClassName?: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  title,
  children,
  headerAction,
  subtitle,
  contentClassName,
}) => {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between bg-[rgb(var(--white))] px-8 py-4 border-b border-[rgb(var(--border-default))]">
        <div>
          <h2 className="text-2xl font-bold leading-snug text-[rgb(var(--zinc-dark))]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm text-[rgb(var(--zinc-base))]">{subtitle}</p>
          )}
        </div>
        {headerAction && <div className="flex items-center">{headerAction}</div>}
      </div>

      <div className={`px-8 py-8 ${contentClassName ?? ""}`}>
        <div className="mx-auto rounded-md">{children}</div>
      </div>
    </div>
  );
};

export default PageWrapper;

