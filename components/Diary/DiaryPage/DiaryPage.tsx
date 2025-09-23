"use client";

import React, { useState } from "react";
import { 
  DiaryEntry, 
  Note, 
  convertApiEntryToLegacy, 
  convertLegacyEntryToApi,
  LegacyDiaryEntry 
} from "../Diary.types";
import { mockNotes } from "../Diary.mock";
import DiaryList from "../DiaryList/DiaryList";
import DiaryEntryDetails from "../DiaryEntryDetails/DiaryEntryDetails";
import NotesList from "../NotesList/NotesList";
import GreetingBlock from "../GreetingBlock/GreetingBlock";
import { useDiaryEntries, useDeleteDiaryEntry } from "../../../hooks/useDiary";
import css from "./DiaryPage.module.css";

const DiaryPage: React.FC = () => {
  const { data: apiEntries = [], isLoading, error } = useDiaryEntries();
  const deleteEntryMutation = useDeleteDiaryEntry();
  
  // Конвертуємо API дані в legacy формат для сумісності
  const entries: LegacyDiaryEntry[] = apiEntries.map(convertApiEntryToLegacy);
  
  const [notes] = useState<Note[]>(mockNotes);
  const [selectedEntry, setSelectedEntry] = useState<LegacyDiaryEntry | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Встановлюємо перший запис як вибраний, коли дані завантажились
  React.useEffect(() => {
    if (entries.length > 0 && !selectedEntry) {
      setSelectedEntry(entries[0]);
    }
  }, [entries, selectedEntry]);

  const handleEntryClick = (entry: LegacyDiaryEntry) => {
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches) {
      window.location.href = `/diary/${entry.id}`;
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
    // Тут буде модальне вікно для створення нового запису
  };

  const handleAddNote = () => {
    console.log('Open AddNoteModal');
  };

  const handleEditEntry = () => {
    console.log('Open AddDiaryEntryModal for editing', selectedEntry);
    // Тут буде модальне вікно для редагування запису
  };

  const handleDeleteEntry = async () => {
    if (selectedEntry && window.confirm('Ви впевнені, що хочете видалити цей запис?')) {
      try {
        await deleteEntryMutation.mutateAsync(selectedEntry.id);
        setSelectedEntry(null);
        console.log('Entry deleted successfully');
      } catch (error) {
        console.error('Error deleting entry:', error);
        alert('Помилка при видаленні запису');
      }
    }
  };

  if (isLoading) {
    return (
      <div className={css.container}>
        <GreetingBlock />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '200px' 
        }}>
          <p>Завантаження...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={css.container}>
        <GreetingBlock />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '200px',
          color: 'var(--color-red)' 
        }}>
          <p>Помилка завантаження записів. Спробуйте пізніше.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <GreetingBlock />
      
      {/* Mobile version - show only the list */}
      <div className={css.mobileLayout}>
        <div className={css.mobileGrid}>
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

      {/* Desktop version - show everything in one grid */}
      <div className={css.desktopLayout}>
        <div className={css.desktopGrid}>
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
          
          {/* Можна розкоментувати, коли буде потрібно
          <NotesList
            notes={notes}
            onNoteClick={handleNoteClick}
            selectedNoteId={selectedNote?.id}
            onAddNote={handleAddNote}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default DiaryPage;