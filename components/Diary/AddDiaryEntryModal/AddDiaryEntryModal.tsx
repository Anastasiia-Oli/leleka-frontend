"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AddDiaryEntryForm from "../AddDiaryEntryForm/AddDiaryEntryForm";
import css from "./AddDiaryEntryModal.module.css";

interface Props {
  mode: "create" | "edit";
  entryId?: string;
}

export default function AddDiaryEntryModal({ mode, entryId }: Props) {
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

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
        <AddDiaryEntryForm
          mode={mode}
          entryId={entryId}
          onSuccess={closeModal}
        />
      </div>
    </div>
  );
}
