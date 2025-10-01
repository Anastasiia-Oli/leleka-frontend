import { useEffect } from "react";

const useCloseModal = (onClose: () => void) => {
  useEffect(() => {
    const handleEscClose = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscClose);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.body.style.overflow = "";
    };
  }, [onClose]);
};

export default useCloseModal;
