import React from "react";
import { DiaryEntry } from "../Diary.types";
import DiaryEntryCard from "../DiaryEntryCard/DiaryEntryCard";  
import { Plus as PlusIcon } from "lucide-react";
import css from "./DiaryList.module.css";

interface DiaryListProps {
  entries: DiaryEntry[];
  onEntryClick?: (entry: DiaryEntry) => void;
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
          <div className={css.addIcon}>
            <PlusIcon size={24} />
          </div>
          <span className={css.addText}>Новий запис</span>
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