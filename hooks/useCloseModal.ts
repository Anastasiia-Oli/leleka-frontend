import { useEffect } from "react";

const useCloseModal = (onClose: () => void, isOpen: boolean) => {
  useEffect(() => {
    const handleEscClose = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [onClose, isOpen]);
};

export default useCloseModal;
