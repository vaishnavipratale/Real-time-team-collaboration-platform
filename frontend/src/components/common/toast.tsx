import { useRef, useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

type ToastType = "success" | "error";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

export default function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextToastId = useRef(0);

  const addToast = (message: string, type: ToastType = "success") => {
    nextToastId.current += 1;
    const id = nextToastId.current;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const getToastStyles = (type: ToastType) => {
    if (type === "success") {
      return {
        container: "bg-primary/10 text-primary border-primary/20",
        borderTop: "bg-primary",
        icon: <CheckCircle className="w-5 h-5 text-primary" />,
      };
    }
    return {
      container: "bg-red-50 text-red-800 border-red-200",
      borderTop: "bg-red-500",
      icon: <XCircle className="w-5 h-5 text-red-600" />,
    };
  };

  const ToastContainer = () => (
    <div className="fixed top-20 right-6 space-y-3 z-50">
      {toasts.map((toast) => {
        const styles = getToastStyles(toast.type);
        return (
          <div
            key={toast.id}
            className={`w-full max-w-sm shadow-lg rounded-lg border overflow-hidden transition-all duration-300 ${styles.container}`}
          >
            {/* Top border */}
            <div className={`h-1 w-full ${styles.borderTop}`} />

            {/* Toast content */}
            <div className="flex items-center gap-3 px-5 py-4">
              {/* Icon */}
              <div>{styles.icon}</div>

              {/* Message */}
              <div className="flex-1 text-sm font-medium font-[Poppins] leading-relaxed">
                {toast.message}
              </div>

              {/* Close button */}
              <button
                onClick={() => {
                  setToasts((prev) => prev.filter((t) => t.id !== toast.id));
                }}
                className="text-gray-600 hover:text-gray-800 transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );

  return { addToast, ToastContainer };
}
