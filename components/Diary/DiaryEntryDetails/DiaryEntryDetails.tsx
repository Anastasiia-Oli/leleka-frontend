import React from "react";
import { DiaryEntry } from "@/types/dairy";
import css from "./DiaryEntryDetails.module.css";

interface DiaryEntryDetailsProps {
  entry: DiaryEntry | null;
  onEdit?: () => void;
  onDelete?: () => void;
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

  return (
    <div className={css.diaryContainer}>

      {isDeleting && (
        <div className={css.loadingOverlay}>
          <div className={css.loadingSpinner}>
            <p>Видалення запису...</p>
          </div>
        </div>
      )}

      {onBack && (
        <button
          className={css.backButton}
          onClick={onBack}
          disabled={isDeleting}
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
                >
                  <svg className={css.editIcon} viewBox="0 0 32 32" width="24" height="24">
                    <use href="/leleka-sprite.svg#icon-edit_square" />
                  </svg>
                </button>
              )}
            </div>

            <div className={css.headerInfo}>
              <div className={`${css.date} text-primary`}>{formatDate(entry.date)}</div>
              {onDelete && (
                <button
                  className={css.closeButton}
                  onClick={onDelete}
                  title="Видалити"
                >
                  <svg className={css.deleteIcon} viewBox="0 0 32 32" width="24" height="24">
                    <use href="/leleka-sprite.svg#icon-delete_forever" />
                  </svg>
                </button>
              )}
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