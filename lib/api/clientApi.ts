
import { User } from "@/types/user";
import { JourneyDetails } from "@/types/journeyType";
import nextServer from "./api";
import { DiaryEntry } from "@/types/dairy";
import { Emotion } from "@/types/dairy";
import { CreateDiaryEntryData } from "@/types/dairy";

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
  const { data } = await nextServer.post<CheckSessionResponse>("/auth/refresh");
  return data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/current");
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

// Отримати конкретний запис щоденника за ID
export async function getDiaryEntry(id: string): Promise<DiaryEntry> {
  const res = await nextServer.get<DiaryEntry>(`/diaries/${id}`);
  return res.data;
}

// Видалити запис щоденника
export async function deleteDiaryEntry(id: string): Promise<{ message: string }> {
  const res = await nextServer.delete<{ message: string }>(`/diaries/${id}`);
  return res.data;
}

// Оновити запис щоденника
export async function updateDiaryEntry(
  id: string,
  data: Partial<CreateDiaryEntryData>
): Promise<DiaryEntry> {
  const res = await nextServer.put<DiaryEntry>(`/diaries/${id}`, data);
  return res.data;
}

// Додати емоцію до запису
export async function addEmotionToEntry(
  entryId: string,
  emotionId: string
): Promise<DiaryEntry> {
  const res = await nextServer.patch<DiaryEntry>(`/diaries/${entryId}/emotions`, {
    emotionId: emotionId
  });
  return res.data;
}

// Видалити емоцію з запису
export async function removeEmotionFromEntry(
  entryId: string,
  emotionId: string
): Promise<DiaryEntry> {
  const res = await nextServer.delete<DiaryEntry>(`/diaries/${entryId}/emotions/${emotionId}`);
  return res.data;
}