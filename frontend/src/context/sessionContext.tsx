import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

type SessionContextType = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  triggerSessionExpiry: () => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showModal, setShowModal] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimeoutIfAny = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const triggerSessionExpiry = () => {
    setShowModal(true);
   
  };

  useEffect(() => {
    return clearTimeoutIfAny; // Cleanup on unmount
  }, []);

  return (
    <SessionContext.Provider
      value={{
        showModal,
        setShowModal,
        triggerSessionExpiry,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
