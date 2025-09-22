import React, { useState } from "react";
import { Trash2, Edit, Plus, Calendar, X } from "lucide-react";
import NoteCard from "../NoteCard/NoteCard";
import { Note } from "../Diary.types";
import { Book as BookIcon, Plus as PlusIcon } from "lucide-react";

interface NotesListProps {
  notes: Note[];
  onNoteClick?: (note: Note) => void;
  selectedNoteId?: string;
  onAddNote?: () => void;
}

const NotesList: React.FC<NotesListProps> = ({ 
  notes, 
  onNoteClick, 
  selectedNoteId,
  onAddNote 
}) => {
  return (
    <div className="bg-white rounded-xl h-full flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <BookIcon />
            Нотатки
          </h2>
          <button
            onClick={onAddNote}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <PlusIcon />
            <span className="text-sm font-medium">Нова нотатка</span>
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onClick={() => onNoteClick?.(note)}
            isSelected={selectedNoteId === note.id}
          />
        ))}
      </div>
    </div>
  );
};
