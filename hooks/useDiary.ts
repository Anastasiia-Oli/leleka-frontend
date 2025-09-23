import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  DiaryEntry, 
  CreateDiaryEntryData, 
  UpdateDiaryEntryData 
} from "@/components/Diary/Diary.types";
import * as diaryService from "@/lib/services/diaryService";

// Отримати всі записи щоденника
export const useDiaryEntries = () => {
  return useQuery<DiaryEntry[]>({
    queryKey: ["diaryEntries"],
    queryFn: diaryService.getDiaryEntries,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

// Створити новий запис
export const useCreateDiaryEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDiaryEntryData) => diaryService.createDiaryEntry(data),
    onSuccess: (newEntry) => {
      // Оновлюємо кеш із новим записом
      queryClient.setQueryData<DiaryEntry[]>(["diaryEntries"], (oldData) => {
        if (!oldData) return [newEntry];
        return [newEntry, ...oldData];
      });
    },
    onError: (error) => {
      console.error("Помилка створення запису:", error);
    },
  });
};

// Оновити існуючий запис
export const useUpdateDiaryEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDiaryEntryData }) =>
      diaryService.updateDiaryEntry(id, data),
    onSuccess: (updatedEntry) => {
      // Оновлюємо кеш із змінами
      queryClient.setQueryData<DiaryEntry[]>(["diaryEntries"], (oldData) => {
        if (!oldData) return [];
        return oldData.map((entry) =>
          entry._id === updatedEntry._id ? updatedEntry : entry
        );
      });
    },
    onError: (error) => {
      console.error("Помилка оновлення запису:", error);
    },
  });
};

// Видалити запис
export const useDeleteDiaryEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => diaryService.deleteDiaryEntry(id),
    onSuccess: (_, deletedId) => {
      // Видаляємо запис із кешу
      queryClient.setQueryData<DiaryEntry[]>(["diaryEntries"], (oldData) => {
        if (!oldData) return [];
        return oldData.filter((entry) => entry._id !== deletedId);
      });
    },
    onError: (error) => {
      console.error("Помилка видалення запису:", error);
    },
  });
};