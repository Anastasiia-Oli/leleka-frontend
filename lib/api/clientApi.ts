// lib/api/clientApi.ts
import { User } from "@/types/user";
import { api } from "@/app/api/api"; 

export interface RegisterRequest { name: string; email: string; password: string; }
export interface RegisterUserResponse {
  status: number;
  message: string;
  data: { _id: string; name: string; email: string; createdAt: string; updatedAt: string; };
}

export interface LoginRequest { email: string; password: string; }
export interface LoginResponseRaw { status: number; message: string; data: { accessToken?: string };}
export interface LoginUserResponse { status: number; message: string; data: User; }
export type LogoutResponse = { message?: string };

const ACCESS_TOKEN_KEY = "accessToken";

export const getAccessToken = () =>
  typeof window !== "undefined" ? localStorage.getItem(ACCESS_TOKEN_KEY) : null;

export const setAccessToken = (token: string | null) => {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(ACCESS_TOKEN_KEY, token);
  else localStorage.removeItem(ACCESS_TOKEN_KEY);

  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
};

if (typeof window !== "undefined") {
  const token = getAccessToken();
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  api.interceptors.response.use(
    r => r,
    err => {
      if (err?.response?.status === 401) {
        setAccessToken(null);
        window.location.href = "/auth/login";
      }
      throw err;
    }
  );
}

export async function registerUser(params: RegisterRequest): Promise<RegisterUserResponse> {
  const { data } = await api.post<RegisterUserResponse>("/api/auth/register", params, {
    withCredentials: false, 
  });
  return data;
}

export async function login(params: LoginRequest): Promise<LoginUserResponse> {
  const { data } = await api.post<LoginUserResponse>("/api/auth/login", params, {
    withCredentials: false,
  });
  return data;
}

export async function loginAndStoreToken(params: LoginRequest): Promise<LoginResponseRaw> {
  const { data } = await api.post<LoginResponseRaw>("/api/auth/login", params, {
    withCredentials: false,
  });
  const token = data?.data?.accessToken ?? null;
  if (token) setAccessToken(token);
  return data;
}

export async function logoutAndClear(): Promise<LogoutResponse> {
  try {
    const { data } = await api.post<LogoutResponse>("/api/auth/logout", null, {
      withCredentials: false,
    });
    return data;
  } finally {
    setAccessToken(null);
  }
}

export const isAuthenticated = () => Boolean(getAccessToken());


export const checkSession = async () => Boolean(getAccessToken());

export const getMe = async () => {
  const { data } = await api.get<User>("/api/users/current", {
    withCredentials: false,
  });
  return data;
};
