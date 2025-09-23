import React from "react";
import { Edit, X } from "lucide-react";
import { DiaryEntry } from "../Diary.types";
import { EMOTIONS } from "../Diary.constants";
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
  const getEmotionStyle = (emotionName: string) => {
    const emotion = EMOTIONS.find(e => e.name === emotionName);
    return emotion ? { bgColor: emotion.bgColor, textColor: emotion.textColor } : 
           { bgColor: "var(--gray-lightest)", textColor: "var(--gray-dark)" };
  };

  if (!entry) {
    return (
      <div className={css.container}>
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
    <div className={css.container}>
      {onBack && (
        <button 
          className={css.backButton}
          onClick={onBack}
        >
          ← Назад
        </button>
      )}
      
      <div className={css.header}>
        <div className={css.headerTop}>
          <h2 className={`${css.title} header-third`}>{entry.title}</h2>
          <div className={css.headerActions}>
            {onEdit && (
              <button 
                className={css.actionButton}
                onClick={onEdit}
                title="Редагувати"
              >
                <Edit />
              </button>
            )}
            {onDelete && (
              <button 
                className={css.closeButton}
                onClick={onDelete}
                title="Видалити"
              >
                <X />
              </button>
            )}
          </div>
        </div>
        
        <div className={css.headerInfo}>
          <div className={`${css.date} text-primary`}>{entry.date}</div>
          
          <div className={css.emotions}>
            {entry.emotions.map((emotion, index) => (
              <span key={index} className={css.emotionTag}>
                {emotion}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={css.content}>
        <p className="text-primary">{entry.content}</p>
      </div>
    </div>
  );
};

export default DiaryEntryDetails;