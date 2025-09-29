// картка щоденика

'use client';

import React from "react";
import { DiaryEntry } from "@/types/dairy";
import css from "./DiaryEntryCard.module.css";

interface DiaryEntryCardProps {
  entry: DiaryEntry;
  onClick?: () => void;
  isSelected?: boolean;
}

const DiaryEntryCard: React.FC<DiaryEntryCardProps> = ({ entry, onClick, isSelected }) => {

  // Показуємо максимум 3 емоції, решту ховаємо під "+N"
  const visibleEmotions = entry.emotions?.slice(0, 3) || [];
  const hiddenEmotionsCount = Math.max((entry.emotions?.length ?? 0) - 3, 0);

  // Функція форматування дати
  const formatDate = (dateString: string) => {
    // Якщо дата вже в правильному форматі, повертаємо її
    if (typeof dateString === 'string' && dateString.includes('липня')) {
      return dateString;
    }

    try {
      // Спробуємо створити дату з рядка
      const date = new Date(dateString);

      // Перевіряємо, чи дата валідна
      if (isNaN(date.getTime())) {
        // Якщо дата невалідна, повертаємо оригінальний рядок
        return dateString;
      }

      // Форматуємо дату в український формат
      return date.toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      // У випадку помилки повертаємо оригінальний рядок
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
        {visibleEmotions.map((emotion) => (
          <span key={emotion._id} className={css.emotionTag}>
            {emotion.title}
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