import React, { createContext, useContext } from "react";
 
type LogErrorParams = {
  title: string;
  description: string;
  action: string;
  payload?: Record<string, any>;
  stack_trace?: string;
  severity?: string;
  model?: string;
  retry_count?: number;
};
 
interface ErrorLoggerContextProps {
  logError: (error: LogErrorParams, contextInfo?: string) => void;
}
 
const ErrorLoggerContext = createContext<ErrorLoggerContextProps | null>(null);
 
export const ErrorLoggerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const logError = (
    error: LogErrorParams,
    contextInfo?: string
  ) => {
    console.log("📦 [CTX] logError called from:", contextInfo || "unknown");
    const enrichedTitle = contextInfo
      ? `${contextInfo}: ${error.title}`
      : error.title;
 
    console.log("Error logged:", enrichedTitle, error);
  };
 
  return (
    <ErrorLoggerContext.Provider value={{ logError }}>
      {children}
    </ErrorLoggerContext.Provider>
  );
};
 
export const useErrorLogger = (): ErrorLoggerContextProps => {
  const context = useContext(ErrorLoggerContext);
  if (!context) {
    throw new Error("useErrorLogger must be used within an ErrorLoggerProvider");
  }
  return context;
};
 
 