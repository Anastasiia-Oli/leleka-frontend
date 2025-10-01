"use client";

import { useEffect } from "react";
import css from "./ConfirmationModal.module.css";
import Button from "../ui/Button";

interface ConfirmationModalProps {
  title: string;
  onConfirm: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const ConfirmationModal = ({
  title,
  onConfirm,
  onClose,
  isOpen,
}: ConfirmationModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className={css.modalBackdrop} onClick={onClose}>
        <div className={css.modalWindow} onClick={(e) => e.stopPropagation()}>
          <h2 className={css.modalTitle}>{title}</h2>
          <div className={css.modalActions}>
            <div onClick={onClose}>
              <Button label={"Ні"} style="primary" />
            </div>
            <div onClick={onConfirm}>
              <Button label={"Так"} style="secondary" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
