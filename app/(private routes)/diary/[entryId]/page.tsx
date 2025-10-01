"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import DiaryEntryDetails from "@/components/Diary/DiaryEntryDetails/DiaryEntryDetails";
import AddDiaryEntryModal from "@/components/Diary/AddDiaryEntryModal/AddDiaryEntryModal";
import { fetchDiary } from "@/lib/api/clientApi";
import { DiaryEntry } from "@/types/dairy";

interface PageProps {
  params: Promise<{
    entryId: string;
  }>;
}

const DiaryEntryPage = ({ params }: PageProps) => {
  const router = useRouter();
  const [entryId, setEntryId] = React.useState<string>("");

  // Розпаковуємо params (оскільки це Promise в Next.js 15+)
  React.useEffect(() => {
    params.then((resolvedParams) => {
      setEntryId(resolvedParams.entryId);
    });
  }, [params]);

  const { data: diaryEntries, isLoading } = useQuery<DiaryEntry[]>({
    queryKey: ["diary"],
    queryFn: fetchDiary,
  });

  const entry = diaryEntries?.find((e) => e._id === entryId) || null;

  // Стани для модалки
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("edit");
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null);

  const handleBack = () => {
    router.push("/diary");
  };

  const handleEdit = (entryToEdit: DiaryEntry) => {
    setModalMode("edit");
    setEditingEntry(entryToEdit);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEntry(null);
  };

  if (isLoading || !entryId) {
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
            onEdit={() => handleEdit(entry)}
            onBack={handleBack}
          />
        </div>
      </div>

      {/* Рендер модалки */}
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
