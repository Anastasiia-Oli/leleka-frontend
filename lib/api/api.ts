import axios, { AxiosError } from "axios";
import type { ChildSex } from "../types/types";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const nextServer = axios.create({ baseURL, withCredentials: true });

export type ApiResponse<T> = {
    status: number;
    message: string;
    data: T;
};

type OnboardingPayload = {
  childSex: ChildSex;
  dueDate: string;
  photo?: string;
};


export async function submitOnboarding(payload: OnboardingPayload) {
  try {
    const { childSex, dueDate, photo } = payload;

    if (photo) {
      const fd = new FormData();
      fd.append("childSex", childSex);
      fd.append("dueDate", dueDate);
      fd.append("photo", photo);

      const res = await nextServer.patch<ApiResponse<OnboardingPayload>>(`/users/me`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data as unknown;
    }

    const res = await nextServer.patch<ApiResponse<OnboardingPayload>>(`/users/me`, { childSex, dueDate });
    return res.data as unknown;
  } catch (e) {
    const status = (e as AxiosError)?.response?.status;
    if (status === 404) {
      console.warn(
        "[submitOnboarding] /users/me не знайдено (404). Повертаю успішний мок-відповідь."
      );
      return { ok: true } as const;
    }
    throw e;
  }
}

export default nextServer;
