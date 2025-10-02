"use client";

import { createPortal } from "react-dom";
import css from "./ConfirmationModal.module.css";
import Button from "../ui/Button";
import useCloseModal from "@/hooks/useCloseModal";

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
  useCloseModal(onClose, isOpen);

  if (!isOpen) return null;

  return createPortal(
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
    </div>,
    document.body
  );
};

export default ConfirmationModal;
