export interface DiaryEntryData {
  title: string;
  description: string;
  date?: string; // якщо не передано, бекенд використає сьогоднішню дату
  emotions: string[];
}

// Створення нового запису
export async function createDiaryEntry(data: DiaryEntryData) {
  const res = await fetch("/api/diaries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Не вдалося створити запис");
  return res.json();
}

// Оновлення існуючого запису
export async function updateDiaryEntry(id: string, data: DiaryEntryData) {
  const res = await fetch(`/api/diaries/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Не вдалося оновити запис");
  return res.json();
}

// Отримати список записів
export async function getDiaryEntries() {
  const res = await fetch("/api/diaries");
  if (!res.ok) throw new Error("Не вдалося отримати записи");
  return res.json();
}

// Отримати один запис за ID
export async function getDiaryEntryById(id: string) {
  const res = await fetch(`/api/diaries/${id}`);
  if (!res.ok) throw new Error("Не вдалося отримати запис");
  return res.json();
}
