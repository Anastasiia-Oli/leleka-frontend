import React from "react";
import { LegacyDiaryEntry } from "../Diary.types";
import DiaryEntryCard from "../DiaryEntryCard/DiaryEntryCard";  
import { Plus as PlusIcon } from "lucide-react";
import css from "./DiaryList.module.css";

interface DiaryListProps {
  entries: LegacyDiaryEntry[];
  onEntryClick?: (entry: LegacyDiaryEntry) => void;
  selectedEntryId?: string;
  onAddEntry?: () => void;
}

const DiaryList: React.FC<DiaryListProps> = ({ 
  entries, 
  onEntryClick, 
  selectedEntryId,
  onAddEntry 
}) => {
  return (
    <div className={css.container}>
      <div className={css.header}>
        <h2 className={`${css.title} header-third`}>Ваші записи</h2>
        <button
          className={css.addButton}
          onClick={onAddEntry}
        >
          <span className={css.addText}>Новий запис</span>
              <div className={css.addIcon}>
                <svg className={css.editIcon} viewBox="0 0 32 32" width="24" height="24">
                  <use href="/leleka-sprite.svg#icon-add-circle" />
                </svg>
          </div>
        </button>
      </div>
      
      <div className={css.entriesList}>
        {entries.length === 0 ? (
          <div className={css.placeholder}>
            <p className="text-primary">Записів поки що немає</p>
          </div>
        ) : (
          entries.map((entry) => (
            <DiaryEntryCard
              key={entry.id}
              entry={entry}
              onClick={() => onEntryClick?.(entry)}
              isSelected={selectedEntryId === entry.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DiaryList;