// lib/api/clientApis.ts
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

export interface LoginResponseRaw {
  status: number;
  message: string;
  data: { accessToken?: string };
}

export interface LoginUserResponse {
  status: number;
  message: string;
  data: User;
}

export type LogoutResponse = { message?: string };

const ACCESS_TOKEN_KEY = "accessToken";

export const getAccessToken = (): string | null =>
  typeof window !== "undefined" ? localStorage.getItem(ACCESS_TOKEN_KEY) : null;

export const setAccessToken = (token: string | null) => {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(ACCESS_TOKEN_KEY, token);
  else localStorage.removeItem(ACCESS_TOKEN_KEY);

  if (token) nextServer.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete nextServer.defaults.headers.common["Authorization"];
};

if (typeof window !== "undefined") {
  const token = getAccessToken();
  if (token) {
    nextServer.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  nextServer.interceptors.response.use(
    (r) => r,
    (err) => {
      if (err?.response?.status === 401) {
        setAccessToken(null);
        if (typeof window !== "undefined") window.location.href = "/auth/login";
      }
      throw err;
    }
  );
}

export async function registerUser(
  params: RegisterRequest
): Promise<RegisterUserResponse> {
  const response = await nextServer.post<RegisterUserResponse>(
    "/auth/register",
    params
  );
  return response.data;
}

export async function login(
  params: LoginRequest
): Promise<LoginUserResponse> {
  const response = await nextServer.post<LoginUserResponse>(
    "/auth/login",
    params
  );
  return response.data;
}


export async function loginAndStoreToken(params: LoginRequest): Promise<LoginResponseRaw> {
  const res = await nextServer.post<LoginResponseRaw>("/auth/login", params);
  const token = res.data?.data?.accessToken ?? null;
  if (token) setAccessToken(token);
  return res.data;
}

export async function logoutAndClear(): Promise<LogoutResponse> {
  try {
    const response = await nextServer.post<LogoutResponse>("/auth/logout");
    return response.data;
  } finally {
    setAccessToken(null);
  }
}

export const isAuthenticated = () => Boolean(getAccessToken());

type CheckSessionResponse = { success: boolean };

export const checkSession = async () => {
  const response = await nextServer.post<CheckSessionResponse>("/auth/refresh");
  return response.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/current");
  return data;
};
