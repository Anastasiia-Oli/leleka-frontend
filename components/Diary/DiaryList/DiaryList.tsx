import React from "react";
import DiaryEntryCard from "../DiaryEntryCard/DiaryEntryCard";
import css from "./DiaryList.module.css";
import { useQuery } from "@tanstack/react-query";
import { DiaryEntry } from "@/types/dairy";

interface DiaryListProps {
  data: DiaryEntry[];
  onEntryClick?: (entry: DiaryEntry) => void;
  selectedEntryId?: string;
  onAddEntry?: () => void;
}


const DiaryList: React.FC<DiaryListProps> = ({
  onEntryClick,
  selectedEntryId,
  onAddEntry,
  data
}) => {


  return (

    <div className={css.diaryContainer}>
      <div className={css.diaryHeader}>
        <h2 className={`${css.diaryTitle} header-third`}>Ваші записи</h2>
        <button
          className={css.addButton}
          onClick={onAddEntry}
        >
          <span className={css.addText}>Новий запис</span>
          <div className={css.addIcon}>
            <svg viewBox="0 0 32 32" width="24" height="24">
              <use href="/leleka-sprite.svg#icon-add-circle" />
            </svg>
          </div>
        </button>
      </div>

      <div className={css.entriesList}>
        {data?.length === 0 ? (
          <div className={css.placeholder}>
            <p className="text-primary">Записів поки що немає</p>
          </div>
        ) : (
          data?.map((entry) => (
            <DiaryEntryCard
              key={entry._id}
              entry={entry}
              onClick={() => onEntryClick?.(entry)}
              isSelected={selectedEntryId === entry._id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DiaryList;