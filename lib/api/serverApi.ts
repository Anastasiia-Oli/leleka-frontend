import { cookies } from "next/headers";
import nextServer from "./api";
import { User } from "@/types/user";

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

export const getEmotionsServer = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/emotions", {
    headers: { Cookie: cookieStore.toString() },
  });
  return res.data;
};
