import React, { type ReactNode } from "react";

interface NonAuthLayoutProps {
  children: ReactNode;
}

const NonAuthLayout: React.FC<NonAuthLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default NonAuthLayout;
