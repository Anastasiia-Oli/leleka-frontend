"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import DiaryEntryDetails from "@/components/Diary/DiaryEntryDetails/DiaryEntryDetails";
import { fetchDiary } from "@/lib/api/clientApi";
import { DiaryEntry } from "@/types/dairy";

interface PageProps {
  params: {
    entryId: string;
  };
}

const DiaryEntryPage = ({ params }: PageProps) => {
  const router = useRouter();

  // Отримуємо всі записи щоденника
  const { data: diaryEntries, isLoading, refetch } = useQuery<DiaryEntry[]>({
    queryKey: ['diary'],
    queryFn: fetchDiary,
  });

  // Знаходимо конкретний запис за ID
  const entry = diaryEntries?.find(e => e._id === params.entryId) || null;

  const handleBack = () => {
    router.push('/diary');
  };

  const handleEdit = () => {
    if (entry) {
      console.log('Open AddDiaryEntryModal for editing', entry);
    }
  };

  // Обробник видалення запису
  const handleEntryDelete = (deletedEntryId: string) => {
    router.push('/diary');
    refetch();
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "var(--pastel-pink-lighter)",
        padding: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <p>Завантаження...</p>
      </div>
    );
  }

  if (!entry) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "var(--pastel-pink-lighter)",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <h2>Запис не знайдено</h2>
        <button
          onClick={handleBack}
          style={{
            marginTop: "16px",
            padding: "10px 20px",
            backgroundColor: "var(--pastel-pink)",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Повернутися до списку
        </button>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--pastel-pink-lighter)",
      padding: "16px"
    }}>
      <div style={{ maxWidth: "100%", margin: "0 auto" }}>
        <DiaryEntryDetails
          entry={entry}
          onEdit={handleEdit}
          onDelete={handleEntryDelete}
          onBack={handleBack}
        />
      </div>
    </div>
  );
};

export default DiaryEntryPage;