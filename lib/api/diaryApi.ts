import axios from "axios";

export interface DiaryEntryData {
  title: string;
  description: string;
  date?: string; // якщо не передано, бекенд може використати сьогоднішню дату
  emotions: string[];
}

// Створення нового запису
export async function createDiaryEntry(data: DiaryEntryData) {
  const { data: result } = await axios.post("/api/diary", data);
  return result;
}

// Оновлення існуючого запису
export async function updateDiaryEntry(id: string, data: DiaryEntryData) {
  const { data: result } = await axios.put(`/api/diary/${id}`, data);
  return result;
}

// Отримати список записів
export async function getDiaryEntries() {
  const { data } = await axios.get("/api/diary");
  return data;
}

// Отримати один запис за ID
export async function getDiaryEntryById(id: string) {
  const { data } = await axios.get(`/api/diary/${id}`);
  return data;
}

// Отримати список категорій (емоцій)
export interface Category {
  id: string;
  name: string;
}

export async function fetchCategories(): Promise<Category[]> {
  const { data } = await axios.get("/api/categories");
  return data;
}
