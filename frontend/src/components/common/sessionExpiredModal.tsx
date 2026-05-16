import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SessionExpired } from "@components/images";
import { useSession } from "@context/sessionContext";
import { logout } from "@store/reducers/authSlice";
import { persistor } from "@store/store";
import { triggerLoginModal } from "@utils/loginModal";

const SessionExpiredModal: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showModal, setShowModal } = useSession();

  if (!showModal) return null;

  const handleRedirect = async () => {
    try {
      // Save userLocation before clearing
      const userLocationStr = localStorage.getItem("userLocation");
      
      // Clear all localStorage items
      localStorage.clear();
      
      // Restore userLocation if it existed
      if (userLocationStr) {
        try {
          const userLocation = JSON.parse(userLocationStr);
          // Remove id if present
          if (userLocation.id) {
            delete userLocation.id;
          }
          localStorage.setItem("userLocation", JSON.stringify(userLocation));
        } catch (err) {
          console.error("Failed to restore userLocation:", err);
        }
      }

      // Clear all sessionStorage items
      sessionStorage.clear();

      // Dispatch user logged out event
      window.dispatchEvent(new Event('userLoggedOut'));

      // Reset Redux auth state (in-memory)
      dispatch(logout());

      // Drop persisted auth slice (storage)
      await persistor.purge();

    } finally {
      setShowModal(false);
      navigate("/", { replace: true });
      triggerLoginModal({ reason: "session-expired" });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center px-4">
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] cursor-pointer overflow-hidden"
        onClick={handleRedirect}
      >
        <img
          src={SessionExpired}
          alt="Session Expired"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default SessionExpiredModal;
