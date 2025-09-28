"use client";
import React, { useState } from "react";
import {
  DiaryEntry
} from "@/types/dairy";

import DiaryList from "../DiaryList/DiaryList";
import DiaryEntryDetails from "../DiaryEntryDetails/DiaryEntryDetails";
import css from "./DiaryPage.module.css";
import { fetchDiary } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";

const DiaryPage: React.FC = () => {

  const { data, refetch } = useQuery<DiaryEntry[]>({
    queryKey: ['diary'],
    queryFn: fetchDiary,
  });

  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [selectedNote, setSelectedNote] = useState<DiaryEntry | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null);

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
    if (data && data.length > 0 && !selectedEntry && !isMobile) {
      setSelectedEntry(data[0]);
    }
  }, [data, selectedEntry, isMobile]);

  const handleEntryClick = (entry: DiaryEntry) => {
    if (isMobile) {
      // На мобільних переходимо на окрему сторінку
      window.location.href = `/diary/${entry._id}`;
    } else {
      // На десктопі показуємо в правій колонці
      setSelectedEntry(entry);
      setSelectedNote(null);
    }
    return entry._id;
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEntry(null);
  };

  // Обробник видалення запису - викликається з DiaryEntryDetails
  const handleEntryDelete = (deletedEntryId: string) => {
    // Очищаємо обраний запис
    setSelectedEntry(null);
    // Оновлюємо дані в списку
    refetch();
  };

  return (
    <div className={css.diaryContainer}>
      {/* Mobile Layout */}
      <div className={css.mobileLayout}>
        <DiaryList
          data={data || []}
          onEntryClick={handleEntryClick}
          selectedEntryId={selectedEntry?._id}
          onAddEntry={handleAddEntry}
        />
      </div>

      {/* Desktop Layout */}
      <div className={css.desktopLayout}>
        <div className={css.desktopGrid}>
          {/* Ліва колонка - список записів */}
          <DiaryList
            data={data || []}
            onEntryClick={handleEntryClick}
            selectedEntryId={selectedEntry?._id}
            onAddEntry={handleAddEntry}
          />

          {/* Права колонка - деталі запису */}
          <DiaryEntryDetails
            entry={selectedEntry}
            onEdit={handleEditEntry}
            onDelete={handleEntryDelete}
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