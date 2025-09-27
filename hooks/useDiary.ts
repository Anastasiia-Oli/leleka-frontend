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
    onSuccess: (newEntry) => {
      // Додаємо новий запис до кешу
      queryClient.setQueryData<DiaryEntry[]>(['diaryEntries'], (oldEntries = []) => {
        return [newEntry, ...oldEntries];
      });
      // Також інвалідуємо запити для повного оновлення
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
      // Оновлюємо конкретний запис у списку
      queryClient.setQueryData<DiaryEntry[]>(['diaryEntries'], (oldEntries = []) => {
        return oldEntries.map(entry => 
          entry._id === updatedEntry._id ? updatedEntry : entry
        );
      });
      
      // Також оновлюємо окремий запис, якщо він є в кеші
      queryClient.setQueryData(['diaryEntry', updatedEntry._id], updatedEntry);
      
      // Інвалідуємо для повного оновлення
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
    onSuccess: (_, deletedId) => {
      // Видаляємо запис з кешу
      queryClient.setQueryData<DiaryEntry[]>(['diaryEntries'], (oldEntries = []) => {
        return oldEntries.filter(entry => entry._id !== deletedId);
      });
      
      // Видаляємо окремий запис з кешу
      queryClient.removeQueries({ queryKey: ['diaryEntry', deletedId] });
      
      // Інвалідуємо список для повного оновлення
      queryClient.invalidateQueries({ queryKey: ['diaryEntries'] });
    },
    onError: (error) => {
      console.error('Error deleting diary entry:', error);
    },
  });
};