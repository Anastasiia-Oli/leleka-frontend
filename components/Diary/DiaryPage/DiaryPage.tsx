import React, { useState } from "react";
import { Trash2, Edit, Plus, Calendar, X } from "lucide-react";
import { DiaryEntry, Note } from "../Diary.types";
import { mockEntries, mockNotes } from "../Diary.mock";
import DiaryList from "../DiaryList/DiaryList";
import DiaryEntryDetails from "../DiaryEntryDetails/DiaryEntryDetails";
import NotesList from "../NotesList/NotesList";
import GreetingBlock from "../GreetingBlock/GreetingBlock";


const DiaryPage: React.FC = () => {
  const [entries] = useState<DiaryEntry[]>(mockEntries);
  const [notes] = useState<Note[]>(mockNotes);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(entries[0]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleEntryClick = (entry: DiaryEntry) => {
    if (isMobile) {
      console.log(`Navigate to /diary/${entry.id}`);
    } else {
      setSelectedEntry(entry);
      setSelectedNote(null);
    }
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setSelectedEntry(null);
  };

  const handleAddEntry = () => {
    console.log('Open AddDiaryEntryModal');
  };

  const handleAddNote = () => {
    console.log('Open AddNoteModal');
  };

  const handleEditEntry = () => {
    console.log('Open AddDiaryEntryModal for editing', selectedEntry);
  };

  const handleDeleteEntry = () => {
    console.log('Open ConfirmationModal for deletion', selectedEntry);
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <GreetingBlock />
        <div className="space-y-4">
          <DiaryList 
            entries={entries}
            onEntryClick={handleEntryClick}
            onAddEntry={handleAddEntry}
          />
          <NotesList
            notes={notes}
            onNoteClick={handleNoteClick}
            onAddNote={handleAddNote}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <GreetingBlock />
      <div className="grid grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        <DiaryList 
          entries={entries}
          onEntryClick={handleEntryClick}
          selectedEntryId={selectedEntry?.id}
          onAddEntry={handleAddEntry}
        />
        
        <DiaryEntryDetails 
          entry={selectedEntry}
          onEdit={handleEditEntry}
          onDelete={handleDeleteEntry}
        />
        
        <NotesList
          notes={notes}
          onNoteClick={handleNoteClick}
          selectedNoteId={selectedNote?.id}
          onAddNote={handleAddNote}
        />
      </div>
    </div>
  );
};

export default DiaryPage;