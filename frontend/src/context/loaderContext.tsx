import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import Loader from "@components/common/loader";
 
type LoaderContextType = {
  showLoader: (message?: string) => void;
  hideLoader: () => void;
};
 
const LoaderContext = createContext<LoaderContextType | undefined>(undefined);
 
interface LoaderProviderProps {
  children: ReactNode;
}
 
export const LoaderProvider: React.FC<LoaderProviderProps> = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);
  const [message, setMessage] = useState<string>("Loading...");
  const startTimeRef = useRef<number>(0);
  const minDuration = 0;
 
  const showLoader = useCallback((msg = "Loading...") => {
    setMessage(msg);
    startTimeRef.current = Date.now();
    setLoadingCount((prev) => prev + 1);
  }, []);
 
  const hideLoader = useCallback(() => {
    const elapsed = Date.now() - startTimeRef.current;
    const remaining = minDuration - elapsed;
 
    if (remaining > 0) {
      setTimeout(() => {
        setLoadingCount((prev) => Math.max(prev - 1, 0));
      }, remaining);
    } else {
      setLoadingCount((prev) => Math.max(prev - 1, 0));
    }
  }, []);
 
  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {children}
      {loadingCount > 0 && <Loader message={message} />}
    </LoaderContext.Provider>
  );
};
 
export const useLoader = (): LoaderContextType => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
};
 
 