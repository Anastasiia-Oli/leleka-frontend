import React from 'react';
import css from './DiaryList.module.css';
import DiaryEntryCard from '../DiaryEntryCard/DiaryEntryCard';

interface DiaryEntry {
  id: string;
  title: string;
  date: string;
  emotions: string[];
  content: string;
}

interface DiaryListProps {
  entries: DiaryEntry[];
  onAddEntry: () => void;
  onSelectEntry: (entryId: string) => void;
}

const DiaryList: React.FC<DiaryListProps> = ({ 
  entries, 
  onAddEntry, 
  onSelectEntry 
}) => {
  return (
    <div className={css.container}>
      <div className={css.header}>
        <h2 className={`header-third ${css.title}`}>Ваші записи</h2>
        <div className={css.addButton} onClick={onAddEntry}>
          <span className={css.addText}>Новий запис</span>
          <div className={css.addIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#FFCBD3"/>
              <path d="M12 8v8M8 12h8" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div className={css.entriesList}>
        {entries.length > 0 ? (
          entries.map((entry) => (
            <DiaryEntryCard
              key={entry.id}
              entry={entry}
              onClick={() => onSelectEntry(entry.id)}
            />
          ))
        ) : (
          <div className={css.placeholder}>
            <p className="text-primary">Наразі записи у щоденнику відсутні</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiaryList;