"use client";

import React, { useState, useEffect } from "react";
import { DiaryEntry } from "@/types/dairy";
import css from "./DiaryEntryDetails.module.css";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDiaryEntry } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useTitleDraftStore } from "@/lib/store/titleStore";

interface DiaryEntryDetailsProps {
  entry: DiaryEntry | null;
  onEdit?: (entry: DiaryEntry) => void;
  onBack?: () => void;
}

const DiaryEntryDetails: React.FC<DiaryEntryDetailsProps> = ({
  entry,
  onEdit,
  onBack,
}) => {
  const { setDraft, clearDraft } = useTitleDraftStore();

  useEffect(() => {
    if (entry?.title) {
      setDraft(entry.title);
    } else {
      clearDraft();
    }
  }, [entry, setDraft, clearDraft]);

  const router = useRouter();

  //  ----- deleter
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteDiaryEntry,
    onSuccess: () => {
      toast.success("Note deleted successfully");
      setIsConfirmingDelete(false); // close modal
      queryClient.invalidateQueries({ queryKey: ["diary"] });
      router.push("/diary");
    },
    onError: () => {
      toast.error("Failed to delete note");
    },
  });
  //  ----- deleter end

  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  useEffect(() => {
    if (isConfirmingDelete) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isConfirmingDelete]);

  if (!entry) {
    return (
      <div className={css.diaryContainer}>
        <div className={css.placeholder}>
          <div>
            <h3 className="header-third">Наразі записи у щоденнику відсутні</h3>
            <p className="text-primary" style={{ marginTop: "8px" }}>
              Оберіть запис зі списку, щоб переглянути деталі
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Функція форматування дати
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      return date.toLocaleDateString("uk-UA", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // Функція видалення нотатки
  const handleDeleteEntry = (id: string) => {
    mutate(id);
  };

  // Обробник кліку на кнопку видалення
  const handleDeleteClick = () => {
    setIsConfirmingDelete(true);
  };

  // Скасування видалення
  const handleCancelDelete = () => {
    setIsConfirmingDelete(false);
  };

  return (
    <div className={css.diaryContainer}>
      {/* Overlay для завантаження */}
      {isPending && (
        <div className={css.loadingOverlay}>
          <div className={css.loadingSpinner}>
            <p>Видалення запису...</p>
          </div>
        </div>
      )}

      {/* Модальне вікно підтвердження видалення */}
      {isConfirmingDelete && (
        <div className={css.confirmModal}>
          <div className={css.confirmContent}>
            <h3>Підтвердження видалення</h3>
            <p>
              Ви впевнені, що хочете видалити запис{" "}
              <strong>&quot;{entry.title}&quot;</strong>?
            </p>
            <p className={css.warningText}>Цю дію неможливо скасувати.</p>
            <div className={css.confirmButtons}>
              <button
                className={css.cancelButton}
                onClick={handleCancelDelete}
                disabled={isPending}
              >
                Скасувати
              </button>
              <button
                className={css.confirmDeleteButton}
                onClick={() => handleDeleteEntry(entry._id)}
                disabled={isPending}
              >
                {isPending ? "Видаляю..." : "Видалити"}
              </button>
            </div>
          </div>
        </div>
      )}

      {onBack && (
        <button
          className={css.backButton}
          onClick={onBack}
          disabled={isPending}
        >
          ← Назад до списку
        </button>
      )}

      <div className={css.diaryHeader}>
        <div className={css.headerTop}>
          <div className={css.headerActions}>
            <div className={css.headerRow}>
              <h2 className={`${css.diaryTitle} header-third`}>
                {entry.title}
              </h2>
              {onEdit && (
                <button
                  className={css.actionButton}
                  onClick={() => {
                    onEdit(entry); // передаємо entry в обробник
                  }}
                  title="Редагувати"
                  disabled={isPending}
                >
                  <svg
                    className={css.editIcon}
                    viewBox="0 0 32 32"
                    width="24"
                    height="24"
                  >
                    <use href="/leleka-sprite.svg#icon-edit_square" />
                  </svg>
                </button>
              )}
            </div>

            <div className={css.headerInfo}>
              <div className={`${css.date} text-primary`}>
                {formatDate(entry.date)}
              </div>
              <button
                className={css.closeButton}
                onClick={handleDeleteClick}
                title="Видалити"
                disabled={isPending}
              >
                <svg
                  className={css.deleteIcon}
                  viewBox="0 0 32 32"
                  width="24"
                  height="24"
                >
                  <use href="/leleka-sprite.svg#icon-delete_forever" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={css.diaryContent}>
        <p className="text-primary">{entry.description}</p>
        {entry.emotions && entry.emotions.length > 0 && (
          <div className={css.emotions}>
            {entry.emotions.map((emotion) => (
              <span key={emotion._id} className={css.emotionTag}>
                {emotion.title}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiaryEntryDetails;
