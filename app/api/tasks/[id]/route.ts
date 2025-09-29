import { NextResponse } from "next/server";
import type { AxiosError } from "axios";

import { cookies } from "next/headers";
import { api } from "../../api";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const cookieStore = await cookies();

    const { data, status } = await api.patch(`/api/tasks/${params.id}`, body, {
      headers: { Cookie: cookieStore.toString() },
    });

    return NextResponse.json(data, { status });
  } catch (err) {
    const error = err as AxiosError;
    return NextResponse.json(
      { error: error.response?.data || "Something went wrong" },
      { status: error.response?.status || 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies();

    const { data, status } = await api.get(`/api/tasks/${params.id}`, {
      headers: { Cookie: cookieStore.toString() },
    });

    return NextResponse.json(data, { status });
  } catch (err) {
    const error = err as AxiosError;
    return NextResponse.json(
      { error: error.response?.data || "Something went wrong" },
      { status: error.response?.status || 500 }
    );
  }
}
