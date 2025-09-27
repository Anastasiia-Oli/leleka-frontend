import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as diaryApi from '@/lib/api/diaryApi';
import { 
  DiaryEntry, 
  CreateDiaryEntryData, 
  UpdateDiaryEntryData 
} from '@/components/Diary/Diary.types';

// Хук для отримання всіх записів щоденника
export const useDiaryEntries = () => {
  return useQuery<DiaryEntry[], Error>({
    queryKey: ['diaryEntries'],
    queryFn: diaryApi.getDiaryEntries,
    staleTime: 5 * 60 * 1000, // 5 хвилин
    retry: 1,
  });
};

// Хук для отримання одного запису
export const useDiaryEntry = (id: string) => {
  return useQuery<DiaryEntry, Error>({
    queryKey: ['diaryEntry', id],
    queryFn: () => diaryApi.getDiaryEntry(id),
    enabled: !!id,
  });
};

// Хук для створення нового запису
export const useCreateDiaryEntry = () => {
  const queryClient = useQueryClient();
  
  return useMutation<DiaryEntry, Error, CreateDiaryEntryData>({
    mutationFn: diaryApi.createDiaryEntry,
    onSuccess: () => {
      // Оновлюємо кеш після успішного створення
      queryClient.invalidateQueries({ queryKey: ['diaryEntries'] });
    },
    onError: (error) => {
      console.error('Error creating diary entry:', error);
    },
  });
};

// Хук для оновлення запису
export const useUpdateDiaryEntry = () => {
  const queryClient = useQueryClient();
  
  return useMutation<DiaryEntry, Error, { id: string; data: UpdateDiaryEntryData }>({
    mutationFn: ({ id, data }) => diaryApi.updateDiaryEntry(id, data),
    onSuccess: (updatedEntry) => {
      // Оновлюємо кеш після успішного оновлення
      queryClient.invalidateQueries({ queryKey: ['diaryEntries'] });
      queryClient.invalidateQueries({ queryKey: ['diaryEntry', updatedEntry._id] });
    },
    onError: (error) => {
      console.error('Error updating diary entry:', error);
    },
  });
};

// Хук для видалення запису
export const useDeleteDiaryEntry = () => {
  const queryClient = useQueryClient();
  
  return useMutation<void, Error, string>({
    mutationFn: diaryApi.deleteDiaryEntry,
    onSuccess: () => {
      // Оновлюємо кеш після успішного видалення
      queryClient.invalidateQueries({ queryKey: ['diaryEntries'] });
    },
    onError: (error) => {
      console.error('Error deleting diary entry:', error);
    },
  });
};