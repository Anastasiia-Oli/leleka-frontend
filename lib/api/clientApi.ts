import { User, Task } from "@/types/user";
import { JourneyDetails } from "@/types/journeyType";

import nextServer from "./api";

import { DiaryEntry } from "@/types/dairy";
import { Emotion } from "@/types/dairy";
import { CreateDiaryEntryData } from "@/types/dairy";
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

export type SetTaskState = { id: string; isDone: boolean };

export async function getTasks(): Promise<Task[]> {
  const { data } = await nextServer.get<Task[]>("/tasks");
  return data;
}

export async function changeStateTask(
  task: Task,
  { isDone }: Task
): Promise<SetTaskState> {
  const { data } = await nextServer.patch<SetTaskState>(
    `/tasks/${task._id}/status`,
    {
      isDone,
    }
  );
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

  return data;
}
