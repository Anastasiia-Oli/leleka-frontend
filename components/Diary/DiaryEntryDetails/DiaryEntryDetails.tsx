import React, { useState } from "react";
import { DiaryEntry } from "@/types/dairy";
import css from "./DiaryEntryDetails.module.css";
import { toast } from "react-hot-toast";

interface DiaryEntryDetailsProps {
  entry: DiaryEntry | null;
  onEdit?: () => void;
  onDelete?: (entryId: string) => void; // Змінили тип для передачі ID
  onBack?: () => void;
  isDeleting?: boolean;
}

const DiaryEntryDetails: React.FC<DiaryEntryDetailsProps> = ({
  entry,
  onEdit,
  onDelete,
  onBack,
  isDeleting = false
}) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isDeletingEntry, setIsDeletingEntry] = useState(false);

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
      return date.toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  // Функція видалення нотатки
  const handleDeleteEntry = async () => {
    if (!entry?._id) {
      toast.error("Помилка: ID запису не знайдено");
      return;
    }

    setIsDeletingEntry(true);

    try {
      const response = await fetch(`/api/diaries/${entry._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Помилка видалення запису');
      }

      toast.success("Запис успішно видалено");

      // Викликаємо callback для оновлення списку на батьківському компоненті
      if (onDelete) {
        onDelete(entry._id);
      }

      // Закриваємо модальне вікно підтвердження
      setIsConfirmingDelete(false);

    } catch (error) {
      console.error("Error deleting diary entry:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Не вдалося видалити запис"
      );
    } finally {
      setIsDeletingEntry(false);
    }
  };

  // Обробник кліку на кнопку видалення
  const handleDeleteClick = () => {
    setIsConfirmingDelete(true);
  };

  // Скасування видалення
  const handleCancelDelete = () => {
    setIsConfirmingDelete(false);
  };

  const isProcessing = isDeleting || isDeletingEntry;

  return (
    <div className={css.diaryContainer}>
      {/* Overlay для завантаження */}
      {isProcessing && (
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
            <p>Ви впевнені, що хочете видалити запис?</p>
            <p className={css.warningText}>Цю дію неможливо скасувати.</p>
            <div className={css.confirmButtons}>
              <button
                className={css.cancelButton}
                onClick={handleCancelDelete}
                disabled={isDeletingEntry}
              >
                Скасувати
              </button>
              <button
                className={css.confirmDeleteButton}
                onClick={handleDeleteEntry}
                disabled={isDeletingEntry}
              >
                {isDeletingEntry ? "Видаляю..." : "Видалити"}
              </button>
            </div>
          </div>
        </div>
      )}

      {onBack && (
        <button
          className={css.backButton}
          onClick={onBack}
          disabled={isProcessing}
        >
          ← Назад до списку
        </button>
      )}

      <div className={css.diaryHeader}>
        <div className={css.headerTop}>
          <div className={css.headerActions}>
            <div className={css.headerRow}>
              <h2 className={`${css.diaryTitle} header-third`}>{entry.title}</h2>
              {onEdit && (
                <button
                  className={css.actionButton}
                  onClick={onEdit}
                  title="Редагувати"
                  disabled={isProcessing}
                >
                  <svg className={css.editIcon} viewBox="0 0 32 32" width="24" height="24">
                    <use href="/leleka-sprite.svg#icon-edit_square" />
                  </svg>
                </button>
              )}
            </div>

            <div className={css.headerInfo}>
              <div className={`${css.date} text-primary`}>{formatDate(entry.date)}</div>
              <button
                className={css.closeButton}
                onClick={handleDeleteClick}
                title="Видалити"
                disabled={isProcessing}
              >
                <svg className={css.deleteIcon} viewBox="0 0 32 32" width="24" height="24">
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