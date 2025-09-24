import { User } from "@/types/user";
import nextServer from "./api";

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

export type LogoutResponse = {
  message?: string;
};

export async function registerUser(
  params: RegisterRequest
): Promise<RegisterUserResponse> {
  const response = await nextServer.post<RegisterUserResponse>(
    "/api/auth/register",
    params
  );
  return response.data;
}

export async function login(params: LoginRequest): Promise<LoginUserResponse> {
  const response = await nextServer.post<LoginUserResponse>(
    "/auth/login",
    params
  );
  return response.data;
}

export async function logout(): Promise<LogoutResponse> {
  const response = await nextServer.post<LogoutResponse>("/auth/logout");
  return response.data;
}

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const response =
    await nextServer.post<CheckSessionRequest>("/auth/refresh");
  return response.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/current");
  return data;
};
