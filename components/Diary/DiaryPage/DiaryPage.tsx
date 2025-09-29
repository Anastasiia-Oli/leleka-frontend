"use client";
import React, { useState } from "react";
import { DiaryEntry } from "@/types/dairy";
import { useRouter } from "next/navigation";
import DiaryList from "../DiaryList/DiaryList";
import DiaryEntryDetails from "../DiaryEntryDetails/DiaryEntryDetails";
import css from "./DiaryPage.module.css";
import { fetchDiary } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";

const DiaryPage: React.FC = () => {
  const router = useRouter();

  const { data } = useQuery<DiaryEntry[]>({
    queryKey: ["diary"],
    queryFn: fetchDiary,
  });

  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [selectedNote, setSelectedNote] = useState<DiaryEntry | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  React.useEffect(() => {
    if (!data || isMobile) return;

    if (data.length === 0) {
      setSelectedEntry(null);
      return;
    }

    // Якщо вибраний запис видалено, обираємо перший доступний
    const isSelectedDeleted = selectedEntry &&
      !data.find(entry => entry._id === selectedEntry._id);

    if (!selectedEntry || isSelectedDeleted) {
      setSelectedEntry(data[0]);
    }
  }, [data, selectedEntry, isMobile]);

  const handleEntryClick = (entry: DiaryEntry) => {
    if (isMobile) {
      // Використовуємо Next.js router замість window.location.href
      router.push(`/diary/${entry._id}`);
    } else {
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
    console.log("Open AddNoteModal");
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

  return (
    <div className={css.diaryContainer}>
      <div className={css.mobileLayout}>
        <DiaryList
          data={data || []}
          onEntryClick={handleEntryClick}
          selectedEntryId={selectedEntry?._id}
          onAddEntry={handleAddEntry}
        />
      </div>

      <div className={css.desktopLayout}>
        <div className={css.desktopGrid}>
          <DiaryList
            data={data || []}
            onEntryClick={handleEntryClick}
            selectedEntryId={selectedEntry?._id}
            onAddEntry={handleAddEntry}
          />

          <DiaryEntryDetails entry={selectedEntry} onEdit={handleEditEntry} />
        </div>
      </div>
    </div>
  );
};

export default DiaryPage;
