// import { User } from "@/types/user";
// import type { Note, NoteTag } from "../../types/note";
// import { nextServer } from "./api";

// export interface RegisterRequest {
//   email: string;
//   password: string;
// }

// export interface RegisterUserResponse {
//   name: string;
//   email: string;
//   avatar: string;
// }

// export type LogoutResponse = {
//   message?: string;
// };

// export async function registerUser(
//   params: RegisterRequest
// ): Promise<RegisterUserResponse> {
//   const response = await nextServer.post<RegisterUserResponse>(
//     "/api/auth/register",
//     params
//   );
//   return response.data;
// }

// export async function login(
//   params: RegisterRequest
// ): Promise<RegisterUserResponse> {
//   const response = await nextServer.post<RegisterUserResponse>(
//     "/api/auth/login",
//     params
//   );
//   return response.data;
// }

// export async function logout(): Promise<LogoutResponse> {
//   const response = await nextServer.post<LogoutResponse>("/auth/logout");
//   return response.data;
// }

// type CheckSessionRequest = {
//   success: boolean;
// };

// export const checkSession = async () => {
//   const response = await nextServer.get<CheckSessionRequest>("/auth/session");
//   return response.data.success;
// };

// export const getMe = async () => {
//   const { data } = await nextServer.get<User>("/users/me");
//   return data;
// };

// // ---------- notes requests

// export interface FetchNotesResponse {
//   notes: Note[];
//   totalPages: number;
// }

// export async function fetchNotes(
//   query: string,
//   page: number,
//   tag?: Exclude<NoteTag, "All">
// ): Promise<FetchNotesResponse> {
//   const params: Record<string, string | number> = {
//     page: page,
//     perPage: 12,
//   };

//   if (tag && tag !== undefined) {
//     params.tag = tag;
//   }

//   if (query && query.trim() !== "") {
//     params.search = query;
//   }

//   console.log("Request params:", params);

//   const response = await nextServer.get<FetchNotesResponse>("/notes", {
//     params,
//   });
//   return response.data;
// }

// export async function createNote(
//   params: Omit<Note, "id" | "createdAt" | "updatedAt">
// ): Promise<Note> {
//   const response = await nextServer.post<Note>("/notes", params);
//   return response.data;
// }

// export async function deleteNote(id: number): Promise<Note> {
//   const response = await nextServer.delete<Note>(`/notes/${id}`);
//   return response.data;
// }

// export async function fetchNoteById(id: string): Promise<Note> {
//   const response = await nextServer.get<Note>(`/notes/${id}`);
//   return response.data;
// }

// export type UpdateUserRequest = {
//   email?: string;
//   username: string;
// };

// export const updateMe = async (params: UpdateUserRequest) => {
//   const res = await nextServer.patch<User>("/users/me", params);
//   return res.data;
// };

import { Task } from "@/types/user";
import nextServer from "./api";

export interface Tasks {
  data: Task[];
}

export async function getTasks(): Promise<Tasks> {
  const { data } = await nextServer.get<Tasks>("/tasks");
  return data;
}
