import { cookies } from "next/headers";
import nextServer from "./api";
import { Baby, User } from "@/types/user";

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.post("/auth/session", {
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

interface BabyResponse {
  data: {
    baby: Baby;
  };
}

export const getBabyInfo = async (week: number): Promise<Baby> => {
  const cookie = await cookies();
  const { data } = await nextServer.get<BabyResponse>(`/weeks/${week}`, {
    headers: { Cookie: cookie.toString() },
  });
  return data.data.baby;
};
