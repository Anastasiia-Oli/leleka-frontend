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
  const { data: diaryEntries, isLoading } = useQuery<DiaryEntry[]>({
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
      // Тут буде логіка відкриття модального вікна для редагування
    }
  };

  const handleDelete = async () => {
    if (entry && window.confirm('Ви впевнені, що хочете видалити цей запис?')) {
      try {
        // Тут буде API виклик для видалення
        console.log('Видалення запису:', entry._id);
        // Після успішного видалення повертаємось до списку
        router.push('/diary');
      } catch (error) {
        console.error('Error deleting entry:', error);
        alert('Помилка при видаленні запису');
      }
    }
  };

  if (isLoading) {
    return <div>Завантаження...</div>;
  }
  
  // Якщо запис не знайдено
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
      padding: "0"
    }}>
      <div style={{
        padding: "16px",
        paddingBottom: "0"
      }}>
        {/* Тут можна додати хлібні крихти або додаткову навігацію */}
      </div>

      <div style={{
        padding: "0 16px 16px 16px",
        height: "calc(100vh - 120px)"
      }}>
        <DiaryEntryDetails
          entry={entry}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onBack={handleBack}
        />
      </div>
    </div>
  );
};

export default DiaryEntryPage;