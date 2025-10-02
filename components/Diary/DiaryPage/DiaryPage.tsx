"use client";
import React, { useState, useEffect } from "react";
import { DiaryEntry } from "@/types/dairy";
import { useRouter } from "next/navigation";
import DiaryList from "../DiaryList/DiaryList";
import DiaryEntryDetails from "../DiaryEntryDetails/DiaryEntryDetails";
import AddDiaryEntryModal from "../AddDiaryEntryModal/AddDiaryEntryModal";
import css from "./DiaryPage.module.css";
import { fetchDiary } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";

const DiaryPage: React.FC = () => {
  const router = useRouter();

  const { data } = useQuery<DiaryEntry[]>({
    queryKey: ["diary"],
    queryFn: fetchDiary,
  });

  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  // const [selectedNote, setSelectedNote] = useState<DiaryEntry | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null);
  const [showMobileDetails, setShowMobileDetails] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isModalOpen]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (data && data.length > 0 && !selectedEntry && !isMobile) {
      setSelectedEntry(data[0]);
    }
  }, [data, selectedEntry, isMobile]);

  useEffect(() => {
    if (selectedEntry) {
      setEditingEntry(selectedEntry);
    }
  }, [selectedEntry]);

  const handleEntryClick = (entry: DiaryEntry) => {
    if (isMobile) {
      // Використовуємо Next.js router замість window.location.href
      router.push(`/diary/${entry._id}`);
    } else {
      setSelectedEntry(entry);
      // setSelectedNote(null);
    }
    return entry._id;
  };

  const handleAddEntry = () => {
    setModalMode("create");
    setEditingEntry(null);
    setIsModalOpen(true);
  };


  // const handleAddNote = () => {
  //   console.log("Open AddNoteModal");
  // };

  const handleEditEntry = (selectedEntry: DiaryEntry) => {
    setModalMode("edit");
    setEditingEntry(selectedEntry);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEntry(null);
  };

  const handleBackToList = () => {
    setShowMobileDetails(false);
    setSelectedEntry(null);
  };

  return (

    <div className={css.diaryContainer}>
      <div className={css.greetingBlock}>
        <GreetingBlock /></div>
      {/* Мобільна версія */}
      <div className={css.mobileLayout}>
        {!showMobileDetails ? (
          <DiaryList
            data={data || []}
            onEntryClick={handleEntryClick}
            selectedEntryId={selectedEntry?._id}
            onAddEntry={handleAddEntry}
          />
        ) : (
          <DiaryEntryDetails
            entry={selectedEntry}
            onEdit={handleEditEntry}
            onBack={handleBackToList}
          />
        )}
      </div>

      {/* Десктопна версія */}
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

      {/* Модалка додавання/редагування */}
      <AddDiaryEntryModal
        isOpen={isModalOpen}
        mode={modalMode}
        entry={editingEntry}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default DiaryPage;
