import nextServer from "./api";

// Типи для завдань
export interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  dueDate?: string;
}

export interface UpdateTaskStatusData {
  completed: boolean;
}

// Отримати всі завдання
export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await nextServer.get("/tasks");
    return response.data.data || response.data;
  } catch (error) {
    console.error("Помилка отримання завдань:", error);
    throw new Error("Не вдалося завантажити завдання");
  }
};

// Створити нове завдання
export const createTask = async (data: CreateTaskData): Promise<Task> => {
  try {
    const response = await nextServer.post("/tasks", data);
    return response.data.data || response.data;
  } catch (error) {
    console.error("Помилка створення завдання:", error);
    throw new Error("Не вдалося створити завдання");
  }
};

// Оновити статус завдання
export const updateTaskStatus = async (
  id: string, 
  data: UpdateTaskStatusData
): Promise<Task> => {
  try {
    const response = await nextServer.patch(`/tasks/${id}/status`, data);
    return response.data.data || response.data;
  } catch (error) {
    console.error("Помилка оновлення статусу завдання:", error);
    throw new Error("Не вдалося оновити статус завдання");
  }
};