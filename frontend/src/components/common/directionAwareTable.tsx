import React from "react";

interface DirectionAwareTableProps {
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  style?: React.CSSProperties;
}

const cn = (...classes: Array<string | undefined | false | null>) =>
  classes.filter(Boolean).join(" ");

const DirectionAwareTable: React.FC<DirectionAwareTableProps> = ({
  children,
  className,
  wrapperClassName,
  style,
}) => (
  <div className={cn("direction-aware-scroll overflow-x-auto", wrapperClassName)}>
    <table
      className={cn("direction-aware-table w-full text-sm", className)}
      style={style}
    >
      {children}
    </table>
  </div>
);

export default DirectionAwareTable;
