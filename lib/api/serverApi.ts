import { cookies } from "next/headers";
import nextServer from "./api";
import { User } from "@/types/user";

import { DiaryEntryData } from "./clientApi";

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.post("/auth/refresh", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getMeServer = async () => {
  const cookieStore = await cookies();
  const response = await nextServer.get<User>("/users/current", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const createDiaryEntryServer = async (data: DiaryEntryData) => {
  const cookieStore = await cookies();
  const res = await nextServer.post("/diaries", data, {
    headers: { Cookie: cookieStore.toString() },
  });
  return res.data;
};

export const updateDiaryEntryServer = async (
  id: string,
  data: DiaryEntryData
) => {
  const cookieStore = await cookies();
  const res = await nextServer.patch(`/diaries/${id}`, data, {
    headers: { Cookie: cookieStore.toString() },
  });
  return res.data;
};

export const getDiaryEntriesServer = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/diaries", {
    headers: { Cookie: cookieStore.toString() },
  });
  return res.data;
};

export const getDiaryEntryByIdServer = async (id: string) => {
  const cookieStore = await cookies();
  const res = await nextServer.get(`/diaries/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return res.data;
};

export const getEmotionsServer = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/emotions", {
    headers: { Cookie: cookieStore.toString() },
  });
  return res.data;
};
