import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/lib/api/clientApi';
import { User } from '@/types/user';

// Хук для отримання поточного користувача
export const useCurrentUser = () => {
  return useQuery<User, Error>({
    queryKey: ['currentUser'],
    queryFn: getMe,
    staleTime: 10 * 60 * 1000, // 10 хвилин
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

// Хук для отримання вітання залежно від часу доби
export const useGreeting = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Доброго ранку';
    if (hour < 17) return 'Доброго дня';
    if (hour < 22) return 'Доброго вечора';
    return 'Доброї ночі';
  };

  return getGreeting();
};