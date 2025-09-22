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
      style={{
        background: isSelected ? "var(--gray-lightest)" : "var(--gray-lightest)",
        borderRadius: "12px",
        padding: "16px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        marginBottom: "16px",
        border: isSelected ? "2px solid var(--gray-lighter)" : "2px solid transparent"
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.background = "var(--white)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.background = "var(--gray-lightest)";
        }
      }}
    >
      <h3 className="header-fourth" style={{ 
        margin: "0 0 8px 0", 
        color: "var(--black)" 
      }}>
        {note.title}
      </h3>
      <p className="text-primary" style={{ 
        margin: "0 0 8px 0", 
        color: "var(--gray)" 
      }}>
        {note.date}
      </p>
      <p className="text-primary" style={{ 
        margin: 0,
        color: "var(--gray-dark)",
        overflow: "hidden",
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical"
      }}>
        {note.content}
      </p>
    </div>
  );
};

export default NoteCard;