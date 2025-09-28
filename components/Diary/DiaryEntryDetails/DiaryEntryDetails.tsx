import React from "react";
// import { Edit, X } from "lucide-react";
import { DiaryEntry } from "@/types/dairy";
// import { EMOTIONS } from "../../../types/dairy";
import css from "./DiaryEntryDetails.module.css";

interface DiaryEntryDetailsProps {
  entry: DiaryEntry | null;
  onEdit?: () => void;
  onDelete?: () => void;
  onBack?: () => void;
}

const DiaryEntryDetails: React.FC<DiaryEntryDetailsProps> = ({
  entry,
  onEdit,
  onDelete,
  onBack
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

  return (
    <div className={css.diaryContainer}>
      {onBack && (
        <button
          className={css.backButton}
          onClick={onBack}
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
              <div className={`${css.date} text-primary`}>{entry.date}</div>
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
        <p className="text-primary">{entry.content}</p>
        <div className={css.emotions}>
          {entry.emotions.map((emotion, index) => (
            <span key={index} className={css.emotionTag}>
              {emotion}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiaryEntryDetails;