import { User } from "@/types/user";
import { JourneyDetails } from "@/types/journeyType";
import nextServer from "./api";
// import type { ChildSex } from "../../types/user";
import type { DiaryEntryData, Emotion } from "@/types/diaryModal";
import { AxiosResponse } from "axios";
import { DiaryEntry } from "@/types/dairy";
import { CreateDiaryEntryData } from "@/types/dairy";
import type { Baby, ChildSex } from "../../types/user";

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

type JourneyDetailResponce = {
  message: string;
  status: number;
  weekNumber: number;
  data: JourneyDetails;
};

export interface RegisterUserResponse {
  status: number;
  message: string;
  data: {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  status: number;
  message: string;
  data: User;
}

export type ApiResponse<T> = {
  status: number;
  message: string;
  data: T;
};

type OnboardingPayload = {
  childSex: ChildSex;
  dueDate: string;
  photo?: File;
};

type ProfilePayload = {
  name: string;
  email: string;
  childSex: ChildSex;
  dueDate: string;
  photo?: File;
};

export type LogoutResponse = { message?: string };

export const getJourneyDetailsByWeek = async (
  weekNumber: number
): Promise<JourneyDetails> => {
  try {
    const response = await nextServer<JourneyDetailResponce>(
      `/weeks/${weekNumber}`
    );
    if (!response?.data?.data) {
      throw new Error("No journey data returned from API");
    }
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch journey details:", error);
    throw error;
  }
};

export async function registerUser(
  params: RegisterRequest
): Promise<RegisterUserResponse> {
  const { data } = await nextServer.post<RegisterUserResponse>(
    "/auth/register",
    params
  );
  return data;
}

export async function login(params: LoginRequest): Promise<LoginUserResponse> {
  const { data } = await nextServer.post<LoginUserResponse>(
    "/auth/login",
    params
  );
  return data;
}

export async function logout(): Promise<LogoutResponse> {
  const { data } = await nextServer.post<LogoutResponse>("/auth/logout");
  return data;
}

type CheckSessionResponse = { success: boolean };

export const checkSession = async () => {
  try {
    const { data } =
      await nextServer.get<CheckSessionResponse>("/auth/session");

    return data.success;
  } catch {
    return false;
  }
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/current");
  return data;
};

export async function createDiaryEntry(data: DiaryEntryData) {
  const { data: res } = await nextServer.post<DiaryEntryData>("/diaries", data);
  return res;
}

export async function updateDiaryEntry(id: string, data: DiaryEntryData) {
  const { data: res } = await nextServer.patch<DiaryEntryData>(
    `/diaries/${id}`,
    data
  );
  return res;
}

export const getEmotions = async (): Promise<Emotion[]> => {
  const { data } = await nextServer.get<Emotion[]>("/emotions");
  return data;
};

export async function fetchDiary(): Promise<DiaryEntry[]> {
  const res = await nextServer.get<DiaryEntry[]>("/diaries");
  return res.data;
}

export async function fetchEmotions(): Promise<Emotion[]> {
  const res = await nextServer.get<Emotion[]>("/emotions");
  return res.data;
}

export async function CreateNote(
  params: CreateDiaryEntryData
): Promise<DiaryEntry> {
  const res = await nextServer.post<DiaryEntry>("/diaries", params);
  return res.data;
}
//поміняти на post<CreateDiaryEntryData>

// Видалити запис щоденника
export async function deleteDiaryEntry(
  id: string
): Promise<{ message: string }> {
  const res = await nextServer.delete(`/diaries/${id}`);
  return res.data;
}

export async function getMomDailyTips(
  weekNumber: number
): Promise<{ momDailyTips: string[] }> {
  const { data } = await nextServer.get(`/weeks/${weekNumber}`);
  return data;
}

export type TaskProp = {
  status: number;
  data: Task[];
};
export async function getTasks(): Promise<Task[]> {
  const { data } = await nextServer.get<TaskProp>("/tasks");
  return data.data;
}
export async function changeStateTask(
  task: Task,
  isDone: boolean
): Promise<Task> {
  const { data } = await nextServer.patch<Task>(`/tasks/${task._id}/status`, {
    isDone,
  });
  return data;
}

export async function submitOnboarding(payload: OnboardingPayload) {
  const { childSex, dueDate, photo } = payload;

  if (photo) {
    const fd = new FormData();
    fd.append("avatar", photo);

    await nextServer.patch("/users/avatar", fd);
  }

  const { data } = await nextServer.patch("/users", { childSex, dueDate });

  return data.user;
}

export async function saveProfile(payload: ProfilePayload) {
  const { name, email, childSex, dueDate, photo } = payload;

  if (photo) {
    const fd = new FormData();
    fd.append("avatar", photo);

    await nextServer.patch("/users/avatar", fd);
  }

  const { data } = await nextServer.patch("/users", { name, email, childSex, dueDate });

  return data.user;
}
export interface Task {
  _id: string;
  text: string;
  date: string;
  isDone: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFormValues {
  _id?: string;
  text: string;
  date: string;
}

export type CreateTaskDto = TaskFormValues & { isDone: boolean };
export type UpdateTaskDto = Partial<TaskFormValues>;

export const tasksApi = {
  // POST /tasks
  createTask: async (task: CreateTaskDto): Promise<AxiosResponse<Task>> => {
    return await nextServer.post<Task>("/tasks", task);
  },
};

export interface BabyResponse {
  status: number;
  message: string;
  weekNumber: number;
  data: {
    baby: Baby;
  };
}
export const getBabyClient = async (weekNumber: number): Promise<Baby> => {
  const { data } = await nextServer.get<BabyResponse>(`/weeks/${weekNumber}`);
  return data.data.baby;
};

