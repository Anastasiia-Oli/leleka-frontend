// Оновлений файл diaryService.ts - тепер використовує diaryApi замість прямих викликів
import * as diaryApi from "@/lib/api/diaryApi";
import { 
  DiaryEntry, 
  CreateDiaryEntryData, 
  UpdateDiaryEntryData 
} from "@/components/Diary/Diary.types";

// Re-export всіх функцій з diaryApi
export const getDiaryEntries = diaryApi.getDiaryEntries;
export const getDiaryEntry = diaryApi.getDiaryEntry;
export const createDiaryEntry = diaryApi.createDiaryEntry;
export const updateDiaryEntry = diaryApi.updateDiaryEntry;
export const deleteDiaryEntry = diaryApi.deleteDiaryEntry;