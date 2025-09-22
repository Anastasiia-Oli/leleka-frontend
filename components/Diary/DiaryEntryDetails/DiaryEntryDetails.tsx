import React from 'react';
import css from './DiaryEntryDetails.module.css';

interface DiaryEntry {
  id: string;
  title: string;
  date: string;
  emotions: string[];
  content: string;
}

interface DiaryEntryDetailsProps {
  entry: DiaryEntry | null;
  onEdit: (entryId: string) => void;
  onDelete: (entryId: string) => void;
  onBack?: () => void; // Для мобільної версії
}

const DiaryEntryDetails: React.FC<DiaryEntryDetailsProps> = ({ 
  entry, 
  onEdit, 
  onDelete,
  onBack 
}) => {
  if (!entry) {
    return (
      <div className={css.container}>
        <div className={css.placeholder}>
          <p className="text-primary">Наразі записи у щоденнику відсутні</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getEmotionTag = (emotion: string) => {
    return emotion.toLowerCase();
  };

  return (
    <div className={css.container}>
      {/* Back button for mobile */}
      {onBack && (
        <button className={css.backButton} onClick={onBack}>
          ← Назад
        </button>
      )}
      
      <div className={css.header}>
        <div className={css.headerTop}>
          <h2 className={`header-third ${css.title}`}>Перший привіт</h2>
          <div className={css.headerActions}>
            <button 
              className={css.actionButton}
              onClick={() => onEdit(entry.id)}
              aria-label="Редагувати запис"
            >
              <svg width="24" height="24" viewBox="0 0 32 32">
                <use href="/leleka-sprite.svg#icon-edit_square"></use>
              </svg>
            </button>
            <button 
              className={css.actionButton}
              onClick={() => onDelete(entry.id)}
              aria-label="Видалити запис"
            >
              <svg width="24" height="24" viewBox="0 0 32 32">
                <use href="/leleka-sprite.svg#icon-delete_forever"></use>
              </svg>
            </button>
            <button className={css.closeButton} aria-label="Закрити">
              <svg width="24" height="24" viewBox="0 0 32 32">
                <use href="/leleka-sprite.svg#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>
        
        <div className={css.headerInfo}>
          <span className={`text-primary ${css.date}`}>
            {formatDate(entry.date)}
          </span>
        </div>
        
        <div className={css.emotions}>
          {entry.emotions.map((emotion, index) => (
            <span key={index} className={css.emotionTag}>
              {getEmotionTag(emotion)}
            </span>
          ))}
        </div>
      </div>
      
      <div className={css.content}>
        <p className="text-primary">{entry.content}</p>
      </div>
    </div>
  );
};

export default DiaryEntryDetails;