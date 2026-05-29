export const handleOutsideClick = (
    modalRef: React.RefObject<HTMLElement>,
    _onClose: () => void
  ): (() => void) => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        modalRef.current &&
        !modalRef.current.contains(target) &&
        !target.closest(".flatpickr-calendar")
      ) {
        // onClose(); // Uncomment this if you want it to close automatically
      }
    };
  
    // Disable background scroll
    document.body.style.overflow = "hidden";
  
    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);
  
    // Cleanup function to remove listener and re-enable scroll
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  };
  
