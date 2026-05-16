import { useEffect, useRef } from "react";
import { useAlert } from "@context/alertContext";

const useQueryErrorAlert = (isError: boolean, message: string) => {
  const { showAlert } = useAlert();
  const errorShownRef = useRef(false);

  useEffect(() => {
    if (isError && !errorShownRef.current) {
      showAlert("error", message);
      errorShownRef.current = true;
    }
    if (!isError) {
      errorShownRef.current = false; // Reset after success
    }
  }, [isError, message, showAlert]);
};

export default useQueryErrorAlert;
