import React from "react";
import { DiaryEntry } from "@prisma/client";
import DiaryEntryCard from "../DiaryEntryCard/DiaryEntryCard";  
import { Plus as PlusIcon } from "lucide-react";

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
    <div className="bg-white rounded-xl h-full flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Ваші записи</h2>
          <button
            onClick={onAddEntry}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <PlusIcon />
            <span className="text-sm font-medium">Новий запис</span>
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        {entries.map((entry) => (
          <DiaryEntryCard
            key={entry.id}
            entry={entry}
            onClick={() => onEntryClick?.(entry)}
            isSelected={selectedEntryId === entry.id}
          />
        ))}
      </div>
    </div>
  );
};