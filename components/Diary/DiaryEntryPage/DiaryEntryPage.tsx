"use client";

import React from "react";
import { useRouter } from "next/navigation";
import DiaryEntryDetails from "@/components/Diary/DiaryEntryDetails/DiaryEntryDetails";


interface PageProps {
  params: {
    entryId: string;
  };
}

const DiaryEntryPage = ({ params }: PageProps) => {
  const router = useRouter();
  // const entry = mockEntries.find(e => e.id === params.entryId);

  const handleBack = () => {
    router.push('/diary');
  };

  const handleEdit = () => {
    console.log('Open AddDiaryEntryModal for editing', entry);
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
      </div>

      <div style={{
        padding: "0 16px 16px 16px",
        height: "calc(100vh - 120px)"
      }}>
        <DiaryEntryDetails
          entry={entry || null}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onBack={handleBack}
        />
      </div>
    </div>
  );
};

export default DiaryEntryPage;