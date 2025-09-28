import { User, Task } from "@/types/user";
import { JourneyDetails } from "@/types/journeyType";

import nextServer from "./api";

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

export type SetTaskState = { id: string; isDone: boolean };

export async function getTasks(): Promise<Task[]> {
  const { data } = await nextServer.get<Task[]>("/tasks");
  return data;
}

export async function changeStateTask(
  task: Task,
  { isDone }: Task
): Promise<SetTaskState> {
  const { data } = await nextServer.patch<SetTaskState>(`/tasks/${task._id}`, {
    isDone,
  });
  return data;
}
