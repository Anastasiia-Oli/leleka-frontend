"use client";

import React, { useState } from "react";
import { 
  Note, 
  convertApiEntryToLegacy, 
  LegacyDiaryEntry 
} from "../Diary.types";
import { mockEntries, mockNotes } from "../Diary.mock";
import DiaryList from "../DiaryList/DiaryList";
import DiaryEntryDetails from "../DiaryEntryDetails/DiaryEntryDetails";
import NotesList from "../NotesList/NotesList";
import GreetingBlock from "../../GreetingBlock/GreetingBlock";
import { useDiaryEntries, useDeleteDiaryEntry } from "@/hooks/useDiary";
import css from "./DiaryPage.module.css";

const DiaryPage: React.FC = () => {
  const { data: apiEntries = [], isLoading, error } = useDiaryEntries();
  const deleteEntryMutation = useDeleteDiaryEntry();
  
  // Fallback на mock дані, якщо API не працює
  const entries: LegacyDiaryEntry[] = React.useMemo(() => {
    if (error || apiEntries.length === 0) {
      return mockEntries; // Використовуємо mock дані
    }
    return apiEntries.map(convertApiEntryToLegacy);
  }, [apiEntries, error]);
  
  const [notes] = useState<Note[]>(mockNotes);
  const [selectedEntry, setSelectedEntry] = useState<LegacyDiaryEntry | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Видаляємо логіку автоматичного вибору запису, оскільки тепер відкриваємо на новій сторінці
  // React.useEffect(() => {
  //   if (entries.length > 0 && !selectedEntry) {
  //     // Перевіряємо чи це десктоп
  //     if (typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches) {
  //       setSelectedEntry(entries[0]);
  //     }
  //   }
  // }, [entries, selectedEntry]);

  const handleEntryClick = (entry: LegacyDiaryEntry) => {
    // На всіх пристроях переходимо на окрему сторінку
    window.location.href = `/diary/${entry.id}`;
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

  const handleDeleteEntry = async () => {
    if (selectedEntry && window.confirm('Ви впевнені, що хочете видалити цей запис?')) {
      try {
        // Якщо це mock дані, просто видаляємо локально
        if (error || !apiEntries.length) {
          console.log('Видалення mock запису:', selectedEntry.id);
          // Знаходимо наступний запис для вибору або очищуємо вибір
          const currentIndex = entries.findIndex(e => e.id === selectedEntry.id);
          if (entries.length > 1) {
            const nextEntry = entries[currentIndex + 1] || entries[currentIndex - 1];
            setSelectedEntry(nextEntry);
          } else {
            setSelectedEntry(null);
          }
          return;
        }

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

  return (
    <div className={css.container}>
      <GreetingBlock />
      
      {/* Показуємо попередження, якщо використовуємо mock дані */}
      {error && (
        <div style={{ 
          padding: '16px', 
          backgroundColor: 'var(--sand-light)', 
          borderRadius: '8px', 
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0, color: 'var(--gray-dark)' }}>
            Сервер недоступний. Показані тестові дані.
          </p>
        </div>
      )}
      
      {/* Mobile and Desktop version - only DiaryList */}
      <DiaryList 
        entries={entries}
        onEntryClick={handleEntryClick}
        selectedEntryId={selectedEntry?.id}
        onAddEntry={handleAddEntry}
      />
    </div>
  );
};

export default DiaryPage;