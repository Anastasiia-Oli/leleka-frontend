import { NextResponse } from "next/server";

import type { AxiosError } from "axios";
import { cookies } from "next/headers";
import { api } from "../api";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const cookieStore = await cookies();

    const { data, status } = await api.post("/api/tasks", body, {
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
