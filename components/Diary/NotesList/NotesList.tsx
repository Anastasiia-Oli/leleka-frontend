import React from "react";
import NoteCard from "../NoteCard/NoteCard";
import { Note } from "../Diary.types";
import { BookOpen as BookIcon, Plus as PlusIcon } from "lucide-react";

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
    <div style={{ 
      background: "var(--white)", 
      borderRadius: "16px", 
      height: "100%", 
      display: "flex", 
      flexDirection: "column" 
    }}>
      <div style={{ 
        padding: "24px", 
        borderBottom: "1px solid var(--gray-lightest)" 
      }}>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between", 
          marginBottom: "16px" 
        }}>
          <h2 className="header-third" style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "8px",
            margin: 0
          }}>
            <BookIcon size={24} />
            Нотатки
          </h2>
          <button
            onClick={onAddNote}
            style={{
              display: "flex",
              alignItems: "center", 
              gap: "8px",
              background: "none",
              border: "none",
              color: "var(--gray-dark)",
              cursor: "pointer",
              padding: "4px 8px",
              borderRadius: "8px",
              transition: "color 0.2s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--black)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--gray-dark)"}
          >
            <PlusIcon size={20} />
            <span className="text-medium">Нова нотатка</span>
          </button>
        </div>
      </div>
      
      <div style={{ 
        flex: 1, 
        overflowY: "auto", 
        padding: "24px" 
      }}>
        {notes.length === 0 ? (
          <div style={{
            display: "flex",
            alignItems: "center", 
            justifyContent: "center",
            height: "200px",
            color: "var(--gray)",
            textAlign: "center"
          }}>
            <p className="text-primary">Нотаток поки що немає</p>
          </div>
        ) : (
          notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onClick={() => onNoteClick?.(note)}
              isSelected={selectedNoteId === note.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotesList;