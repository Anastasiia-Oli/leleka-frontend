import axios, { AxiosError } from "axios";

export type ApiError = AxiosError<{ error: string }>;

export const api = axios.create({
  //baseURL: "https://leleka-backend-1.onrender.com",
  baseURL: "http://localhost:3000",
  withCredentials: true,
});
