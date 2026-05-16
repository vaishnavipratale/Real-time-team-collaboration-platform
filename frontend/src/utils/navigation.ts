import { useNavigate } from "react-router-dom";
import type { NavigateFunction } from "react-router-dom";


// Store navigate function globally (type-safe)
let navigateFn: NavigateFunction | null = null;

// Hook to set the navigate function inside a component
export const useSetupNavigation = (): void => {
  navigateFn = useNavigate();
};

// Function to navigate outside components (e.g., in services or utils)
export const navigateTo = (path: string): void => {
  if (navigateFn) {
    navigateFn(path);
  } else {
    console.warn(
      "Navigate function not initialized. Ensure useSetupNavigation is called in a component early (e.g., in App.tsx)."
    );
    // Fallback for SSR or unmounted state
    window.location.href = path;
  }
};
