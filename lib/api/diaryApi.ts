import nextServer from "./api";
import { 
  DiaryEntry, 
  CreateDiaryEntryData, 
  UpdateDiaryEntryData 
} from "@/components/Diary/Diary.types";

// Отримати всі записи щоденника
export const getDiaryEntries = async (): Promise<DiaryEntry[]> => {
  try {
    const response = await nextServer.get("/diaries");
    return response.data.data || response.data;
  } catch (error) {
    console.error("Помилка отримання записів щоденника:", error);
    throw new Error("Не вдалося завантажити записи щоденника");
  }
};

// Отримати запис за ID
export const getDiaryEntry = async (id: string): Promise<DiaryEntry> => {
  try {
    const response = await nextServer.get(`/diaries/${id}`);
    return response.data.data || response.data;
  } catch (error) {
    console.error(`Помилка отримання запису ${id}:`, error);
    throw new Error("Не вдалося завантажити запис");
  }
};

// Створити новий запис
export const createDiaryEntry = async (data: CreateDiaryEntryData): Promise<DiaryEntry> => {
  try {
    const response = await nextServer.post("/diaries", data);
    return response.data.data || response.data;
  } catch (error) {
    console.error("Помилка створення запису:", error);
    throw new Error("Не вдалося створити запис");
  }
};

// Оновити існуючий запис
export const updateDiaryEntry = async (
  id: string, 
  data: UpdateDiaryEntryData
): Promise<DiaryEntry> => {
  try {
    const response = await nextServer.patch(`/diaries/${id}`, data);
    return response.data.data || response.data;
  } catch (error) {
    console.error("Помилка оновлення запису:", error);
    throw new Error("Не вдалося оновити запис");
  }
};

// Видалити запис
export const deleteDiaryEntry = async (id: string): Promise<void> => {
  try {
    await nextServer.delete(`/diaries/${id}`);
  } catch (error) {
    console.error("Помилка видалення запису:", error);
    throw new Error("Не вдалося видалити запис");
  }
};