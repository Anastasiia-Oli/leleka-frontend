import nextServer from "@/lib/api/api";
import { 
  DiaryEntry, 
  CreateDiaryEntryData, 
  UpdateDiaryEntryData 
} from "@/components/Diary/Diary.types";

const API_BASE_URL = "https://leleka-backend-1.onrender.com";

// Отримати всі записи щоденника
export const getDiaryEntries = async (): Promise<DiaryEntry[]> => {
  try {
    const response = await nextServer.get(`${API_BASE_URL}/diaries`);
    return response.data;
  } catch (error) {
    console.error("Помилка отримання записів щоденника:", error);
    throw new Error("Не вдалося завантажити записи щоденника");
  }
};

// Створити новий запис
export const createDiaryEntry = async (data: CreateDiaryEntryData): Promise<DiaryEntry> => {
  try {
    const response = await nextServer.post(`${API_BASE_URL}/diaries`, data);
    return response.data;
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
    const response = await nextServer.patch(`${API_BASE_URL}/diaries/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Помилка оновлення запису:", error);
    throw new Error("Не вдалося оновити запис");
  }
};

// Видалити запис
export const deleteDiaryEntry = async (id: string): Promise<void> => {
  try {
    await nextServer.delete(`${API_BASE_URL}/diaries/${id}`);
  } catch (error) {
    console.error("Помилка видалення запису:", error);
    throw new Error("Не вдалося видалити запис");
  }
};