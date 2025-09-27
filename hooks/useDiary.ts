import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  Task, 
  CreateTaskData, 
  UpdateTaskStatusData 
} from "@/lib/api/tasksApi";
import * as tasksService from "@/lib/api/tasksApi";

// Отримати всі завдання
export const useTasks = () => {
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: tasksService.getTasks,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

// Створити нове завдання
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskData) => tasksService.createTask(data),
    onSuccess: (newTask) => {
      // Оновлюємо кеш із новим завданням
      queryClient.setQueryData<Task[]>(["tasks"], (oldData) => {
        if (!oldData) return [newTask];
        return [newTask, ...oldData];
      });
    },
    onError: (error) => {
      console.error("Помилка створення завдання:", error);
    },
  });
};

// Оновити статус завдання
export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskStatusData }) =>
      tasksService.updateTaskStatus(id, data),
    onSuccess: (updatedTask) => {
      // Оновлюємо кеш із змінами
      queryClient.setQueryData<Task[]>(["tasks"], (oldData) => {
        if (!oldData) return [];
        return oldData.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        );
      });
    },
    onError: (error) => {
      console.error("Помилка оновлення статусу завдання:", error);
    },
  });
};