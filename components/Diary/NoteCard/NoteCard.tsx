import React from "react";
import { Note } from "../Diary.types";

interface NoteCardProps {
  note: Note;
  onClick?: () => void;
  isSelected?: boolean;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-gray-50 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:bg-gray-100 mb-4
        ${isSelected ? 'ring-2 ring-gray-300 bg-gray-100' : ''}
      `}
    >
      <h3 className="font-medium text-gray-900 mb-2">{note.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{note.date}</p>
      <p className="text-sm text-gray-700 line-clamp-3">{note.content}</p>
    </div>
  );
};