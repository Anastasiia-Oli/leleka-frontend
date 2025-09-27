"use client";

import React, { useState } from "react";
import dynamic from 'next/dynamic';
import { 
  Note, 
  convertApiEntryToLegacy, 
  LegacyDiaryEntry 
} from "../Diary.types";
import { mockEntries, mockNotes } from "../Diary.mock";
import DiaryList from "../DiaryList/DiaryList";
import DiaryEntryDetails from "../DiaryEntryDetails/DiaryEntryDetails";
import { useDiaryEntries, useDeleteDiaryEntry } from "@/hooks/useDiary";
import css from "./DiaryPage.module.css";

// Динамічний імпорт GreetingBlock без SSR
const GreetingBlock = dynamic(() => import("../../GreetingBlock/GreetingBlock"), {
  ssr: false,
  loading: () => (
    <div style={{ marginBottom: "32px" }}>
      <h1 className="header-first" style={{ margin: 0 }}>
        Доброго ранку!
      </h1>
    </div>
  )
});

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
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<LegacyDiaryEntry | null>(null);

  // Перевіряємо розмір екрану
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Автоматично вибираємо перший запис на десктопі
  React.useEffect(() => {
    if (entries.length > 0 && !selectedEntry && !isMobile) {
      setSelectedEntry(entries[0]);
    }
  }, [entries, selectedEntry, isMobile]);

  const handleEntryClick = (entry: LegacyDiaryEntry) => {
    if (isMobile) {
      // На мобільних переходимо на окрему сторінку
      window.location.href = `/diary/${entry.id}`;
    } else {
      // На десктопі показуємо в правій колонці
      setSelectedEntry(entry);
      setSelectedNote(null);
    }
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setSelectedEntry(null);
  };

  const handleAddEntry = () => {
    setEditingEntry(null);
    setIsModalOpen(true);
  };

  const handleAddNote = () => {
    console.log('Open AddNoteModal');
  };

  const handleEditEntry = () => {
    if (selectedEntry) {
      setEditingEntry(selectedEntry);
      setIsModalOpen(true);
    }
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEntry(null);
  };

  if (isLoading) {
    return (
      <div className={css.diaryContainer}>
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
    <div className={css.diaryContainer}>
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
      
      {/* Mobile Layout */}
      <div className={css.mobileLayout}>
        <DiaryList 
          entries={entries}
          onEntryClick={handleEntryClick}
          selectedEntryId={selectedEntry?.id}
          onAddEntry={handleAddEntry}
        />
      </div>

      {/* Desktop Layout */}
      <div className={css.desktopLayout}>
        <div className={css.desktopGrid}>
          {/* Ліва колонка - список записів */}
          <DiaryList 
            entries={entries}
            onEntryClick={handleEntryClick}
            selectedEntryId={selectedEntry?.id}
            onAddEntry={handleAddEntry}
          />
          
          {/* Права колонка - деталі запису */}
          <DiaryEntryDetails 
            entry={selectedEntry}
            onEdit={handleEditEntry}
            onDelete={handleDeleteEntry}
          />
        </div>
      </div>

      {/* Модальне вікно для додавання/редагування
      <AddDiaryEntryModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editEntry={editingEntry}
      /> */}
    </div>
  );
};

export default DiaryPage;