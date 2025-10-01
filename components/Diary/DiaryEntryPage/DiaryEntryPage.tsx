"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DiaryEntryDetails from "@/components/Diary/DiaryEntryDetails/DiaryEntryDetails";
import AddDiaryEntryModal from "@/components/Diary/AddDiaryEntryModal/AddDiaryEntryModal";
import { fetchDiary } from "@/lib/api/clientApi";
import { DiaryEntry } from "@/types/dairy";
import { useQuery } from "@tanstack/react-query";

interface PageProps {
  params: {
    entryId: string;
  };
}

const DiaryEntryPage = ({ params }: PageProps) => {
  const router = useRouter();

  // Отримуємо всі записи щоденника
  const { data: diaryEntries, isLoading } = useQuery<DiaryEntry[]>({
    queryKey: ["diary"],
    queryFn: fetchDiary,
  });

  // Знаходимо конкретний запис за ID
  const entry = diaryEntries?.find((e) => e._id === params.entryId) || null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("edit");
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null);

  // useEffect(() => {
  //   if (entry) {
  //     setEditingEntry(entry);
  //     setModalMode("edit");
  //     setIsModalOpen(true);
  //   }
  // }, [entry]);

  const handleBack = () => {
    router.push("/diary");
  };

  const handleEdit = (entryToEdit: DiaryEntry) => {
    console.log("handleEdit fired ✅", entryToEdit);
    setModalMode("edit");
    setEditingEntry(entryToEdit);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEntry(null);
  };

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--pastel-pink-lighter)",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>Завантаження...</p>
      </div>
    );
  }

  if (!entry) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--pastel-pink-lighter)",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>Запис не знайдено</h2>
        <button
          onClick={handleBack}
          style={{
            marginTop: "16px",
            padding: "10px 20px",
            backgroundColor: "var(--pastel-pink)",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Повернутися до списку
        </button>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          background: "var(--pastel-pink-lighter)",
          padding: "16px",
        }}
      >
        <div style={{ maxWidth: "100%", margin: "0 auto" }}>
          <DiaryEntryDetails
            entry={entry}
            onEdit={handleEdit}
            onBack={handleBack}
          />
        </div>
      </div>
      {/* Модалка редагування */}
      <AddDiaryEntryModal
        isOpen={isModalOpen}
        mode={modalMode}
        entry={editingEntry}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default DiaryEntryPage;
