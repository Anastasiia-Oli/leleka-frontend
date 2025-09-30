"use client";

import { useDiaryStore } from "@/lib/store/useDiaryStore";
import AddDiaryEntryModal from "../../../../../../components/Diary/AddDiaryEntryModal/AddDiaryEntryModal";

export default function EditDiaryEntryModalPage() {
  const { currentEntry } = useDiaryStore();

  if (!currentEntry) return <div>Запис не знайдено</div>;

  return <AddDiaryEntryModal mode="edit" entry={currentEntry} />;
}
