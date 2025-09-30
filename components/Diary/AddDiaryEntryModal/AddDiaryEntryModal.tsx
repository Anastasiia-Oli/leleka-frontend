"use client";

import AddDiaryEntryForm from "../AddDiaryEntryForm/AddDiaryEntryForm";
import css from "./AddDiaryEntryModal.module.css";
import { useDiaryModal } from "@/hooks/useDiaryModal";
import { DiaryEntry } from "@/types/diaryModal";

interface AddDiaryEntryModalProps {
  mode: "create" | "edit";
  entry?: DiaryEntry;
}

export default function AddDiaryEntryModal({
  mode,
  entry,
}: AddDiaryEntryModalProps) {
  const { closeModal } = useDiaryModal();

  return (
    <div className={css.backdrop} onClick={closeModal}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={closeModal}>
          <svg viewBox="0 0 32 32" width="24" height="24">
            <use href="/leleka-sprite.svg#icon-close" />
          </svg>
        </button>
        <h2 className={css.title}>
          {mode === "create" ? "Новий запис" : "Редагувати запис"}
        </h2>
        <AddDiaryEntryForm mode={mode} entry={entry} onSuccess={closeModal} />
      </div>
    </div>
  );
}
