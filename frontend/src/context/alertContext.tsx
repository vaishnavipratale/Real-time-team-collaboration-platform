import React, { createContext, useContext, useState, ReactNode } from "react";
import { Alert } from "@components/component";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertState {
  message: string;
  type: AlertType;
  visible: boolean;
}

interface AlertContextType {
  showAlert: (type: AlertType, message: string, timeout?: number) => void;
  hideAlert: () => void;
  alert: AlertState;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<AlertState>({
    message: "",
    type: "success",
    visible: false,
  });

  const showAlert = (type: AlertType, message: string, timeout = 8000) => {
    if (type !== "error") {
      return;
    }

    setAlert({ type, message, visible: true });

    if (timeout > 0) {
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, visible: false }));
      }, timeout);
    }
  };

  const hideAlert = () => {
    setAlert((prev) => ({ ...prev, visible: false }));
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert, alert }}>
      <>
        {children}
        <Alert />
      </>
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);

  if (!context) {
    console.warn("⚠️ useAlert called outside of AlertProvider");

    // Trigger native runtime error to expose actual call site in stack trace
    (undefined as unknown as AlertContextType).showAlert(
      "error",
      "AlertProvider is missing"
    );

    // fallback for TS, never reached
    return {} as AlertContextType;
  }

  return context;
};
