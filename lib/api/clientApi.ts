
import { User } from "@/types/user";
import nextServer from "./api";
import { DiaryEntry } from "@/types/dairy";
import { title } from "process";
import { Emotion } from "@/types/dairy";
import { CreateDiaryEntryData } from "@/types/dairy";

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

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