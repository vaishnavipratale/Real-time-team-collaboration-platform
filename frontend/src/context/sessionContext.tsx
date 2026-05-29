import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  type ReactNode,
} from "react";

type SessionContextType = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  triggerSessionExpiry: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  user: {
    first_name?: string;
    last_name?: string;
    email?: string;
    mobile?: string;
    phone?: string;
    role?: string;
  } | null;
  login: (user?: SessionContextType["user"]) => void;
  logout: () => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [user, setUser] = useState<SessionContextType["user"]>(() => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem("sessionUser");
    return raw ? (JSON.parse(raw) as SessionContextType["user"]) : null;
  });
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

  const login = (nextUser?: SessionContextType["user"]) => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    if (nextUser) {
      setUser(nextUser);
      localStorage.setItem("sessionUser", JSON.stringify(nextUser));
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("sessionUser");
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
        isAuthenticated,
        loading,
        user,
        login,
        logout,
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
