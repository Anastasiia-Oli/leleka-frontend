// components/Diary/DiaryEntryCard/DiaryEntryCard.tsx
import React from "react";
import { LegacyDiaryEntry } from "../Diary.types";
import { EMOTIONS } from "../Diary.constants";
import css from "./DiaryEntryCard.module.css";

interface DiaryEntryCardProps {
  entry: LegacyDiaryEntry;
  onClick?: () => void;
  isSelected?: boolean;
}

const DiaryEntryCard: React.FC<DiaryEntryCardProps> = ({ entry, onClick, isSelected }) => {
  const getEmotionStyle = (emotionName: string) => {
    const emotion = EMOTIONS.find(e => e.name === emotionName);
    return emotion ? { bgColor: emotion.bgColor, textColor: emotion.textColor } : 
           { bgColor: "var(--gray-lightest)", textColor: "var(--gray-dark)" };
  };

  // Показуємо максимум 3 емоції, решту ховаємо під "+N"
  const visibleEmotions = entry.emotions.slice(0, 3);
  const hiddenEmotionsCount = entry.emotions.length - 3;

  // Форматуємо дату для відображення
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
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
    <div
      onClick={onClick}
      className={`${css.card} ${isSelected ? css.selected : ''}`}
    >
      <div className={css.cardHeader}>
        <h3 className={`${css.cardTitle} header-fourth`}>{entry.title}</h3>
        <span className={`${css.cardDate} text-primary`}>
          {formatDate(entry.date)}
        </span>
      </div>
      
      <div className={css.emotions}>
        {visibleEmotions.map((emotion, index) => (
          <span key={index} className={css.emotionTag}>
            {emotion}
          </span>
        ))}
        {hiddenEmotionsCount > 0 && (
          <span className={css.moreEmotions}>
            +{hiddenEmotionsCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default DiaryEntryCard;