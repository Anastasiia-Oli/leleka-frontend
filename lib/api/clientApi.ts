import { User } from "@/types/user";
import nextServer from "./api";
import type { ChildSex } from "../../types/types";
import axios, { AxiosError } from "axios";


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

export async function registerUser(
  params: RegisterRequest
): Promise<RegisterUserResponse> {
  const { data } = await nextServer.post<RegisterUserResponse>(
    "/auth/register",
    params
  );
  return data;
}

export async function login(
  params: LoginRequest
): Promise<LoginUserResponse> {
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
  const { data } = await nextServer.get<CheckSessionResponse>("/auth/refresh");
  return data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/current");
  return data;
};

export async function submitOnboarding(payload: OnboardingPayload) {
  const { childSex, dueDate, photo } = payload;

  try {
    if (photo) {
      const fd = new FormData();
      fd.append("avatar", photo); // ім’я поля має збігатися з бекендом

      await nextServer.patch("/users/avatar", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    const res = await nextServer.patch(`/users`, { childSex, dueDate });
    return res.data;
  } catch (e) {
    const status = (e as AxiosError)?.response?.status;
    if (status === 404) {
      console.warn(
        "[submitOnboarding] /users або /users/avatar не знайдено (404). Повертаю мок-відповідь."
      );
      return { ok: true } as const;
    }
    throw e;
  }
}