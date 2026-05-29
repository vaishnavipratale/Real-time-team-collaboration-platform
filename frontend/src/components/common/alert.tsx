import { useAlert } from "@context/alertContext";
import { X, CheckCircle, Info, AlertTriangle, XCircle } from "lucide-react";

const typeStyles = {
  success: {
    container: "bg-green-100 text-green-900 border-green-200",
    icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    borderTop: "bg-green-500",
  },
  error: {
    container: "bg-red-50 text-red-800 border-red-200",
    icon: <XCircle className="w-5 h-5 text-red-600" />,
    borderTop: "bg-red-500",
  },
  warning: {
    container: "bg-yellow-50 text-yellow-800 border-yellow-200",
    icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
    borderTop: "bg-yellow-500",
  },
  info: {
    container: "bg-blue-50 text-blue-800 border-blue-200",
    icon: <Info className="w-5 h-5 text-blue-600" />,
    borderTop: "bg-blue-500",
  },
};

const Alert = () => {
  const { alert, hideAlert } = useAlert();

  if (!alert.visible) return null;

  const { container, icon, borderTop } = typeStyles[alert.type];

  return (
    <div
      style={{ top: "3.8rem", zIndex: 9999 }}
      className={`fixed left-4 right-4 sm:left-auto sm:right-6 z-50 w-auto sm:w-full sm:max-w-sm shadow-lg rounded-lg border overflow-hidden transition-all duration-300 animate-slide-in ${container}`}
    >
      {/* Top border */}
      <div className={`h-1 w-full ${borderTop}`} />

      {/* Alert content */}
      <div className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4">
        {/* Icon */}
        <div className="flex-shrink-0">{icon}</div>

        {/* Message */}
        <div className="flex-1 text-xs sm:text-sm font-medium font-[Poppins] leading-relaxed break-words min-w-0">
          {alert.message}
        </div>

        {/* Close button */}
        <button
          onClick={hideAlert}
          className="text-gray-800 hover:text-zinc-600 transition flex-shrink-0"
          aria-label="Close"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

export default Alert;
