"use client";

import AddDiaryEntryForm from "../AddDiaryEntryForm/AddDiaryEntryForm";
import css from "./AddDiaryEntryModal.module.css";
import { DiaryEntry } from "@/types/dairy";

interface AddDiaryEntryModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  entry?: DiaryEntry | null;
  onClose: () => void;
}

export default function AddDiaryEntryModal({
  isOpen,
  mode,
  entry,
  onClose,
}: AddDiaryEntryModalProps) {
  if (!isOpen) return null;

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose}>
          <svg viewBox="0 0 32 32" width="24" height="24">
            <use href="/leleka-sprite.svg#icon-close" />
          </svg>
        </button>
        <h2 className={css.title}>
          {mode === "create" ? "Новий запис" : "Редагувати запис"}
        </h2>
        <AddDiaryEntryForm
          mode={mode}
          entry={entry || undefined}
          onSuccess={onClose}
        />
      </div>
    </div>
  );
}
