import { User } from "@/types/user";
import { JourneyDetails } from "@/types/journeyType";
import nextServer from "./api";
import type { ChildSex } from "../../types/user";


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

export type LogoutResponse = { message?: string };


export interface DiaryEntryData {
  title: string;
  description: string;
  date?: string;
  emotions: string[];
}

export interface Emotion {
  _id: string;
  title: string;
}

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
  const { data } = await nextServer.post<CheckSessionResponse>("/auth/session");
  
  return data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/current");
  return data;
};


export async function createDiaryEntry(data: DiaryEntryData) {
  const { data: res } = await nextServer.post("/diaries", data);
  return res;
}

export async function updateDiaryEntry(id: string, data: DiaryEntryData) {
  const { data: res } = await nextServer.patch(`/diaries/${id}`, data);
  return res;
}

export async function getDiaryEntries() {
  const { data } = await nextServer.get("/diaries");
  return data;
}

export async function getDiaryEntryById(id: string) {
  const { data } = await nextServer.get(`/diaries/${id}`);
  return data;
}

export const getEmotions = async () => {
  const { data } = await nextServer.get("/emotions");
  return data;
};

export async function submitOnboarding(payload: OnboardingPayload) {
  const { childSex, dueDate, photo } = payload;

  if (photo) {
    const fd = new FormData();
    fd.append("photo", photo);

    await nextServer.patch("/users/avatar", fd);
  }

  const { data } = await nextServer.patch(
    "/users",
    { childSex, dueDate }
  );

  return data;
}

