"use client";
import React, { useState, useEffect } from "react";
import { DiaryEntry } from "@/types/dairy";
import { useRouter } from "next/navigation";
import DiaryList from "../DiaryList/DiaryList";
import DiaryEntryDetails from "../DiaryEntryDetails/DiaryEntryDetails";
import AddDiaryEntryModal from "../AddDiaryEntryModal/AddDiaryEntryModal";
import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
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
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileDetails, setShowMobileDetails] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null);

  // --- Відстежуємо розмір екрана ---
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // --- Логіка для десктопу: завжди є вибраний запис ---
  useEffect(() => {
    if (!data || isMobile) return;

    if (data.length === 0) {
      setSelectedEntry(null);
      return;
    }

    const isSelectedDeleted =
      selectedEntry && !data.find((entry) => entry._id === selectedEntry._id);

    if (!selectedEntry || isSelectedDeleted) {
      setSelectedEntry(data[0]);
    }
  }, [data, selectedEntry, isMobile]);

  // --- Обробники ---
  const handleEntryClick = (entry: DiaryEntry) => {
    if (isMobile) {
      router.push(`/diary/${entry._id}`); // мобільна логіка
    } else {
      setSelectedEntry(entry); // десктопна логіка
    }
  };

  const handleAddEntry = () => {
    setModalMode("create");
    setEditingEntry(null);
    setIsModalOpen(true);
  };

  const handleEditEntry = (entry: DiaryEntry) => {
    setModalMode("edit");
    setEditingEntry(entry);
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

  // --- Рендер ---
  return (

    <div className={css.diaryContainer}>
      <div className={css.headerGreeting}>
        <GreetingBlock /></div>
      {/* Мобільна версія */}
      <div className={css.mobileLayout}>
        {!showMobileDetails ? (
          <DiaryList
            data={data || []}
            onEntryClick={handleEntryClick}
            selectedEntryId={selectedEntry?._id}
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
        <GreetingBlock />
        <div className={css.desktopGrid}>
          <DiaryList
            data={data || []}
            onEntryClick={handleEntryClick}
            selectedEntryId={selectedEntry?._id}
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
