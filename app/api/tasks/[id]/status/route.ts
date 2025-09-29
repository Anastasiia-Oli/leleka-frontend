import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { AxiosError } from "axios";
import { api } from "@/app/api/api";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const cookieStore = await cookies();

    const { data, status } = await api.patch(
      `/api/tasks/${params.id}/status`,
      body,
      { headers: { Cookie: cookieStore.toString() } }
    );

    return NextResponse.json(data, { status });
  } catch (err) {
    const error = err as AxiosError;
    return NextResponse.json(
      { error: error.response?.data || "Something went wrong" },
      { status: error.response?.status || 500 }
    );
  }
}
