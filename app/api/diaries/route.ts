
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../api";
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../_utils/utils';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const { data } = await api.get("/api/diaries", {
      headers: { Cookie: cookieStore.toString() },
    });
    if (data) {
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error("Failed to fetch diaries:", error);
  }
  return NextResponse.json(
    { error: "Failed to fetch diaries" },
    { status: 500 }
  );
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();

  try {
    const body = await request.json();
    const { data } = await api.post("/api/diaries", body, {
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
    });

    if (data) {
      return NextResponse.json(data, { status: 201 });
    }
  } catch (error) {
    console.error("Failed to create diary entry:", error);
  }

  return NextResponse.json(
    { error: "Failed to create diary entry" },
    { status: 500 }
  );
}

export async function GET(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const res = await api('api/diaries', {
            headers: {
                Cookie: cookieStore.toString(),
            },
        });
        return NextResponse.json(res.data, { status: res.status });
    } catch (error) {
        if (isAxiosError(error)) {
            logErrorResponse(error.response?.data);
            return NextResponse.json(
                { error: error.message, response: error.response?.data },
                { status: error.status }
            );
        }
        logErrorResponse({ message: (error as Error).message });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

